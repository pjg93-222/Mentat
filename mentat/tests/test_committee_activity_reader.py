"""Inert controls for tools/committee_activity_reader.py (typed, read-only, accepted-snapshot consumer).

Snapshots are built in a temporary directory with the real collector and the real accounted transport (scripted opener), so the
archive layout, metadata records and ledger rows are the production ones. Tests marked REAL measure the accepted batch-02
snapshot read-only (MENTAT_REAL_COMMITTEE_STATE or the repo's own state/committee-activity) and skip when it is absent.
"""
from contextlib import closing
import hashlib
import json
import os
from pathlib import Path
import shutil
import sqlite3
import unittest
from unittest import mock
from urllib.parse import parse_qsl, urlsplit

import test_campaign_spending as cs
import test_collect_committee_activity_endpoints as ep

import committee_activity_reader as reader

driver, accounted = ep.driver, ep.accounted
C1, C2, C3, C4, C5, C6 = ep.C1, ep.C2, ep.C3, cs.C4, cs.C5, 'C00000006'
FIXTURES = Path(__file__).resolve().parent / 'fixtures' / 'candidate_spending' / 'crawler'   # production's copy of the agreed shape (def754dc...)
try:
    import jsonschema
except ImportError:  # the reader itself is stdlib only; schema checks are a test-time convenience
    jsonschema = None


class StatusOpener(ep.Opener):
    """Opener whose handler may return (status, body) to script a provider failure for one request."""
    def open(self, request, timeout):
        self.calls.append((request.full_url, timeout, request.get_header('X-api-key')))
        parts = urlsplit(request.full_url)
        value = self.handler(parts.path.split('/v1/', 1)[1], dict(parse_qsl(parts.query)))
        return ep.Response(value[1], value[0]) if isinstance(value, tuple) else ep.Response(ep.to_body(value))


def row(n, committee, recipient=None, amount=10.25):
    return {'sub_id': ep.sid(n), 'committee_id': committee, 'disbursement_amount': amount, 'disbursement_date': '2024-03-02',
            'recipient_name': 'INERT VENDOR %d' % n, 'recipient_committee_id': recipient,
            'committee': {'committee_id': committee, 'name': 'INERT COMMITTEE ' + committee[-1]}, 'memoed_subtotal': False}


ROWS = {C1: [row(n, C1, recipient=C4 if n == 2 else None) for n in range(5)],
        C2: [row(10, C2), row(11, C2), row(12, C2)],
        C5: [row(20, C5), row(20, C5)],            # same source id twice: both occurrences are kept, coverage cannot certify
        C6: [row(30, C6)]}


def handler(endpoint, query):
    if endpoint == ep.SCHEDULE_B and query['committee_id'] in ROWS:
        committee, rows = query['committee_id'], ROWS[query['committee_id']]
        start = 0 if 'last_index' not in query else [r['sub_id'] for r in rows].index(str(query['last_index'])) + 1
        chunk = rows[start:start + 2]
        if committee == C2 and start > 0:
            return 503, b'unavailable'
        cursor = {'last_index': chunk[-1]['sub_id'], 'last_disbursement_date': '2024-03-02'} if start + 2 < len(rows) else None
        return ep.legacy_response(chunk, count=len(rows), cursor=cursor)
    if endpoint.endswith('/totals/'):
        committee = endpoint.split('/')[1]
        return {'results': [] if committee == C6 else [{'committee_id': committee, 'cycle': 2024, 'receipts': 1000.5, 'disbursements': 900.25}],
                'pagination': {'count': 0 if committee == C6 else 1, 'page': 1, 'pages': 1, 'per_page': 100}}
    return ep.empty_page(endpoint)


class Reader(cs.Base):
    def freeze(self, state, number, ledger):
        folder = state / 'accepted-batches' / ('batch-%02d' % number)
        folder.mkdir(parents=True)
        shutil.copyfile(ledger, folder / 'frontier.sqlite')
        sha = hashlib.sha256((folder / 'frontier.sqlite').read_bytes()).hexdigest()
        (folder / 'SNAPSHOT.json').write_text(json.dumps({'schema_version': 1, 'snapshot_sha256': sha}), encoding='utf-8')
        return folder / 'frontier.sqlite'

    def collect(self, state, frontier, label):
        archive = state / ('responses-' + label)
        transport = accounted.AccountedTransport([ep.KEY], self.root / 'quota.sqlite', archive, 200, opener=StatusOpener(handler), cap=1000)
        self.addCleanup(transport.close)
        frontier.run(transport)
        return transport

    def build(self):
        """batch-01: a D068-shaped ledger (no totals, no extension tables). batch-02: totals + priority + more units."""
        self.state = state = self.root / 'state'
        state.mkdir()
        ledger = state / 'frontier.sqlite'
        first = driver.Frontier(ledger)
        first.seed([{'committee_id': C1, 'cycle': 2024, 'origins': ['industryA']}])
        self.transport1 = self.collect(state, first, 'one')
        first.close()
        self.batch1 = self.freeze(state, 1, ledger)
        second = driver.Frontier(ledger, enabled_endpoint_contracts=[cs.TOTALS_ID])
        second.seed([{'committee_id': c, 'cycle': 2024, 'origins': ['industryA']} for c in (C2, C5, C6)])
        ccl = self.ccl(['H0AA00001|2024|2024|%s|H|P|1' % C1, 'H0AA00002|2024|2024|%s|H|P|2' % C2, 'H0AA00002|2024|2024|%s|H|P|3' % C5])
        second.set_priority([('H0AA00001', 2024), ('H0AA00002', 2024)], ccl={2024: {'path': ccl, 'vintage': 'Mon, 07 Sep 2026 05:51:23 GMT'}})
        self.transport2 = self.collect(state, second, 'two')
        second.seed([{'committee_id': C3, 'cycle': 2024, 'origins': ['industryA']}])    # seeded, nothing retrieved yet
        second.close()
        self.batch2 = self.freeze(state, 2, ledger)
        return state

    def read(self, **query):
        query.setdefault('ccl_root', self.root / 'no-ccl')    # hermetic: never the machine's active FEC source
        return reader.read_campaign_spending(state_dir=self.state, **query)

    def committee(self, committee, cycle=2024):
        return self.read(cycle=cycle, committee_id=committee)['committees'][0]

    def archived_rows(self, committee):
        bodies = [r for r in self.transport1.records + self.transport2.records if r['endpoint'] == ep.SCHEDULE_B and r['query']['committee_id'] == committee and r['status'] == 200]
        return [item for record in sorted(bodies, key=lambda r: r['attempt']) for item in json.loads(Path(record['path']).read_bytes())['results']]

    def schema(self):
        return json.loads((FIXTURES / 'read_campaign_spending_fixture.schema.json').read_text(encoding='utf-8'))

    def validate(self, result):
        for entry in result['committees']:
            self.assertEqual(entry['row_occurrences'], len(entry['rows']))
        if jsonschema is not None:
            schema = {'$schema': 'https://json-schema.org/draft/2020-12/schema', '$ref': '#/$defs/Result', '$defs': self.schema()['$defs']}
            errors = [e.message for e in jsonschema.Draft202012Validator(schema, format_checker=jsonschema.FormatChecker()).iter_errors(result)]
            self.assertEqual(errors, [])

    def setUp(self):
        super().setUp()
        self.build()

    # ------------------------------------------------------------ shapes and statuses
    def test_every_coverage_status_with_its_endpoint_states(self):
        expected = {C1: ('complete', 'complete', 'complete'),        # B and totals both certified
                    C2: ('partial', 'blocked', 'complete'),           # one B page then a provider failure
                    C5: ('partial', 'closed_unknown', 'complete'),    # repeated source id: retrieved, not certified
                    C6: ('partial', 'complete', 'complete'),          # totals answered with no object: retrieved, states nothing
                    C3: ('pending', 'pending', 'pending'),            # seeded, nothing retrieved
                    'C00000099': ('not_seeded', 'not_seeded', 'not_seeded')}
        for committee, (coverage, b, totals) in expected.items():
            with self.subTest(committee=committee):
                result = self.read(cycle=2024, committee_id=committee)
                entry = result['committees'][0]
                self.assertEqual((entry['coverage_status'], entry['endpoint_status']), (coverage, {'B': b, 'totals': totals}))
                self.validate(result)
        pending = self.committee(C3)
        self.assertEqual((pending['rows'], pending['totals'], pending['retrieved_at']), ([], [], {'B_latest': None, 'totals': None}))
        unknown = self.read(cycle=2024, candidate_id='H0AA00009')
        self.assertEqual(unknown['mapping'], None)
        self.assertEqual(unknown['committees'], [{'committee_id': None, 'committee_name': None, 'cycle': 2024, 'coverage_status': 'mapping_unknown',
                                                  'endpoint_status': {'B': 'unknown', 'totals': 'unknown'}, 'retrieved_at': {'B_latest': None, 'totals': None},
                                                  'totals': [], 'rows': [], 'row_occurrences': 0, 'disclosure_boundaries': 0}])
        self.validate(unknown)
        self.assertEqual(self.committee(C1, cycle=2022)['coverage_status'], 'not_seeded', 'another cycle of a known committee is a different unit')

    def test_rows_are_the_original_archived_objects_in_page_order_with_every_occurrence(self):
        entry = self.committee(C1)
        self.assertEqual(entry['rows'], self.archived_rows(C1))
        self.assertEqual(entry['rows'], ROWS[C1], 'floats and nested objects are exactly what the provider sent')
        self.assertEqual((entry['row_occurrences'], entry['disclosure_boundaries']), (5, 4), 'one row names a recipient committee; four are payee boundaries')
        duplicated = self.committee(C5)
        self.assertEqual(duplicated['rows'], ROWS[C5])
        self.assertEqual(duplicated['row_occurrences'], 2)
        self.assertEqual(self.committee(C2)['rows'], ROWS[C2][:2], 'a partial list is what was retrieved, never the committee total')
        totals = entry['totals']
        self.assertEqual(totals, [{'committee_id': C1, 'cycle': 2024, 'receipts': 1000.5, 'disbursements': 900.25}])

    def test_names_and_retrieval_times_come_from_the_archive_and_ledger(self):
        entry = self.committee(C1)
        self.assertEqual(entry['committee_name'], 'INERT COMMITTEE 1')
        totals = [r for r in self.transport2.records if r['endpoint'] == 'committee/%s/totals/' % C1]
        self.assertEqual([entry['retrieved_at']['totals']], [r['captured_utc'] for r in totals])
        # C1's B pages were collected before the extension tables existed, so their time comes from the adapter's metadata record;
        # C2's pages were recorded in endpoint_retrievals.
        with closing(sqlite3.connect(self.batch2.as_uri() + '?mode=ro&immutable=1', uri=True)) as db:
            self.assertIsNone(db.execute("SELECT 1 FROM endpoint_retrievals WHERE committee_id=? AND kind='B'", (C1,)).fetchone())
            recorded = db.execute("SELECT retrieved_at FROM endpoint_retrievals WHERE committee_id=? AND kind='B' ORDER BY page_no DESC", (C2,)).fetchone()
        metadata = [json.loads(p.read_text()) for p in sorted((self.state / 'responses-one').glob('*.json'))]
        captured = [m['captured_utc'] for m in metadata if m['endpoint'] == ep.SCHEDULE_B and m['query'].get('committee_id') == C1]
        self.assertEqual(entry['retrieved_at']['B_latest'], captured[-1])
        self.assertEqual(self.committee(C2)['retrieved_at']['B_latest'], recorded[0])
        self.assertEqual(self.committee(C6)['totals'], [])
        self.assertEqual(self.committee(C6)['committee_name'], 'INERT COMMITTEE 6')

    def test_candidate_query_returns_the_stored_mapping_and_each_principal_committee(self):
        result = self.read(cycle=2024, candidate_id='H0AA00002')
        sha = hashlib.sha256(Path(self.root / 'ccl24' / 'ccl.txt').read_bytes()).hexdigest()
        self.assertEqual(result['query'], {'cycle': 2024, 'candidate_id': 'H0AA00002', 'committee_id': None})
        self.assertEqual(result['mapping'], {'candidate_id': 'H0AA00002', 'source': 'local_ccl:ccl.txt:sha256=' + sha,
                                             'vintage_or_retrieved_at': 'Mon, 07 Sep 2026 05:51:23 GMT', 'committee_ids': [C2, C5]})
        self.assertEqual([c['committee_id'] for c in result['committees']], [C2, C5])
        self.validate(result)
        both = self.read(cycle=2024, candidate_id='H0AA00002', committee_id=C5)
        self.assertEqual([c['committee_id'] for c in both['committees']], [C5])
        with self.assertRaises(ValueError):
            self.read(cycle=2024, candidate_id='H0AA00002', committee_id=C1)

    def test_inputs_are_validated(self):
        for kwargs, error in (({'cycle': 2024}, ValueError), ({'cycle': '2024', 'committee_id': C1}, TypeError), ({'cycle': True, 'committee_id': C1}, TypeError),
                              ({'cycle': 2024, 'committee_id': 'C1'}, ValueError), ({'cycle': 2024, 'candidate_id': 'C00000001'}, ValueError),
                              ({'cycle': 2024, 'candidate_id': 5}, ValueError)):
            with self.subTest(kwargs=kwargs), self.assertRaises(error):
                self.read(**kwargs)
        with self.assertRaises(TypeError):
            reader.read_campaign_spending(2024, committee_id=C1)

    # ------------------------------------------------------------ snapshot selection, hash cache, read-only
    def test_newest_accepted_batch_is_used_and_unaccepted_or_inconsistent_copies_are_handled(self):
        self.assertEqual(self.read(cycle=2024, committee_id=C1)['snapshot'], {'batch': 2, 'sha256': hashlib.sha256(self.batch2.read_bytes()).hexdigest()})
        unaccepted = self.state / 'accepted-batches' / 'batch-03'
        unaccepted.mkdir()
        shutil.copyfile(self.batch2, unaccepted / 'frontier.sqlite')          # a freeze in progress: no SNAPSHOT.json yet
        self.assertEqual(self.read(cycle=2024, committee_id=C1)['snapshot']['batch'], 2)
        (unaccepted / 'SNAPSHOT.json').write_text('{"snapshot_sha', encoding='utf-8')   # partially written
        self.assertEqual(self.read(cycle=2024, committee_id=C1)['snapshot']['batch'], 2)
        (unaccepted / 'SNAPSHOT.json').write_text(json.dumps({'snapshot_sha256': '0' * 64}), encoding='utf-8')
        with self.assertRaises(reader.SnapshotUnavailable):
            self.read(cycle=2024, committee_id=C1)
        with self.assertRaises(reader.SnapshotUnavailable):
            reader.read_campaign_spending(cycle=2024, committee_id=C1, state_dir=self.root / 'nothing-here')

    def test_snapshot_hash_is_computed_once_per_path_size_and_mtime(self):
        reader._SHA.clear()
        opened = []
        real = Path.open

        def counting(path, *args, **kwargs):
            opened.append(Path(path))
            return real(path, *args, **kwargs)
        with mock.patch.object(Path, 'open', counting):
            for _ in range(3):
                self.read(cycle=2024, committee_id=C1)
            self.assertEqual(opened.count(self.batch2), 1)
            os.utime(self.batch2, ns=(self.batch2.stat().st_atime_ns, self.batch2.stat().st_mtime_ns + 5_000_000_000))
            self.read(cycle=2024, committee_id=C1)
            self.assertEqual(opened.count(self.batch2), 2, 'a changed mtime recomputes')

    def test_opens_read_only_and_immutable_and_never_writes_the_snapshot_or_archives(self):
        before = {p: (p.stat().st_size, p.stat().st_mtime_ns) for p in self.state.rglob('*') if p.is_file()}
        uris = []
        real = sqlite3.connect

        def recording(target, *args, **kwargs):
            uris.append(str(target))
            return real(target, *args, **kwargs)
        with mock.patch.object(reader.sqlite3, 'connect', recording):
            self.read(cycle=2024, candidate_id='H0AA00002')
        self.assertTrue(uris and all(u.endswith('?mode=ro&immutable=1') and u.startswith('file:') for u in uris), uris)
        self.assertEqual({p: (p.stat().st_size, p.stat().st_mtime_ns) for p in self.state.rglob('*') if p.is_file()}, before)
        self.assertFalse(list(self.state.rglob('*-journal')) + list(self.state.rglob('*-wal')) + list(self.state.rglob('*-shm')))
        source = Path(reader.__file__).read_text(encoding='utf-8')
        for word in ('INSERT', 'UPDATE', 'DELETE', 'CREATE', 'PRAGMA', 'write_', 'os.remove'):
            self.assertNotIn(word, source)
        self.assertEqual({m for m in ('requests', 'urllib', 'socket', 'http') if m in source}, set(), 'no network surface')

    def test_snapshot_without_extension_tables_still_reads_and_reports_unknown_mapping(self):
        shutil.rmtree(self.state / 'accepted-batches' / 'batch-02')
        old = self.read(cycle=2024, candidate_id='H0AA00001')
        self.assertEqual((old['snapshot']['batch'], old['mapping'], old['committees'][0]['coverage_status']), (1, None, 'mapping_unknown'))
        entry = self.committee(C1)
        self.assertEqual((entry['coverage_status'], entry['endpoint_status']), ('partial', {'B': 'complete', 'totals': 'unsupported'}))
        self.assertEqual(entry['rows'], ROWS[C1])
        self.assertIsNotNone(entry['retrieved_at']['B_latest'])
        self.assertIsNone(entry['retrieved_at']['totals'])

    # ------------------------------------------------------------ no stored mapping: the active source's ccl, read at request time
    def without_map_table(self):
        shutil.rmtree(self.state / 'accepted-batches' / 'batch-02')       # batch-01 has no candidate_committee_map table

    def ccl_listing(self, folder):
        return {p.name: (p.read_bytes(), p.stat().st_mtime_ns) for p in sorted(folder.iterdir())}

    def test_no_stored_mapping_reads_the_active_ccl_and_labels_it(self):
        self.without_map_table()
        result = self.read(cycle=2024, candidate_id='H0AA00001', ccl_root=self.root)
        sha = hashlib.sha256((self.root / 'ccl24' / 'ccl.txt').read_bytes()).hexdigest()
        self.assertEqual(result['mapping'], {'candidate_id': 'H0AA00001', 'vintage_or_retrieved_at': 'Mon, 07 Sep 2026 05:51:23 GMT',
                                             'source': 'local_ccl_read_time:%s/ccl24/ccl.txt:sha256=%s' % (self.root.name, sha), 'committee_ids': [C1]})
        self.assertEqual(result['snapshot']['batch'], 1)
        entry = result['committees'][0]
        self.assertEqual((entry['committee_id'], entry['coverage_status']), (C1, 'partial'))
        self.assertEqual(entry['rows'], ROWS[C1])
        self.validate(result)

    def test_ccl_vintage_falls_back_to_the_file_mtime_without_a_source_receipt(self):
        self.without_map_table()
        (self.root / 'ccl24' / 'source-receipt.json').unlink()
        mapping = self.read(cycle=2024, candidate_id='H0AA00001', ccl_root=self.root)['mapping']
        self.assertTrue(mapping['vintage_or_retrieved_at'].startswith('file_mtime_utc:'), mapping)
        self.assertEqual(mapping['vintage_or_retrieved_at'], driver.ccl_vintage(self.root / 'ccl24' / 'ccl.txt'))

    def test_a_stored_mapping_always_wins_over_the_ccl(self):
        other = self.root / 'other'
        (other / 'ccl24').mkdir(parents=True)
        (other / 'ccl24' / 'ccl.txt').write_text('H0AA00002|2024|2024|%s|H|P|9\n' % C1, encoding='utf-8')
        result = self.read(cycle=2024, candidate_id='H0AA00002', ccl_root=other)
        self.assertTrue(result['mapping']['source'].startswith('local_ccl:ccl.txt:sha256='), result['mapping'])
        self.assertEqual(result['mapping']['committee_ids'], [C2, C5])

    def test_ccl_filter_is_the_collectors_rule(self):
        self.without_map_table()
        path = self.ccl(['H0AA00001|2024|2024|%s|H|P|1' % C1,
                         'H0AA00001|2024|2024|%s|H|A|2' % C2,              # authorized, not principal
                         'H0AA00001|2022|2022|%s|H|P|3' % C3,              # another FEC election year
                         'H0AA00001|2024|2024|C00BAD|H|P|4',               # not a committee id
                         'H0AA00003|2024|2024|%s|H|P|5' % C5,              # another candidate
                         'H0AA00001|2022|2024|%s|H|P|6' % C6,              # the cycle is FEC_ELECTION_YR, not CAND_ELECTION_YR
                         'H0AA00001|2024|2024|%s|H|P' % C4])               # short line
        expected = sorted(driver.principal_committees_from_ccl(path, 2024, {'H0AA00001'})[0]['H0AA00001'])
        self.assertEqual(expected, [C1, C6])
        self.assertEqual(self.read(cycle=2024, candidate_id='H0AA00001', ccl_root=self.root)['mapping']['committee_ids'], expected)
        self.assertEqual(self.read(cycle=2024, candidate_id='H0AA00003', ccl_root=self.root)['mapping']['committee_ids'], [C5])

    def test_missing_or_unusable_ccl_leaves_the_mapping_unknown(self):
        self.without_map_table()
        (self.root / 'ccl22' / 'ccl.txt').mkdir(parents=True)                # unreadable: a folder where the file should be
        for query, root in ((dict(cycle=2024, candidate_id='H0AA00001'), self.root / 'no-ccl'),        # no ccl at all
                            (dict(cycle=2024, candidate_id='H0AA00009'), self.root),                    # no principal row for this candidate
                            (dict(cycle=2022, candidate_id='H0AA00001'), self.root)):                   # ccl22 cannot be read
            with self.subTest(query=query):
                result = self.read(ccl_root=root, **query)
                self.assertIsNone(result['mapping'])
                self.assertEqual([c['coverage_status'] for c in result['committees']], ['mapping_unknown'])
                self.validate(result)

    def test_reading_the_ccl_never_changes_it(self):
        self.without_map_table()
        before = self.ccl_listing(self.root / 'ccl24')
        self.read(cycle=2024, candidate_id='H0AA00001', ccl_root=self.root)
        self.assertEqual(self.ccl_listing(self.root / 'ccl24'), before)

    # ------------------------------------------------------------ archives are verified, never guessed
    def body_of(self, committee):
        with closing(sqlite3.connect(self.batch2.as_uri() + '?mode=ro&immutable=1', uri=True)) as db:
            return Path(db.execute("SELECT archive_path FROM pages WHERE committee_id=? AND kind='B' ORDER BY page_no", (committee,)).fetchone()[0])

    def test_a_changed_or_missing_archive_body_is_an_error_not_a_guess(self):
        body = self.body_of(C1)
        original = body.read_bytes()
        try:
            body.write_bytes(original.replace(b'INERT VENDOR', b'INERT VENDOX', 1))   # same length: only the hash can notice
            with self.assertRaises(reader.ArchiveError):
                self.committee(C1)
            body.unlink()
            with self.assertRaises(reader.ArchiveError):
                self.committee(C1)
        finally:
            body.write_bytes(original)
        self.assertEqual(self.committee(C1)['coverage_status'], 'complete')

    def test_a_relocated_state_tree_resolves_archives_by_folder_and_file_name(self):
        moved = self.root / 'moved'
        shutil.copytree(self.state, moved)
        shutil.rmtree(self.state / 'responses-one')
        shutil.rmtree(self.state / 'responses-two')
        result = reader.read_campaign_spending(cycle=2024, committee_id=C1, state_dir=moved)
        self.assertEqual(result['committees'][0]['rows'], ROWS[C1])

    # ------------------------------------------------------------ the agreed fixture
    def test_fixture_is_synthetic_validates_and_has_exactly_the_reader_shape(self):
        fixture = json.loads((FIXTURES / 'read_campaign_spending_fixture.json').read_text(encoding='utf-8'))
        self.assertIs(fixture['synthetic'], True)
        self.assertIn('SYNTHETIC', fixture['warning'])
        names = {example['name'] for example in fixture['examples']}
        self.assertTrue({'complete', 'partial', 'not_seeded'} <= names)
        live = self.read(cycle=2024, candidate_id='H0AA00002')
        for example in fixture['examples']:
            result = example['result']
            self.assertEqual(set(result), set(live), example['name'])
            self.assertEqual(set(result['snapshot']), set(live['snapshot']))
            self.assertEqual(set(result['query']), set(live['query']))
            for entry in result['committees']:
                self.assertEqual(set(entry), set(live['committees'][0]))
                self.assertEqual(set(entry['endpoint_status']), {'B', 'totals'})
                self.assertEqual(set(entry['retrieved_at']), {'B_latest', 'totals'})
                self.assertEqual(entry['row_occurrences'], len(entry['rows']))
            if result['mapping'] is not None:
                self.assertEqual(set(result['mapping']), set(live['mapping']))
            for entry in result['committees']:
                for item in entry['rows']:
                    self.assertTrue(item['recipient_name'].endswith('(SYNTHETIC)'))
        if jsonschema is not None:
            errors = [e.message for e in jsonschema.Draft202012Validator(self.schema(), format_checker=jsonschema.FormatChecker()).iter_errors(fixture)]
            self.assertEqual(errors, [])
            bad = json.loads(json.dumps(fixture))
            bad['examples'][0]['result']['committees'][0]['endpoint_status']['totals'] = 'pending'
            self.assertTrue(list(jsonschema.Draft202012Validator(self.schema()).iter_errors(bad)), 'complete without totals must violate the schema')


REAL_STATE = cs.REAL_STATE


@unittest.skipUnless((REAL_STATE / 'accepted-batches' / 'batch-02' / 'frontier.sqlite').is_file(), 'REAL: accepted batch-02 snapshot not present')
class RealSnapshotLatency(unittest.TestCase):
    def test_REAL_per_committee_latency_on_the_newest_accepted_snapshot_and_nothing_is_modified(self):
        import statistics
        import time
        batch, snapshot, sha = reader._latest_snapshot(REAL_STATE)     # whichever accepted batch is newest today
        before = (snapshot.stat().st_size, snapshot.stat().st_mtime_ns)
        with closing(sqlite3.connect(snapshot.as_uri() + '?mode=ro&immutable=1', uri=True)) as db:
            pages = db.execute("SELECT committee_id,cycle FROM pages WHERE kind='B' GROUP BY committee_id,cycle ORDER BY SUM(archive_bytes)").fetchall()
        picks = [pages[0], pages[len(pages) // 2], pages[-1]]
        reader._SHA.clear()
        started = time.perf_counter()
        first = reader.read_campaign_spending(cycle=picks[0][1], committee_id=picks[0][0], state_dir=REAL_STATE)     # includes the one-time snapshot hash
        cold_ms = (time.perf_counter() - started) * 1000
        self.assertEqual((first['snapshot']['batch'], first['snapshot']['sha256']), (batch, sha))
        self.assertEqual(sha, json.loads((snapshot.parent / 'SNAPSHOT.json').read_text())['snapshot_sha256'])
        for committee, cycle in picks:
            samples = []
            for _ in range(5):
                started = time.perf_counter()
                result = reader.read_campaign_spending(cycle=cycle, committee_id=committee, state_dir=REAL_STATE)
                samples.append((time.perf_counter() - started) * 1000)
            entry = result['committees'][0]
            self.assertGreater(entry['row_occurrences'], 0)
            self.assertIn(entry['coverage_status'], ('complete', 'partial'))
            self.assertLess(statistics.median(samples), 200, (committee, cycle, samples))
        self.assertLess(cold_ms, 5000, 'the one-time snapshot hash stays well under any request budget')
        self.assertEqual((snapshot.stat().st_size, snapshot.stat().st_mtime_ns), before)


if __name__ == '__main__':
    unittest.main()

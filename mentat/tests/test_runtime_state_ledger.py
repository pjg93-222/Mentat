"""Late cache-ranking imports must never create SQLite state in installed code."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

APP = Path(__file__).resolve().parents[1] / 'app'


def census(root):
    return {str(path.relative_to(root)): hashlib.sha256(path.read_bytes()).hexdigest()
            for path in root.rglob('*') if path.is_file()}


class RuntimeStateLedgerTests(unittest.TestCase):
    def test_late_cache_ranking_and_prewarm_recorder_leave_program_unchanged(self):
        with tempfile.TemporaryDirectory(prefix='mentat-state-ledger-') as temporary:
            root = Path(temporary)
            program, state, data = root/'sealed-program', root/'user-state', root/'signed-inputs'
            app = program/'mentat'/'app'
            app.mkdir(parents=True)
            data.mkdir()
            (data/'manifest.json').write_text('{"signed":"fixture"}')
            # Real native cache and prewarm implementations, with their stdlib-only imports.
            for name in ('access_stats.py', 'runtime_paths.py', 'response_cache.py', 'proclock.py', 'prewarm.py'):
                shutil.copy2(APP/name, app/name)
            before_program, before_data = census(program), census(data)
            environment = dict(os.environ, MENTAT_RUNTIME_STATE_ROOT=str(state),
                               MENTAT_DATA_ROOT=str(data), MENTAT_ACCESS_STATS='1',
                               PYTHONDONTWRITEBYTECODE='1', PYTHONPATH=str(app))
            script = r'''
import importlib, json, pathlib, sys
state = pathlib.Path(sys.argv[1])
import response_cache
assert 'access_stats' not in sys.modules
# The desktop relocates cache modules before main. The ledger is imported later,
# by value ranking on an actual report-response cache miss/hit.
response_cache.DEFAULT_ROOT = state / 'response-cache'
response_cache.configure()
first = response_cache.get_or_compute('report-view', {'report':'fixture'}, {}, lambda: {'total':123})
second = response_cache.get_or_compute('report-view', {'report':'fixture'}, {}, lambda: 1/0)
assert first.body == second.body and json.loads(second.body) == {'total':123}
stats = importlib.import_module('access_stats')
assert stats.PATH == state / 'prewarm' / 'access.sqlite'
import prewarm
recorder = prewarm.AccessRecorder.start()
recorder.submit('graph', {'industry':'fixture'}, cost_s=1, size=128)
recorder._queue.join()
assert recorder.recorded == 1 and recorder.failed == 0
assert stats.flush()
assert stats.top(['cache/report-view']) and stats.top(['graph'])
assert stats.PATH.is_file()
stats.configure(state / 'closed.sqlite')
print(json.dumps({'ledger':str(state/'prewarm/access.sqlite'), 'cache_hit':second.hit}))
'''
            result = subprocess.run([sys.executable, '-B', '-c', script, str(state)],
                                    env=environment, cwd=program, capture_output=True, text=True, timeout=30)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout)['cache_hit'], 'memory')
            self.assertEqual(census(program), before_program)
            self.assertEqual(census(data), before_data)
            self.assertTrue((state/'prewarm'/'access.sqlite').is_file())


if __name__ == '__main__':
    unittest.main()

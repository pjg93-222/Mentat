"""Actual passive Console/Handler seam, with generated files only."""
from contextlib import redirect_stdout
import http.client
import importlib.util
import io
import json
import os
from pathlib import Path
import sys
import tempfile
import threading
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch
from test_public_data import fixture, prepare

APP=Path(__file__).resolve().parents[1]/'app'
sys.path.insert(0,str(APP))
spec=importlib.util.spec_from_file_location('public_data_http_server',APP/'server.py')
app=importlib.util.module_from_spec(spec);spec.loader.exec_module(app)


class PublicDataHTTPTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name);source=self.root/'source';source.mkdir();fixture(source,101)
        self.catalogue=prepare(source);self.reports=self.root/'original-reports';self.reports.mkdir()
        with patch.object(app,'report_directory',return_value=self.reports),patch.object(app,'environment_keys',return_value=[]):
            self.console=app.Console(self.root/'original-console',read_only=True,public_data=self.catalogue)
        self.server=app.ThreadingHTTPServer(('127.0.0.1',0),app.Handler);self.server.app=self.console
        self.worker=threading.Thread(target=self.server.serve_forever,daemon=True);self.worker.start()
        self.addCleanup(self.close)

    def close(self):
        self.server.shutdown();self.server.server_close();self.worker.join(5)

    def request(self,path):
        connection=http.client.HTTPConnection('127.0.0.1',self.server.server_port,timeout=8)
        try:
            connection.request('GET',path)
            response=connection.getresponse();raw=response.read()
            value=json.loads(raw) if response.getheader('Content-Type')=='application/json' else raw
            return response.status,dict(response.getheaders()),value
        finally:connection.close()

    def test_actual_catalogue_rows_provenance_and_exact_download(self):
        status,_,value=self.request('/api/public-data/catalogue')
        self.assertEqual((status,len(value['tables'])),(200,12))
        status,_,value=self.request('/api/public-data/rows?table=mentat.fec.cm.2022&page=1')
        self.assertEqual((status,len(value['rows']),value['firstRow']),(200,1,101))
        status,_,value=self.request('/api/public-data/provenance?table=mentat.fec.cm.2022')
        self.assertEqual((status,value['document']['table']),(200,'cm'))
        status,headers,value=self.request('/api/public-data/download?table=mentat.fec.cm.2022')
        self.assertEqual(status,200);self.assertEqual(headers['X-Content-Type-Options'],'nosniff')
        self.assertEqual(headers['Content-Disposition'],'attachment; filename="cm-2022.txt"')
        self.assertEqual(value,(self.root/'source/fec/2022/cm.psv').read_bytes())

    def test_ordinary_unavailable_context_does_not_probe_a_source(self):
        self.console.public_data=None
        with patch.object(app.Path,'lstat',side_effect=AssertionError('no source probes')):
            status,_,value=self.request('/api/public-data/catalogue')
        self.assertEqual(status,503);self.assertFalse(value['available'])

    def test_unknown_duplicate_and_targeting_parameters_are_refused(self):
        for query in ('table=../private','table=mentat.fec.cm.2022&party=R',
                'table=mentat.fec.cm.2022&table=mentat.fec.cm.2024','table=mentat.fec.cm.2022&page=-1',
                'table=mentat.fec.cm.2022&page=','table=mentat.fec.cm.2022&name=fixture'):
            with self.subTest(query=query):self.assertEqual(self.request('/api/public-data/rows?'+query)[0],400)
        self.assertEqual(self.request('/api/public-data/unknown')[0],404)

    def test_explicit_capability_preserves_original_private_roots_and_default(self):
        self.assertIs(self.console.public_data,self.catalogue)
        self.assertIs(self.console.report_directory,self.reports)
        self.assertEqual(self.console.root,(self.root/'original-console').resolve())
        self.assertEqual(list(self.reports.iterdir()),[])
        with patch.object(app,'report_directory',return_value=self.reports),patch.object(app,'environment_keys',return_value=[]):
            ordinary=app.Console(self.root/'ordinary',read_only=True)
            self.assertIsNone(ordinary.public_data)
            with self.assertRaises(ValueError):app.Console(self.root/'forbidden',public_data={'complete':True})
        self.assertFalse((self.root/'forbidden').exists())

    def test_main_hook_once_after_original_context_attachment_before_serving(self):
        self._main_hook(False)

    def test_main_hook_failure_closes_new_server_without_readiness_or_serve(self):
        self._main_hook(True)

    def _main_hook(self,fail):
        calls=[];output=io.StringIO()
        server=SimpleNamespace(server_address=('127.0.0.1',12345),server_port=12345,
                               serve_forever=Mock(),server_close=Mock())
        config=SimpleNamespace(enforced=False,bind_host='127.0.0.1')
        def ready(current):
            calls.append(current)
            self.assertIs(current.app.public_data,self.catalogue)
            self.assertIs(current.app.report_directory,self.reports)
            self.assertEqual(current.app.root,(self.root/'main-console').resolve())
            current.serve_forever.assert_not_called()
            self.assertEqual(output.getvalue(),'')
            if fail:raise ValueError('fixture native install refused')
        fake_modules={'source_memo':SimpleNamespace(install=lambda:None),
                      'analysis_data':SimpleNamespace(HINTS_ENABLED=False),
                      'prewarm':SimpleNamespace(AccessRecorder=SimpleNamespace(start=lambda **_:None))}
        with patch.object(sys,'argv',['server','--port','0','--data-root',str(self.root/'main-console')]),\
             patch.object(app,'report_directory',return_value=self.reports),\
             patch.object(app,'environment_keys',return_value=[]),\
             patch.object(app.os,'chdir'),patch.object(app,'console_server',return_value=server),\
             patch.object(app.access_gate,'require_config_or_exit',return_value=config),\
             patch.object(app.access_gate,'assert_bind_consistent'),\
             patch.dict(os.environ,{'MENTAT_PREWARM':'0','MENTAT_STATE_WRITE_ROOT':''}),\
             patch.dict(sys.modules,fake_modules),redirect_stdout(output):
            if fail:
                with self.assertRaisesRegex(ValueError,'fixture native install refused'):
                    app.main(public_data=self.catalogue,on_server_ready=ready)
            else:app.main(public_data=self.catalogue,on_server_ready=ready)
        self.assertEqual(calls,[server])
        if fail:
            server.server_close.assert_called_once_with();server.serve_forever.assert_not_called()
            self.assertEqual(output.getvalue(),'')
        else:
            server.server_close.assert_not_called();server.serve_forever.assert_called_once_with()


if __name__=='__main__':unittest.main()

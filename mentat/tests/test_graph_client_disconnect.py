"""Graph response disconnects do not become a second response on a closed socket.

Execute the shipped handler methods without importing contribution accounting
rules, which require private inputs absent from the public source checkout.
Only graph computation and response encoding are inert; routing, both response
writers and exception handling are the production methods.
"""
import ast
import gzip
import io
import json
from pathlib import Path
import secrets
import time
from types import ModuleType, SimpleNamespace
import unittest
from unittest.mock import Mock, patch
from urllib.parse import parse_qs, urlparse
import zipfile


SERVER = Path(__file__).resolve().parents[1] / 'app' / 'server.py'


class GraphClientDisconnectTest(unittest.TestCase):
    def setUp(self):
        handler = next(node for node in ast.parse(SERVER.read_text(encoding='utf-8')).body
                       if isinstance(node, ast.ClassDef) and node.name == 'Handler')
        names = {'do_GET', 'do_POST', 'send', 'send_entry', 'error_text'}
        methods = [node for node in handler.body if isinstance(node, ast.FunctionDef) and node.name in names]
        self.assertEqual({node.name for node in methods}, names)
        self.record_access = Mock()
        namespace = {'urlparse': urlparse, 'parse_qs': parse_qs, 'time': time,
                     'json': json, 'gzip': gzip, 'zipfile': zipfile, 'secrets': secrets,
                     'Conflict': type('Conflict', (Exception,), {}),
                     'RunNotFound': type('RunNotFound', (Exception,), {}),
                     'access_gate': SimpleNamespace(HEALTH_ROUTES=set()),
                     'accepts_gzip': lambda value: False, 'CONSOLE_CSP': '',
                     'prefetch_request': lambda request: False, 'record_access': self.record_access}
        exec(compile(ast.Module(body=methods, type_ignores=[]), str(SERVER), 'exec'), namespace)
        Handler = type('Handler', (), {name: namespace[name] for name in names})
        self.handler = Handler()
        self.handler.path = '/api/graph?id=published-reports'
        self.handler.headers = {}
        self.handler.access_cfg = SimpleNamespace(enforced=False)
        self.handler.valid_host = lambda: True
        self.graph = Mock(return_value={'rows': []})
        self.handler.server = SimpleNamespace(app=SimpleNamespace(graph=self.graph))
        self.handler.source_metadata = lambda reader, industry: reader([])
        self.handler.send_response = Mock()
        self.handler.send_header = Mock()
        self.handler.end_headers = Mock()
        self.handler.wfile = SimpleNamespace(write=Mock())
        self.handler.close_connection = False
        response_cache = ModuleType('response_cache')
        response_cache.from_value = Mock(return_value=object())
        response_cache.respond = Mock(return_value=(200, (), b'{"rows":[]}'))
        self.enterContext(patch.dict('sys.modules', {'response_cache': response_cache}))

    def disconnected(self, error):
        self.handler.wfile.write.side_effect = error
        self.handler.do_GET()
        self.handler.send_response.assert_called_once_with(200)
        self.handler.wfile.write.assert_called_once_with(b'{"rows":[]}')
        self.assertTrue(self.handler.close_connection)
        self.record_access.assert_not_called()

    def test_windows_connection_aborted_10053_does_not_send_another_response(self):
        self.disconnected(ConnectionAbortedError(10053, 'Synthetic client cancellation'))

    def test_connection_reset_does_not_send_another_response(self):
        self.disconnected(ConnectionResetError('Synthetic client reset'))

    def test_broken_pipe_does_not_send_another_response(self):
        self.disconnected(BrokenPipeError('Synthetic client disconnect'))

    def graph_error(self, error):
        self.graph.side_effect = error
        self.handler.do_GET()
        self.handler.send_response.assert_called_once_with(400)
        self.assertEqual(json.loads(self.handler.wfile.write.call_args.args[0]), {'error': str(error)})
        self.assertFalse(self.handler.close_connection)
        self.record_access.assert_not_called()

    def test_graph_validation_errors_still_reach_the_client(self):
        self.graph_error(ValueError('Synthetic unavailable graph source'))

    def test_graph_io_errors_still_reach_the_client(self):
        self.graph_error(OSError('Synthetic unreadable graph source'))

    def test_completed_graph_response_is_still_recorded(self):
        self.handler.do_GET()
        self.handler.send_response.assert_called_once_with(200)
        self.handler.wfile.write.assert_called_once_with(b'{"rows":[]}')
        self.assertFalse(self.handler.close_connection)
        self.assertEqual(self.record_access.call_count, 1)

    def prepare_post(self):
        self.handler.path = '/api/forecast/project'
        self.handler.headers = {'Content-Type': 'application/json', 'Content-Length': '2',
                                'X-Mentat-Token': 'owned-test-token'}
        self.handler.session_token = lambda: 'owned-test-token'
        self.handler.rfile = io.BytesIO(b'{}')
        self.handler.discard_body = Mock()
        forecast = ModuleType('giving_forecast')
        forecast.project = Mock(return_value={'projected': True})
        self.enterContext(patch.dict('sys.modules', {'giving_forecast': forecast}))
        return forecast

    def post_disconnected(self, error):
        forecast = self.prepare_post()
        self.handler.wfile.write.side_effect = error
        self.handler.do_POST()
        forecast.project.assert_called_once_with({})
        self.handler.send_response.assert_called_once_with(200)
        self.handler.wfile.write.assert_called_once_with(b'{"projected":true}')
        self.assertTrue(self.handler.close_connection)

    def test_post_windows_aborted_response_does_not_send_another_response(self):
        self.post_disconnected(ConnectionAbortedError(10053, 'Synthetic POST cancellation'))

    def test_post_reset_response_does_not_send_another_response(self):
        self.post_disconnected(ConnectionResetError('Synthetic POST reset'))

    def test_post_broken_pipe_response_does_not_send_another_response(self):
        self.post_disconnected(BrokenPipeError('Synthetic POST disconnect'))

    def test_post_body_disconnect_does_not_attempt_an_error_response(self):
        forecast = self.prepare_post()
        self.handler.rfile = SimpleNamespace(read=Mock(side_effect=ConnectionResetError('Synthetic body reset')))
        self.handler.do_POST()
        forecast.project.assert_not_called()
        self.handler.send_response.assert_not_called()
        self.handler.wfile.write.assert_not_called()
        self.assertTrue(self.handler.close_connection)

    def test_post_validation_error_still_reaches_the_client(self):
        forecast = self.prepare_post()
        forecast.project.side_effect = ValueError('Synthetic invalid forecast')
        self.handler.do_POST()
        self.handler.send_response.assert_called_once_with(400)
        self.assertEqual(json.loads(self.handler.wfile.write.call_args.args[0]),
                         {'error': 'Synthetic invalid forecast'})
        self.assertFalse(self.handler.close_connection)


if __name__ == '__main__':
    unittest.main()

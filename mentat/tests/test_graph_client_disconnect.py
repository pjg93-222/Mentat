"""Graph response disconnects do not become a second response on a closed socket.

Execute the shipped handler methods without importing contribution accounting
rules, which require private inputs absent from the public source checkout.
Only graph computation and response encoding are inert; routing, both response
writers and exception handling are the production methods.
"""
import ast
import gzip
import json
from pathlib import Path
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
        names = {'do_GET', 'send', 'send_entry', 'error_text'}
        methods = [node for node in handler.body if isinstance(node, ast.FunctionDef) and node.name in names]
        self.assertEqual({node.name for node in methods}, names)
        self.record_access = Mock()
        namespace = {'urlparse': urlparse, 'parse_qs': parse_qs, 'time': time,
                     'json': json, 'gzip': gzip, 'zipfile': zipfile,
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


if __name__ == '__main__':
    unittest.main()

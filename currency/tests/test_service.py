from unittest import TestCase
from currencies import server
from currencies import repository


class TestService(TestCase):

    def setUp(self):
        app = server.start(repository)
        self.client = app.test_client()

    def test_root_returns_200(self):
        response = self.client.get("/")
        assert response.status_code == 200

    def test_root_returns_a_list(self):
        response = self.client.get("/")
        assert isinstance(response.json, list)

    def test_root_returns_a_non_empty_list(self):
        response = self.client.get("/")
        assert len(response.json) > 0

from flask import Flask, jsonify
from flask_cors import CORS


def start(repository) -> Flask:

    app = Flask(__name__)
    CORS(app)

    @app.route('/')
    def main():
        currencies = repository.all()
        return jsonify(currencies)

    return app

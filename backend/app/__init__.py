import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from .extensions import db
from .routes.api import api_bp


def create_app():
    load_dotenv()
    app = Flask(__name__)

    database_url = os.getenv("DATABASE_URL", "sqlite:///esistoancheio.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
    CORS(app, resources={r"/api/*": {"origins": [origin.strip() for origin in origins.split(",")]}})

    db.init_app(app)

    with app.app_context():
        from . import models
        db.create_all()

    app.register_blueprint(api_bp, url_prefix="/api")
    return app

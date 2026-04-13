from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from Med_app.Med_app_config_final import Med_Config

db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()

def Med_create_app():
    app = Flask(__name__)
    app.config.from_object(Med_Config)

    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    login_manager.login_view = "Med_auth.Med_login"


    return app
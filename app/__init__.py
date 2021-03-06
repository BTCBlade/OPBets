import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Event
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.betsapi_routes import betsapi_routes
from .api.events_routes import events_routes
from .api.wagers_routes import wagers_routes

from .seeds import seed_commands

from .config import Config

# from threading import Thread
# import time
# from celery import Celery

app = Flask(__name__)
#seeder_path = os.path.join(app.root_path, '/seeds','/50event_seeders.json')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(betsapi_routes, url_prefix='/api/betsapi')
app.register_blueprint(events_routes, url_prefix='/api/events')
app.register_blueprint(wagers_routes, url_prefix='/api/wagers')

db.init_app(app)
Migrate(app, db)



# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........

#FLASK_DEBUG=1 flask run --no-reload

# def make_celery(app):
#     celery = Celery(
#         app.import_name,
#         backend=app.config['CELERY_RESULT_BACKEND'],
#         broker=app.config['CELERY_BROKER_URL']
#     )
#     celery.conf.update(app.config)

#     class ContextTask(celery.Task):
#         def __call__(self, *args, **kwargs):
#             with app.app_context():
#                 return self.run(*args, **kwargs)

#     celery.Task = ContextTask
#     return celery

# def testing():
#     with app.app_context():
#         while True:
#             update_events()
#             time.sleep(3600)
# testing()

# def testing2():
#     with app.app_context():
#         while True:
#             print('+++++++++++++++++++++')
#             time.sleep(3600)


# def background_loop():
#     thread = Thread(target=testing2)
#     thread.start()


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

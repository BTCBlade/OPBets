from flask import Blueprint
from app.models import Event

events_routes = Blueprint('events', __name__)


@events_routes.route('/all')
def load_events_all():
    all_events = Event.query.all()
    return {"events_all": [event.to_dict() for event in all_events]}

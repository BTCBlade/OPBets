from flask import Blueprint
from app.models import Event

events_routes = Blueprint('events', __name__)


@events_routes.route('/all')
def load_events_all():
    all_events = Event.query.filter_by(sport_id="151").all()
    return {"events_all": [event.to_dict() for event in all_events]}

@events_routes.route('/all/AA')
def load_aa_events_all():
    all_events = Event.query.filter_by(sport_id="1").all()
    return {"events_all": [event.to_dict() for event in all_events]}

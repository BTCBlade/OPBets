from flask import Blueprint
from app.models import Event
import time


events_routes = Blueprint('events', __name__)


# @events_routes.route('/all')
# def load_events_all():
#     all_events = Event.query.filter_by(sport_id="151").all()
#     return {"events_all": [event.to_dict() for event in all_events]}

# @events_routes.route('/all/AA')
# def load_aa_events_all():
#     all_events = Event.query.filter(Event.sport_id=="1").all()
#     return {"events_all": [event.to_dict() for event in all_events]}

@events_routes.route('/<query_str>')
def load_specific_events(query_str):

    current_time = time.time()
    if query_str == 'all':
        specific_events = Event.query.filter(Event.sport_id=="151", Event.time>=current_time).order_by(Event.time.asc()).all()
    elif query_str == 'app_academy':
        specific_events = Event.query.filter(Event.sport_id=="1", Event.time>=current_time).order_by(Event.time.asc()).all()
    elif query_str == 'small_cap_crypto':
        specific_events = Event.query.filter(Event.sport_id=="2").all()
    elif query_str =='politics':
        specific_events = Event.query.filter(Event.sport_id=='420').all()
    else:
        specific_events = Event.query.filter(Event.league.contains(query_str), Event.time>=current_time).order_by(Event.time.asc())
    print({"specific_events": [event.to_dict() for event in specific_events]})
    return {"specific_events": [event.to_dict() for event in specific_events]}

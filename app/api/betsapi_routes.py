import os
import requests
import json
from flask import Blueprint, jsonify, request

betsapi_routes = Blueprint('betsapi', __name__)

BETSAPI_KEY = os.environ.get('BETSAPI_KEY')



@betsapi_routes.route('/')
def get_seed_data():
    # Step 1 Query for upcoming events, using betsapi eventsAPI, might need multiple request as its 50 per page
    # https://betsapi.com/docs/events/upcoming.html
    # https://api.b365api.com/v2/events/upcoming?sport_id=1&token=YOUR-TOKEN
    upcoming_events = json.loads((requests.get(f'https://api.b365api.com/v2/events/upcoming?sport_id=151&token={BETSAPI_KEY}').content).decode('utf-8'))['results']


    # Step 2 Query bet365API to Attach Odds using event_id(betsapi's event id)
    # https://betsapi.com/docs/bet365/
    # https://api.b365api.com/v3/bet365/prematch?token=YOUR-TOKEN&event_id=3383382,3385542

    query_string = f'https://api.b365api.com/v3/bet365/prematch?token={BETSAPI_KEY}&FI='
    for num in range(0, 50):
        upcoming_events[num]
        if 'bet365_id' in upcoming_events[num]:
            res = json.loads((requests.get(query_string + upcoming_events[num]['bet365_id']).content).decode('utf-8'))
            if 'results' in res:
                upcoming_events[num]['prematch_odds'] = res['results'][0]
            else:
                upcoming_events[num]['prematch_odds'] = {}


    # if 'id' in upcoming_events[num]:
    #     query_string += upcoming_events[num]['id'] + ','
    # upcoming_events_odds = json.loads((requests.get(query_string).content).decode('utf-8'))['results']

    # for num in range(0,a):
    #     upcoming_events[num]["prematch_odds"] = upcoming_events_odds[num]
    # a += 8

    # Step 3 team image logos in front end
    # https://betsapi.com/docs/events/faq.html
    # https://assets.b365api.com/images/team/m/240586.png

    return {'upcoming_events': upcoming_events}

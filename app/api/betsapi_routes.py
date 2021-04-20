import os
import pathlib
import requests
import json
from threading import Thread
import time
import math

from app.models import db, Event, Prediction
from app.utils import decimal_to_american, despread_odds_pair
from flask import Blueprint, jsonify, request

betsapi_routes = Blueprint('betsapi', __name__)

BETSAPI_KEY = os.environ.get('BETSAPI_KEY')

# def run_job():
#     while True:
#         print("PLEASE WORK")
#         time.sleep(6)
# # thread = threading.Thread(target=run_job)
# # thread.start()
# run_job()

@betsapi_routes.route('/update_events')
def update_events():
    print('-------------------')

    upcoming_events = []
    res = json.loads((requests.get(f'https://api.b365api.com/v2/events/upcoming?sport_id=151&token={BETSAPI_KEY}').content).decode('utf-8'))
    total_pages = math.ceil(res['pager']['total']/50)
    for x in range(1, total_pages + 1):
        fifty_events = json.loads((requests.get(f'https://api.b365api.com/v2/events/upcoming?sport_id=151&token={BETSAPI_KEY}&page={x}').content).decode('utf-8'))['results']
        upcoming_events.extend(fifty_events)
    for event in upcoming_events:
        if event.get('bet365_id'):
            db_event = Event.query.filter_by(bet365_id=event['bet365_id']).first()
            bet365_bet_id = event['bet365_id']
            query_string = f'https://api.b365api.com/v3/bet365/prematch?token={BETSAPI_KEY}&FI={bet365_bet_id}'
            home_odds = ''
            away_odds = ''
            res = ''

            res = json.loads((requests.get(query_string).content).decode('utf-8'))

            if res['success'] == 1:
                res = res['results'][0]
            else:
                continue
            home_odds = decimal_to_american(float(res['schedule']['sp']['main'][0]['odds']))
            away_odds = decimal_to_american(float(res['schedule']['sp']['main'][1]['odds']))
            pair_odds = despread_odds_pair(home_odds, away_odds)
            if home_odds > away_odds:
                home_odds = pair_odds
                away_odds = pair_odds * -1
            else:
                home_odds = pair_odds * -1
                away_odds = pair_odds

            # Event already exists in db
            if db_event is not None:
                #update predictions[0] and predictions[1]
                db_event.time_status = event['time_status']
                db_event.predictions[0].odds = home_odds
                db_event.predictions[1].odds = away_odds
                db.session.commit()
            else:
                #Event does NOT exist in db
                db_event = Event(betsapi_id=event['id'], bet365_id=event['bet365_id'],
                                sport_id=event['sport_id'], home=json.dumps(event['home']),
                                away=json.dumps(event['away']),
                                league=json.dumps(event['league']),
                                time=event['time'], time_status=event['time_status'] )
                db.session.add(db_event)
                db.session.commit()
                prediction1 = Prediction(db_event_id=db_event.id, is_home=True, event_line='0',
                                        odds=home_odds,
                                        betsapi_event_id=res['event_id'],
                                        bet365_bet_id=res['FI'],
                                        time_status=event['time_status'])
                prediction2 = Prediction(db_event_id=db_event.id, is_home=False, event_line='0',
                                        odds=away_odds,
                                        betsapi_event_id=res['event_id'],
                                        bet365_bet_id=res['FI'],
                                        time_status=event['time_status'])
                db.session.add(prediction1)
                db.session.add(prediction2)
                db.session.commit()
    print('-----++++++++++++++++++++++++------------')
    return {'something_in_future': 'something'}

# db_event = Event.query.filter_by(bet365_id='101334694').first()
# print('---------------')
# print(db_event)




    # query_string = f'https://api.b365api.com/v3/bet365/prematch?token={BETSAPI_KEY}&FI='
    # for num in range(0, 50):
    #     upcoming_events[num]
    #     if 'bet365_id' in upcoming_events[num]:
    #         res = json.loads((requests.get(query_string + upcoming_events[num]['bet365_id']).content).decode('utf-8'))
    #         if 'results' in res:
    #             upcoming_events[num]['prematch_odds'] = res['results'][0]
    #         else:
    #             upcoming_events[num]['prematch_odds'] = {}



@betsapi_routes.route('/req_seeder')
def send_seeder_data():
    events = ''

    #PATHING PYTHON
    dir = pathlib.Path(__file__).parent.absolute()
    seeder_path = dir / '50events_seeder.json'

    with open(seeder_path.resolve()) as json_file:
        events = json.load(json_file)['upcoming_events']
    return {'upcoming_events': events}




@betsapi_routes.route('/req_50')
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

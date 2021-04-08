import json
import pathlib
from random import randint
from app.models import db, Event, Prediction

dir = pathlib.Path(__file__).parent.absolute()
seeder_path = dir / '50events_seeder.json'


def seed_events_predictions():
    null = None
    events = ''
    with open(seeder_path) as json_file:
        events = json.load(json_file)['upcoming_events']
    db_event_id = 1
    for event in events:
        bet365_id_id = event['bet365_id'] if event.get('bet365_id') else None
        seed_Event = Event(betsapi_id=event['id'], bet365_id=bet365_id_id,
                            sport_id=event['sport_id'], home=json.dumps(event['home']),
                            away=json.dumps(event['away']),
                            league=json.dumps(event['league']),
                            time=event['time'], time_status=event['time_status'])
        if event.get('prematch_odds'):
            fake_home_odds = 0
            while fake_home_odds < 100 and fake_home_odds > -100:
                fake_home_odds = randint(-900, 900)
            fake_away_odds = fake_home_odds * -1
            #### betsapi bet365 format odds=event['prematch_odds']['schedule']['sp']['main'][0]['odds'],
            seed_Prediction1 = Prediction(db_event_id=db_event_id, is_home=True, event_line='0',
                                        odds=fake_home_odds,
                                        betsapi_event_id=event['prematch_odds']['event_id'],
                                        bet365_bet_id=event['prematch_odds']['FI'],
                                        time_status=event['time_status'])
            seed_Prediction2 = Prediction(db_event_id=db_event_id, is_home=False, event_line='0',
                                        odds=fake_away_odds,
                                        betsapi_event_id=event['prematch_odds']['event_id'],
                                        bet365_bet_id=event['prematch_odds']['FI'],
                                        time_status=event['time_status'])
        else:
            seed_Prediction1 = Prediction(is_home=True, db_event_id=db_event_id)
            seed_Prediction2 = Prediction(is_home=False, db_event_id=db_event_id)
        db.session.add(seed_Event)
        db.session.add(seed_Prediction1)
        db.session.add(seed_Prediction2)
        db_event_id += 1
    # event1 = Event(betsapi_id='3391106', bet365_id='100822105',
    #                 sport_id='151', home= json.dumps({"cc": null, "id": "193777", "image_id": "402893", "name": "Bilibili Gaming"}),
    #                 away=json.dumps({"cc": null,"id": "328908","image_id": null,"name": "First Fabulous Fighter"}),
    #                 league=json.dumps({"cc": null,"id": "25442","name": "Overwatch - Contenders - CN"}),
    #                 time="1617256800", time_status='0')
    # event2 = Event(betsapi_id='3386946', bet365_id='100736914',
    #                 sport_id='151', home= json.dumps({"cc": null,"id": "294683","image_id": "610462","name": "Bizarre Gaming"}),
    #                 away=json.dumps({"cc": null,"id": "382087","image_id": "783752","name": "eetswa"}),
    #                 league=json.dumps({"cc": "nz","id": "15125","name": "CS:GO - ESL ANZ"}),
    #                 time="1617260400", time_status='0')

    # db.session.add(event1)
    # db.session.add(event2)
    db.session.commit()

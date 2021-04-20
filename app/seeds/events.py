import json
import pathlib
from random import randint
from app.models import db, Event, Prediction
from app.utils import decimal_to_american, despread_odds_pair

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
            # fake_home_odds = 0
            # while fake_home_odds < 100 and fake_home_odds > -100:
            #     fake_home_odds = randint(-900, 900)
            # fake_away_odds = fake_home_odds * -1
            #### betsapi bet365 format odds=event['prematch_odds']['schedule']['sp']['main'][0]['odds'],
            home_odds = decimal_to_american(float(event['prematch_odds']['schedule']['sp']['main'][0]['odds']))
            away_odds = decimal_to_american(float(event['prematch_odds']['schedule']['sp']['main'][1]['odds']))
            pair_odds = despread_odds_pair(home_odds, away_odds)
            if home_odds > away_odds:
                home_odds = pair_odds
                away_odds = pair_odds * -1
            else:
                home_odds = pair_odds * -1
                away_odds = pair_odds

            seed_Prediction1 = Prediction(db_event_id=db_event_id, is_home=True, event_line='0',
                                        odds=home_odds,
                                        betsapi_event_id=event['prematch_odds']['event_id'],
                                        bet365_bet_id=event['prematch_odds']['FI'],
                                        time_status=event['time_status'])
            seed_Prediction2 = Prediction(db_event_id=db_event_id, is_home=False, event_line='0',
                                        odds=away_odds,
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
    ## aa event lols seeds
    aaEvent1 = Event(betsapi_id='0', bet365_id='0',
                        sport_id='1', home=json.dumps({'name': "YES - a/A Nov Cohort" }),
                        away=json.dumps({'name': 'NO - a/A Nov Cohort'}),
                        league=json.dumps({'name': "Career Quest - More than 30 Students have jobs before end of 2021"}),
                        time='1640947624', time_status='0')
    aaPrediction1 = Prediction(db_event_id=db_event_id, is_home=True, event_line='0',
                                    odds='-800',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    aaPrediction2 = Prediction(db_event_id=db_event_id, is_home=False, event_line='0',
                                    odds='800',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    db_event_id += 1
    aaEvent2 = Event(betsapi_id='1', bet365_id='1',
                                    sport_id='1', home=json.dumps({'name': "YES - Jesse or Michelle will quit" }),
                                    away=json.dumps({'name': 'NO - Good coaches never quit'}),
                                    league=json.dumps({'name': "PTM Consistency - Module 7 PTM quits before graduation"}),
                                    time='1618195624', time_status='0')
    aaPrediction3 = Prediction(db_event_id=db_event_id, is_home=True, event_line='0',
                                    odds='300',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    aaPrediction4 = Prediction(db_event_id=db_event_id, is_home=False, event_line='0',
                                    odds='-300',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    db_event_id += 1
    aaEvent3 = Event(betsapi_id='2', bet365_id='2',
                                    sport_id='1', home=json.dumps({'name': "YES - We've all tried so hard..." }),
                                    away=json.dumps({'name': 'NO - No project no snaps'}),
                                    league=json.dumps({'name': "Students - Everyone will graduate "}),
                                    time='1618195624', time_status='0')
    aaPrediction5 = Prediction(db_event_id=db_event_id, is_home=True, event_line='0',
                                    odds='-950',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    aaPrediction6 = Prediction(db_event_id=db_event_id, is_home=False, event_line='0',
                                    odds='950',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    db_event_id += 1
    aaEvent4 = Event(betsapi_id='3', bet365_id='3',
                                    sport_id='1', home=json.dumps({'name': "YES - Hired" }),
                                    away=json.dumps({'name': 'NO - Not Hilarious'}),
                                    league=json.dumps({'name': "OPBets - The maker of this app gets hired by App Academy to integrate this feature into progress tracker"}),
                                    time='1618195624', time_status='0')
    aaPrediction7 = Prediction(db_event_id=db_event_id, is_home=True, event_line='0',
                                    odds='-150',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    aaPrediction8 = Prediction(db_event_id=db_event_id, is_home=False, event_line='0',
                                    odds='150',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    db_event_id += 1

    db.session.add(aaEvent1)
    db.session.add(aaPrediction1)
    db.session.add(aaPrediction2)
    db.session.add(aaEvent2)
    db.session.add(aaPrediction3)
    db.session.add(aaPrediction4)
    db.session.add(aaEvent3)
    db.session.add(aaPrediction5)
    db.session.add(aaPrediction6)
    db.session.add(aaEvent4)
    db.session.add(aaPrediction7)
    db.session.add(aaPrediction8)

    ## small_cap_crypto event  seeds
    small_cap_crypto_Event1 = Event(betsapi_id='4', bet365_id='4',
                        sport_id='2', home=json.dumps({'name': "YES - Cardano is the third into POS market" }),
                        away=json.dumps({'name': 'NO - I hate crypto and I am jelly'}),
                        league=json.dumps({'name': "Cardano will hit 2 USD before 06/01/2021"}),
                        time='1622535788', time_status='0')
    small_cap_crypto_Prediction1 = Prediction(db_event_id=db_event_id, is_home=True, event_line='0',
                                    odds='-110',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')
    small_cap_crypto_Prediction2 = Prediction(db_event_id=db_event_id, is_home=False, event_line='0',
                                    odds='110',
                                    betsapi_event_id='0',
                                    bet365_bet_id='0',
                                    time_status='0')

    db.session.add(small_cap_crypto_Event1)
    db.session.add(small_cap_crypto_Prediction1)
    db.session.add(small_cap_crypto_Prediction2)
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

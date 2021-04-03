from app.models import db, Prediction

def seed_predictions():
    prediction1 = Prediction(is_home=True, event_line='0', odds='1.36',
                            time_status='0', db_event_id=1, bet365_id='100822105',
                            betsapi_id='3391106')
    prediction2 = Prediction(is_home=False, event_line='0', odds='3.00',
                            time_status='0', db_event_id=1, bet365_id='100822105',
                            betsapi_id='3391106')
    prediction3 = Prediction(is_home=True, event_line='0', odds='1.57',
                            time_status='0', db_event_id=2, bet365_id='100736914',
                            betsapi_id='3386946')
    prediction4 = Prediction(is_home=False, event_line='0', odds='2.25',
                            time_status='0', db_event_id=2, bet365_id='100736914',
                            betsapi_id='3386946')


    db.session.add(prediction1)
    db.session.add(prediction2)
    db.session.add(prediction3)
    db.session.add(prediction4)
    db.session.commit()

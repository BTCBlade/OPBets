import json
import pathlib
from app.models import db, Event

dir = pathlib.Path(__file__).parent.absolute()
seeder_path = dir / '50events_seeder.json'


def seed_events():
    null = None
    # events = ''
    # with open(seeder_path) as json_file:
    #     events = json.load(json_file)['upcoming_events']
    event1 = Event(betsapi_id='3391106', bet365_id='100822105',
                    sport_id='151', home= json.dumps({"cc": null, "id": "193777", "image_id": "402893", "name": "Bilibili Gaming"}),
                    away=json.dumps({"cc": null,"id": "328908","image_id": null,"name": "First Fabulous Fighter"}),
                    league=json.dumps({"cc": null,"id": "25442","name": "Overwatch - Contenders - CN"}),
                    time="1617256800", time_status='0')
    event2 = Event(betsapi_id='3386946', bet365_id='100736914',
                    sport_id='151', home= json.dumps({"cc": null,"id": "294683","image_id": "610462","name": "Bizarre Gaming"}),
                    away=json.dumps({"cc": null,"id": "382087","image_id": "783752","name": "eetswa"}),
                    league=json.dumps({"cc": "nz","id": "15125","name": "CS:GO - ESL ANZ"}),
                    time="1617260400", time_status='0')

    db.session.add(event1)
    db.session.add(event2)
    db.session.commit()

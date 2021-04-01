import json

with open('50events_seeder.json') as json_file:
    events = json.load(json_file)['upcoming_events']

    for event in events:
        print('\nEvent', event)
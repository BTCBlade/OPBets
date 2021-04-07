from flask import Blueprint, request
from app.models import db, Wager, Prediction, Event
import json

wagers_routes = Blueprint('wagers', __name__)

@wagers_routes.route('/')
def wagers_root():
  return "hello world"

@wagers_routes.route('/add', methods=['POST'])
def add_wager():
  req_obj = request.get_json()

  #### IMPLEMENT ASAP #######
  #  Call external API to update odds
  #  Update database entry
  ###########################

  prediction = Prediction.query.get(req_obj['db_predictions_id'])

  event = Event.query.get(prediction.db_event_id)
  event_home_prediction_wagers = event.predictions[0].wagers
  event_away_prediction_wagers = event.predictions[1].wagers
  event_home_prediction_wagers_arr = [wager for wager in event_home_prediction_wagers if wager.current_amount > 0.0001]
  event_away_prediction_wagers_arr = [wager for wager in event_away_prediction_wagers if wager.current_amount > 0.0001]



  # 1. No Opposite side wagers No Same side wagers
  if ((len(event_home_prediction_wagers_arr) == 0) and (len(event_away_prediction_wagers_arr) == 0)):
    new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,
                      initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                      initial_fill=float(req_obj['amount']), liquidityProviderBool=True,
                      placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
    db.session.add(new_wager)
  # 2. No Opposite side wagers YES same side wagers in queue
  elif (prediction.is_home and (len(event_away_prediction_wagers_arr) == 0)):
    new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,
                      initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                      initial_fill=float(req_obj['amount']), liquidityProviderBool=True,
                      placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
    db.session.add(new_wager)
  elif (prediction.is_away and (len(event_home_prediction_wagers_arr) == 0)):
    new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,
                      initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                      initial_fill=float(req_obj['amount']), liquidityProviderBool=True,
                      placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
    db.session.add(new_wager)
  # 3. Opposite side wager amount > req.amount

  # 4. Opposite side wager amount < req.amount
  db.session.commit()

  return event.to_dict()

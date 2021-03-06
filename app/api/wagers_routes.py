from flask import Blueprint, request
from app.models import db, Wager, Prediction, Event, User, MatchedWager
import json

wagers_routes = Blueprint('wagers', __name__)

@wagers_routes.route('/')
def wagers_root():
  return "hello world"

@wagers_routes.route('/cancel/<int:id>')
def cancel_wager(id):
  print('---------------------------------------')
  wager = Wager.query.get(id)
  wager.user.balance = wager.user.balance + wager.current_amount
  wager.current_amount = 0
  db.session.commit()
  return {"wagerId": wager.id, "userId":wager.user.id}



@wagers_routes.route('/add', methods=['POST'])
def add_wager():
  req_obj = request.get_json()
  print('---------------------------------------')
  print(req_obj)
  req_amount = float(req_obj['amount'])
  req_user = User.query.get(req_obj['user_id'])

  prediction = Prediction.query.get(req_obj['db_predictions_id'])

  event = Event.query.get(prediction.db_event_id)
  event_home_prediction_wagers = event.predictions[0].wagers
  event_away_prediction_wagers = event.predictions[1].wagers
  def sortFunc(wager):
    return wager.id
  event_home_prediction_wagers_arr = [wager for wager in event_home_prediction_wagers if wager.current_amount > 0.0001]
  event_away_prediction_wagers_arr = [wager for wager in event_away_prediction_wagers if wager.current_amount > 0.0001]
  total_home_liquidity = 0
  total_away_liquidity = 0
  for wager in event_home_prediction_wagers_arr:
    total_home_liquidity += wager.current_amount
  for wager in event_away_prediction_wagers_arr:
    total_away_liquidity += wager.current_amount

  # A if prediction.odds > 0 (betting on underdog)
  if int(prediction.odds) > 0:
    # a. Check if User has enough balance
    if req_amount > req_user.balance:
      return 'Not enough balance to make wager'

    # 1. No Opposite side wagers No Same side wagers
    if ((len(event_home_prediction_wagers_arr) == 0) and (len(event_away_prediction_wagers_arr) == 0)):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds, lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)

    # 2. No Opposite side wagers YES same side wagers in queue
    elif (prediction.is_home and (len(event_away_prediction_wagers_arr) == 0)):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds, lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
    elif ((prediction.is_home is False) and (len(event_home_prediction_wagers_arr) == 0)):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds, lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)

    # 3.a Opposite side wager amount > req.amount
    # home
    elif (prediction.is_home and (total_away_liquidity >= ( float(req_obj['amount']) * (int(prediction.odds)/100) ) ) ):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds, lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=float(req_obj['amount']), liquidityProviderBool=False,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      while new_wager.current_amount > 0:
        for wager in event_away_prediction_wagers_arr:
          if new_wager.current_amount <= 0:
            break
          # wager queue's first in line wager is smaller than req_amount
          if (wager.current_amount < ( new_wager.current_amount * (int(prediction.odds)/100) ) ):
            dog_deduction = ( (wager.current_amount /  ( int(prediction.odds) ) ) * 100 )
            total_amount_matched = dog_deduction + wager.current_amount
            new_wager.current_amount = new_wager.current_amount -  dog_deduction
            wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=prediction.odds, matched_odds_away=str(int(prediction.odds) * -1),
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          else:
            #if wager queue's first in line wager is bigger than req_amount
            fav_deduction = new_wager.current_amount * (int(prediction.odds)/100)
            total_amount_matched = new_wager.current_amount + fav_deduction
            wager.current_amount = wager.current_amount - fav_deduction
            new_wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=prediction.odds, matched_odds_away=str(int(prediction.odds) * -1),
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          db.session.add(new_matchedwager)
    # 3.b Opposite side total wagers amount > req.amount
    # away
    elif ((prediction.is_home is False) and (total_home_liquidity >= ( float(req_obj['amount']) * (int(prediction.odds)/100) ) ) ):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds, lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=float(req_obj['amount']), liquidityProviderBool=False,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      while new_wager.current_amount > 0:
        for wager in event_home_prediction_wagers_arr:
          if new_wager.current_amount <= 0:
            break
          # wager queue's first in line wager is smaller than req_amount
          if (wager.current_amount < ( new_wager.current_amount * (int(prediction.odds)/100) ) ):
            dog_deduction = ( (wager.current_amount /  ( int(prediction.odds) ) ) * 100 )
            total_amount_matched = dog_deduction + wager.current_amount
            new_wager.current_amount = new_wager.current_amount -  dog_deduction
            wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=str(int(prediction.odds) * -1), matched_odds_away=prediction.odds,
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          else:
            #if wager queue's first in line wager is bigger than req_amount
            fav_deduction = new_wager.current_amount * (int(prediction.odds)/100)
            total_amount_matched = new_wager.current_amount + fav_deduction
            wager.current_amount = wager.current_amount - fav_deduction
            new_wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=str(int(prediction.odds) * -1), matched_odds_away=prediction.odds,
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          db.session.add(new_matchedwager)

    # 4.a Opposite side wager amount < req.amount
    # home
    elif (prediction.is_home and (total_away_liquidity <= ( float(req_obj['amount']) * (int(prediction.odds)/100) ) ) ):

      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds, lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      # Loop through opposite side wager queue until all liquidity has been taken
      for wager in event_away_prediction_wagers_arr:
        dog_deduction = ( (wager.current_amount /  ( int(prediction.odds) ) ) * 100 )
        total_amount_matched = dog_deduction + wager.current_amount
        new_wager.current_amount = new_wager.current_amount - dog_deduction
        new_wager.initial_fill = new_wager.initial_fill + dog_deduction
        wager.current_amount = 0
        new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=prediction.odds, matched_odds_away=str(int(prediction.odds) * -1),
                                        time_status=prediction.time_status, paidOutBool=False,
                                        liquidity_provider_wager_id=wager.id,
                                        liquidity_remover_wager_id=new_wager.id)
        db.session.add(new_matchedwager)
    # 4.b Opposite side wager amount < req.amount
    # away
    elif ((prediction.is_home is False) and (total_home_liquidity <= ( float(req_obj['amount']) * (int(prediction.odds)/100) ) ) ):

      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      # Loop through opposite side wager queue until all liquidity has been taken
      for wager in event_home_prediction_wagers_arr:
        dog_deduction = ( (wager.current_amount /  ( int(prediction.odds) ) ) * 100 )
        total_amount_matched = dog_deduction + wager.current_amount
        new_wager.current_amount = new_wager.current_amount - dog_deduction
        new_wager.initial_fill = new_wager.initial_fill + dog_deduction
        wager.current_amount = 0
        new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=str(int(prediction.odds) * -1), matched_odds_away=prediction.odds,
                                        time_status=prediction.time_status, paidOutBool=False,
                                        liquidity_provider_wager_id=wager.id,
                                        liquidity_remover_wager_id=new_wager.id)
        db.session.add(new_matchedwager)


    #### Deduct User Balance ####
    req_user.balance -= req_amount
    ################################################################################################
  else:
  # B if prediction.odds < 0 (betting on favorite)

    # a. Check if User has enough balance
    ################### Potential negative balance point implement something later #############################

    if req_amount > req_user.balance:
      return 'Not enough balance to make wager'
    ################### Potential negative balance point implement something later #############################

    # 1. No Opposite side wagers No Same side wagers
    if ((len(event_home_prediction_wagers_arr) == 0) and (len(event_away_prediction_wagers_arr) == 0)):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)


    # 2. No Opposite side wagers YES same side wagers in queue
    elif (prediction.is_home and (len(event_away_prediction_wagers_arr) == 0)):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
    elif ((prediction.is_home is False) and (len(event_home_prediction_wagers_arr) == 0)):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
    # 3.a Opposite side wager amount > req.amount
    # home
    elif (prediction.is_home and (total_away_liquidity >= ( float(req_obj['amount']) / (int(prediction.odds)/100 * -1) ) ) ):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=float(req_obj['amount']), liquidityProviderBool=False,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      while new_wager.current_amount > 0:
        for wager in event_away_prediction_wagers_arr:
          if new_wager.current_amount <= 0:
            break
          # wager queue's first in line wager is smaller than req_amount
          if (wager.current_amount < ( new_wager.current_amount / (int(prediction.odds)/100 * -1) ) ):
            fav_deduction = wager.current_amount * (int(prediction.odds) * -1 /100)
            total_amount_matched = fav_deduction + wager.current_amount
            new_wager.current_amount = new_wager.current_amount -  fav_deduction
            wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=prediction.odds, matched_odds_away=str(int(prediction.odds) * -1),
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          else:
            #if wager queue's first in line wager is bigger than req_amount
            dog_deduction = new_wager.current_amount / (int(prediction.odds)/100 * -1)
            total_amount_matched = new_wager.current_amount + dog_deduction
            wager.current_amount = wager.current_amount - dog_deduction
            new_wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=prediction.odds, matched_odds_away=str(int(prediction.odds) * -1),
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          db.session.add(new_matchedwager)
    # 3.b Opposite side total wagers amount > req.amount
    # away
    elif ((prediction.is_home is False) and (total_home_liquidity >= ( float(req_obj['amount']) / (int(prediction.odds)/100) * -1 ) ) ):
      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=float(req_obj['amount']), liquidityProviderBool=False,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      while new_wager.current_amount > 0:
        for wager in event_home_prediction_wagers_arr:
          if new_wager.current_amount <= 0:
            break
          # wager queue's first in line wager is smaller than req_amount
          if (wager.current_amount < ( new_wager.current_amount / (int(prediction.odds)/100 * -1) ) ):
            fav_deduction = wager.current_amount * (int(prediction.odds) * -1 /100)
            total_amount_matched = fav_deduction + wager.current_amount
            new_wager.current_amount = new_wager.current_amount -  fav_deduction
            wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=str(int(prediction.odds) * -1), matched_odds_away=prediction.odds,
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          else:
            #if wager queue's first in line wager is bigger than req_amount
            dog_deduction = new_wager.current_amount / (int(prediction.odds)/100 * -1)
            total_amount_matched = new_wager.current_amount + dog_deduction
            wager.current_amount = wager.current_amount - dog_deduction
            new_wager.current_amount = 0
            new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=str(int(prediction.odds) * -1), matched_odds_away=prediction.odds,
                                            time_status=prediction.time_status, paidOutBool=False,
                                            liquidity_provider_wager_id=wager.id,
                                            liquidity_remover_wager_id=new_wager.id)
          db.session.add(new_matchedwager)
    # 4.a Opposite side wager amount < req.amount
    # home
    elif (prediction.is_home and (total_away_liquidity <= ( float(req_obj['amount']) / (int(prediction.odds)/100) * -1 ) ) ):

      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      # Loop through opposite side wager queue until all liquidity has been taken
      for wager in event_away_prediction_wagers_arr:
        fav_deduction = wager.current_amount  * ( int(prediction.odds)/ 100 * -1 )
        total_amount_matched = fav_deduction + wager.current_amount
        new_wager.current_amount = new_wager.current_amount - fav_deduction
        new_wager.initial_fill = new_wager.initial_fill + fav_deduction
        wager.current_amount = 0
        new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=prediction.odds, matched_odds_away=str(int(prediction.odds) * -1),
                                        time_status=prediction.time_status, paidOutBool=False,
                                        liquidity_provider_wager_id=wager.id,
                                        liquidity_remover_wager_id=new_wager.id)
        db.session.add(new_matchedwager)
    # 4.b Opposite side wager amount < req.amount
    # away
    elif ((prediction.is_home is False) and (total_home_liquidity <= ( float(req_obj['amount']) / (int(prediction.odds)/100) *  -1 ) ) ):

      new_wager = Wager(initial_event_line='0', initial_odds=prediction.odds,lower_cancel_odds=req_obj['lowest'], higher_cancel_odds=req_obj['highest'],
                        initial_amount=float(req_obj['amount']), current_amount=float(req_obj['amount']),
                        initial_fill=0, liquidityProviderBool=True,
                        placed_by_user_id=req_obj['user_id'], prediction_id=req_obj['db_predictions_id'])
      db.session.add(new_wager)
      db.session.commit()
      # Loop through opposite side wager queue until all liquidity has been taken
      for wager in event_home_prediction_wagers_arr:
        fav_deduction =  (wager.current_amount  * ( int(prediction.odds)/ 100 * -1 ))
        total_amount_matched = fav_deduction + wager.current_amount
        new_wager.current_amount = new_wager.current_amount - fav_deduction
        new_wager.initial_fill = new_wager.initial_fill + fav_deduction
        wager.current_amount = 0
        new_matchedwager = MatchedWager(amount= total_amount_matched, event_line='0', matched_odds_home=str(int(prediction.odds) * -1), matched_odds_away=prediction.odds,
                                        time_status=prediction.time_status, paidOutBool=False,
                                        liquidity_provider_wager_id=wager.id,
                                        liquidity_remover_wager_id=new_wager.id)
        db.session.add(new_matchedwager)



    #### Deduct User Balance ####
    req_user.balance -= req_amount




  ##################### Highest layer db.session.commit #####################
  db.session.commit()

  return event.to_dict()

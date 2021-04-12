from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Wager, MatchedWager

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users =  User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/active_wagers/<int:id>')
@login_required
def active_wagers(id):
    wagers = Wager.query.filter_by(placed_by_user_id=id)
    return {"active_wagers": [wager.to_dict_with_prediction() for wager in wagers if wager.current_amount > 0.001] }

@user_routes.route('/<int:id>/matched_wagers')
@login_required
def matched_wagers(id):
    wagers = Wager.query.filter_by(placed_by_user_id=id)
    wagers_arr = [wager.to_dict_with_prediction() for wager in wagers]

    # matched_wager_test = MatchedWager.query.filter_by(liquidity_provider_wager_id=1)
    # wagers_arr[0]['matched_wager_test'] = matched_wager_test[0].to_dict()
    matched_wagers_arr = []
    for wager in wagers_arr:

        liquidity_provided_matched_wagers = MatchedWager.query.filter_by(liquidity_provider_wager_id=wager['id'])
        for liquidity_provided_matched_wager in liquidity_provided_matched_wagers:
            matched_wager_obj = liquidity_provided_matched_wager.to_dict()
            matched_wager_obj['is_home'] = wager['prediction']['is_home']
            matched_wager_obj['event'] = wager['prediction']['event']
            matched_wager_obj['bet365_bet_id'] = wager['prediction']['bet365_bet_id']
            matched_wager_obj['betsapi_event_id'] = wager['prediction']['betsapi_event_id']
            matched_wager_obj['is_liquidity_provider'] = True
            opponent = Wager.query.get(matched_wager_obj['liquidity_remover_wager_id']).user.to_dict()
            matched_wager_obj['opponent'] = opponent
            matched_wagers_arr.append(matched_wager_obj)

        liquidity_removed_matched_wagers = MatchedWager.query.filter_by(liquidity_remover_wager_id=wager['id'])
        for liquidity_removed_matched_wager in liquidity_removed_matched_wagers:
            matched_wager_obj = liquidity_removed_matched_wager.to_dict()
            matched_wager_obj['is_home'] = wager['prediction']['is_home']
            matched_wager_obj['event'] = wager['prediction']['event']
            matched_wager_obj['bet365_bet_id'] = wager['prediction']['bet365_bet_id']
            matched_wager_obj['betsapi_event_id'] = wager['prediction']['betsapi_event_id']
            matched_wager_obj['is_liquidity_provider'] = False
            opponent = Wager.query.get(matched_wager_obj['liquidity_provider_wager_id']).user.to_dict()
            matched_wager_obj['opponent'] = opponent
            matched_wagers_arr.append(matched_wager_obj)

    return {"matched_wagers_arr": matched_wagers_arr}

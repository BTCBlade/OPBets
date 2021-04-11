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
    for wager in wagers_arr:
        liquidity_provided_matched_wagers = MatchedWager.query.filter_by(liquidity_provider_wager=wager['id'])
        liquidity_removed_matched_wagers = MatchedWager.query.filter_by(liquidity_remover_wager=wager['id'])
        if len(liquidity_provided_matched_wagers) > 0:
            wager['liquidity_provided_matched_wagers'] = liquidity_provided_matched_wagers.to_dict()
        if len(liquidity_removed_matched_wagers) > 0:
            wager['liquidity_removed_matched_wagers'] = liquidity_removed_matched_wagers.to_dict()
    return {"matched_wagers": wagers_arr}

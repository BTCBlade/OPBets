from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Wager

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
    return {"active_wagers": [wager.to_dict() for wager in wagers if wager.current_amount > 0.001] }

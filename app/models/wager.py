from .db import db
from sqlalchemy.orm import relationship

class Wager(db.Model):
    __tablename__ = 'wagers'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    initial_event_line = db.Column(db.Text, nullable=False)
    initial_odds = db.Column(db.Text, nullable=False)
    initial_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, nullable=False)
    initial_fill = db.Column(db.Float, nullable=False)
    liquidityProviderBool = db.Column(db.Boolean, nullable=False)
    time_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    time_updated = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    placed_by_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    prediction_id = db.Column(db.Integer, db.ForeignKey('predictions.id'), nullable=False)
    user = relationship('User', back_populates='wagers')
    prediction = relationship('Prediction', back_populates='wagers')
    matched_wagers = relationship('MatchedWager', back_populates='wager')
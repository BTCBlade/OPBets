from .db import db
from sqlalchemy.orm import relationship

class Wager(db.Model):
    __tablename__ = 'wagers'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    initial_event_line = db.Column(db.Text, nullable=False)
    initial_odds = db.Column(db.Text, nullable=False)
    lower_cancel_odds = db.Column(db.Text, nullable=True)
    higher_cancel_odds = db.Column(db.Text, nullable=True)
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
    # liquidity_provider_matched_wagers = relationship('MatchedWager', backref='liquidity_provider_wager')
    # liquidity_remover_matched_wagers = relationship('MatchedWager', backref='liquidity_remover_wager')

    def to_dict(self):
        return {
            "id": self.id,
            "initial_event_line": self.initial_event_line,
            "initial_odds": self.initial_odds,
            "lower_cancel_odds": self.lower_cancel_odds,
            "higher_cancel_odds": self.higher_cancel_odds,
            "initial_amount": self.initial_amount,
            "current_amount": self.current_amount,
            "initial_fill": self.initial_fill,
            "liquidityProviderBool": self.liquidityProviderBool,
            "time_created": self.time_created,
            "time_updated": self.time_updated,
            "user": self.user.to_dict(),
        }
    def to_dict_with_prediction(self):
        return {
            "id": self.id,
            "initial_event_line": self.initial_event_line,
            "initial_odds": self.initial_odds,
            "lower_cancel_odds": self.lower_cancel_odds,
            "higher_cancel_odds": self.higher_cancel_odds,
            "initial_amount": self.initial_amount,
            "current_amount": self.current_amount,
            "initial_fill": self.initial_fill,
            "liquidityProviderBool": self.liquidityProviderBool,
            "time_created": self.time_created,
            "time_updated": self.time_updated,
            "prediction": self.prediction.to_dict_with_event(),
        }

from .db import db
from sqlalchemy.orm import relationship

class MatchedWager(db.Model):
    __tablename__ = 'matched_wagers'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    sport_id = db.Column(db.Integer, nullable=False)

    ## For moneyline bets event_line would be 0
    event_line = db.Column(db.Float, nullable=False)
    matched_odds_home = db.Column(db.Float, nullable=False)
    matched_odds_away = db.Column(db.Float, nullable=False)
    eventOverBool = db.Column(db.Boolean, default=False, nullable=False)
    paidOutBool = db.Column(db.Boolean, default=False, nullable=False)
    liquidity_provider_wager_id = db.Column(db.Integer, db.ForeignKey('wagers.id'), nullable=False)
    liquidity_remover_wager_id = db.Column(db.Integer, db.ForeignKey('wagers.id'), nullable=False)


    wager = relationship('Wager', back_populates='matched_wagers')
    time_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    time_updated = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

from .db import db
from sqlalchemy.orm import relationship

##Need a Many to Many table
##Many matched_wagers related to Many predictions

class MatchedWager(db.Model):
    __tablename__ = 'matched_wagers'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)

    ## For moneyline bets event_line would be 0
    event_line = db.Column(db.Text, nullable=False)
    matched_odds_home = db.Column(db.Text, nullable=False)
    matched_odds_away = db.Column(db.Text, nullable=False)
    time_status = db.Column(db.Text, default=False, nullable=False)
    paidOutBool = db.Column(db.Boolean, default=False, nullable=False)
    liquidity_provider_wager_id = db.Column(db.Integer, db.ForeignKey('wagers.id'), nullable=False)
    liquidity_remover_wager_id = db.Column(db.Integer, db.ForeignKey('wagers.id'), nullable=False)


    liquidity_provider_wager = relationship('Wager', foreign_keys='MatchedWager.liquidity_provider_wager_id')
    liquidity_remover_wager = relationship('Wager', foreign_keys='MatchedWager.liquidity_remover_wager_id')
    time_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    time_updated = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            "id":self.id,
            "amount":self.amount,
            "event_line":self.event_line,
            "matched_odds_home":self.matched_odds_home,
            "matched_odds_away":self.matched_odds_away,
            "time_status":self.time_status,
            "paidOutBool":self.paidOutBool,
            "liquidity_provider_wager_id":self.liquidity_provider_wager_id,
            "liquidity_remover_wager_id":self.liquidity_remover_wager_id,
            "time_created":self.time_created,
            "time_updated":self.time_updated,
        }

from .db import db
from sqlalchemy.orm import relationship


class Prediction(db.Model):

    __tablename__ = 'predictions'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    is_home = db.Column(db.Boolean, nullable=False)
    ## For moneyline bets event_line would be 0
    event_line = db.Column(db.Float, nullable=False)
    odds = db.Column(db.Integer)
    time_status = db.Column(db.Integer)
    db_event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    time_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    time_updated = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    wagers = relationship('Wager', back_populates='prediction')
    event = relationship('Event', back_populates='predictions')

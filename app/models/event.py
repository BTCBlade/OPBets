from .db import db
from sqlalchemy.orm import relationship

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    betsapi_id = db.Column(db.Text, nullable=True, unique=True)
    bet365_id = db.Column(db.Text, nullable=True, unique=True)
    sport_id = db.Column(db.Text, nullable=True)
    home = db.Column(db.Text, nullable=True)
    away = db.Column(db.Text, nullable=True)
    league = db.Column(db.Text, nullable=True)
    time = db.Column(db.Integer)
    time_status = db.Column(db.Text)
    time_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    time_updated = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    predictions = relationship('Prediction', back_populates='event')

    def to_dict(self):
        return {
            "id": self.id,
            "betsapi_id": self.betsapi_id,
            "bet365_id": self.bet365_id,
            "sport_id": self.sport_id,
            "home": self.home,
            "away": self.away,
            "league": self.league,
            "time": self.time,
            "time_status": self.time_status,
            "time_created": self.time_created,
            "time_updated": self.time_updated,
            "predictions": [prediction.to_dict() for prediction in self.predictions]
        }
    def to_dict_no_associations(self):
        return {
            "id": self.id,
            "betsapi_id": self.betsapi_id,
            "bet365_id": self.bet365_id,
            "sport_id": self.sport_id,
            "home": self.home,
            "away": self.away,
            "league": self.league,
            "time": self.time,
            "time_status": self.time_status,
            "time_created": self.time_created,
            "time_updated": self.time_updated,
        }
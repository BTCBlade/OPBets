from .db import db
from .user import User
from .event import Event
from .prediction import Prediction
from .wager import Wager
from .matchedwager import MatchedWager


## time_status
# 0	Not Started
# 1	InPlay
# 2	TO BE FIXED
# 3	Ended
# 4	Postponed
# 5	Cancelled
# 6	Walkover
# 7	Interrupted
# 8	Abandoned
# 9	Retired
# 99	Removed
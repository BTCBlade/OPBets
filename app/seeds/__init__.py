from flask.cli import AppGroup
from .users import seed_users, undo_users
# from .wagers import seed_wagers
# from .predictions import seed_predictions
from .events import seed_events_predictions
# from .matchedwagers import seed_matched_wagers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_events_predictions()

    # seed_wagers()
    # seed_matched_wagers()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here

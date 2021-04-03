from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', balance=1000 , password='password')
    tuna = User(username='tuna', email='tuna@gmail.com', balance=1000, password='password')
    btcblade = User(username='btcblade', email='btcblade@gmail.com', balance=10000, password='password')

    db.session.add(demo)
    db.session.add(tuna)
    db.session.add(btcblade)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()

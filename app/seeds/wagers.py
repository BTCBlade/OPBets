from app.models import db, Wager

def seed_wagers():
    # wager1 = Wager(initial_event_line='0', initial_odds='1.36',
    #                initial_amount=150, current_amount=150,
    #                initial_fill=0, liquidityProviderBool=True,
    #                placed_by_user_id=3, prediction_id=1)
    # wager2 = Wager(initial_event_line='0', initial_odds='1.57',
    #                initial_amount=50, current_amount=0,
    #                initial_fill=0, liquidityProviderBool=True,
    #                placed_by_user_id=3, prediction_id=3)
    # wager3 = Wager(initial_event_line='0', initial_odds='2.25',
    #                initial_amount=50, current_amount=0,
    #                initial_fill=50, liquidityProviderBool=True,
    #                placed_by_user_id=1, prediction_id=4)
    # db.session.add(wager1)
    # db.session.add(wager2)
    # db.session.add(wager3)
    # db.session.commit()

# def undo_wagers():
#     db.session.execute('TRUNCATE wagers;')
#     db.session.commit()
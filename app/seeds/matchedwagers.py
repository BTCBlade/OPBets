from app.models import db, MatchedWager

def seed_matched_wagers():
    # matchedwager1 = MatchedWager(amount=50, event_line='0',
    #                             matched_odds_home='1.57',
    #                             matched_odds_away='2.25',
    #                             time_status='3',
    #                             paidOutBool=False,
    #                             liquidity_provider_wager_id=2,
    #                             liquidity_remover_wager_id=3, )

    db.session.add(matchedwager1)
    db.session.commit()
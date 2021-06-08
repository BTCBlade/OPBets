def decimal_to_american(deci):
  if deci > 2.0:
    return round(((deci - 1) * 100))
  else:
    if deci == 1:
      return -8000
    else:
      return round((-100 / (deci - 1)))


def despread_odds_pair(odds1, odds2):
  if odds1 < 0 and odds2 < 0:
    ##redo this correctly plz
    return 105
  else:
    diff = abs(abs(odds1) - abs(odds2))
    if abs(odds1) > abs(odds2):
      return abs(odds2) + round(diff/2)
    else:
      return abs(odds1) + round(diff/2)

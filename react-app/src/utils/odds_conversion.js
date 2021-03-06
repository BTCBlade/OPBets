export function db_american_to_string(str) {
  if (parseInt(str) > 0) {
    return '+' + str;
  } else {
    return str;
  }
}

export function decimal_to_probability(decimal) {
  return ((1 / decimal) * 100).toFixed(2);
}

export function american_to_probability(integer) {
  if (integer < 0) {
    return (((integer * -1) / (integer * -1 + 100)) * 100).toFixed(2);
  } else if (integer > 0) {
    return ((100 / (integer + 100)) * 100).toFixed(2);
  } else {
    return 0;
  }
}

export function decimal_to_american(decimal) {
  if (decimal > 2.0) {
    return '+' + ((decimal - 1) * 100).toFixed(0).toString();
  } else {
    if (decimal === 0) return '0';
    return (-100 / (decimal - 1)).toFixed(0).toString();
  }
}

export function american_to_decimal(integer) {
  if (integer > 0) {
    return integer / 100 + 1;
  } else if (integer < 0) {
    return 100 / (integer * -1) + 1;
  } else {
    return '0';
  }
}

export function american_to_str(num_str) {
  if (parseInt(num_str) > 0) {
    return '+' + num_str;
  } else {
    return num_str;
  }
}

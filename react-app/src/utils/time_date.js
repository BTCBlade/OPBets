export const convert_time = (int) => {
  const eventObj = new Date(int * 1000);
  const date_1 = eventObj.toLocaleString().split(',');
  const time_parts = date_1[1].split(' ');
  const hour_min = time_parts[1].split(':');
  const date_display =
    date_1[0] + '  ' + hour_min[0] + ':' + hour_min[1] + ' ' + time_parts[2];
  return date_display;
};

import moment from 'moment';

export const normalizeDate = date =>
  moment(date)
    .hour(12)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toDate();

export const toMonthKey = date =>
  `${moment(date).year()}-${moment(date).month()}`;

// Don't iterate more than 24 months just to be safe
export const getMonthsInRange = (start, end) => {
  const months = [];
  let curMonth = moment(start).startOf('month');
  let iterations = 0;
  while (moment(end).isAfter(curMonth) && iterations < 24) {
    months.push(`${curMonth.year()}-${curMonth.month()}`);
    curMonth = moment(curMonth).add(1, 'month');
    iterations++;
  }
  return months;
};

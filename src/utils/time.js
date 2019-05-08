import moment from 'moment';

export const normalizeDate = date =>
  moment(date)
    .hour(12)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toDate();

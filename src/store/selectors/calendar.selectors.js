import { createSelector } from 'reselect';
import moment from 'moment';

import {
  getCalendarForm,
  getSelectedEvent,
  getEvents,
} from 'store/selectors/base.selectors';

export const selectedEvent = createSelector(
  [getSelectedEvent, getEvents],
  (selected, events) => events[selected],
);

export const isValidForm = createSelector(
  [getCalendarForm],
  ({ start, end, reason, duration, title }) =>
    !!start &&
    !!end &&
    moment(start).isSameOrBefore(end) &&
    !!reason &&
    !!duration &&
    !!title,
);

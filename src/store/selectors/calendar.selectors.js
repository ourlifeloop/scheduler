import { createSelector } from 'reselect';

import { getSelectedEvent, getEvents } from 'store/selectors/base.selectors';

export const selectedEvent = createSelector(
  [getSelectedEvent, getEvents],
  (selected, events) => events[selected],
);

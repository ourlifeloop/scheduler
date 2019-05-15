import { all, take, takeEvery, select, put, call } from 'redux-saga/effects';
import moment from 'moment';

import { createAction } from 'utils/store';
import { getMonthsInRange, toMonthKey } from 'utils/time';
import { mapValues, omit } from 'constants/lodash';
import {
  getUser,
  getEvents,
  getCalendarForm,
  getCalendarMonths,
} from 'store/selectors/base.selectors';
import { getEventForMonth, createEvent } from 'store/api/calendar.api';
import { AUTHENTICATE } from 'store/actions/user.actions';
import {
  OPEN_EVENT_MODAL,
  START_FORM,
  UPDATE_FORM,
  RESET_FORM,
  CANCEL_CREATE,
  CREATE_EVENT,
  FETCH_EVENTS,
  SELECT_EVENT,
  TOGGLE_VIEWER,
} from 'store/actions/calendar.actions';

function* fetchEvents({ date }) {
  try {
    const months = yield select(getCalendarMonths);
    const month = toMonthKey(moment(date).startOf('month'));
    if (months.indexOf(month) >= 0) {
      return yield put(createAction(FETCH_EVENTS.SUCCESS, { events: {} }));
    }
    const events = yield call(getEventForMonth, month);
    yield put(
      createAction(FETCH_EVENTS.SUCCESS, {
        month,
        events: mapValues(events, (event, id) => ({
          ...event,
          id,
          created: event.created.toDate(),
          start: event.start.toDate(),
          end: event.end.toDate(),
        })),
      }),
    );
  } catch (error) {
    console.error(error);
    yield put(createAction(FETCH_EVENTS.ERROR, { error }));
  }
}

function* initialize() {
  yield put(createAction(FETCH_EVENTS.PENDING, { date: moment() }));
}

function* eventSelection({ key }) {
  const events = yield select(getEvents);
  const selectedEvent = events[key];
  if (!selectedEvent) {
    console.log('Selected event does not exist... WHAT!?', key);
    return;
  }

  const { uid } = yield select(getUser);
  if (selectedEvent.creator === uid) {
    yield put(createAction(START_FORM, selectedEvent));
  } else {
    yield put(createAction(TOGGLE_VIEWER));
  }
}

function* startForm(evt) {
  const { uid, displayName } = yield select(getUser);
  yield put(
    createAction(UPDATE_FORM, {
      form: { ...omit(evt, 'type'), title: displayName },
    }),
  );
  yield put(createAction(OPEN_EVENT_MODAL));

  const { type } = yield take([CANCEL_CREATE, CREATE_EVENT.PENDING]);
  if (type === CREATE_EVENT.PENDING) {
    try {
      let event = yield select(getCalendarForm);
      event = {
        ...event,
        creator: uid,
        months: getMonthsInRange(event.start, event.end),
      };

      const eventObj = yield call(createEvent, event);
      yield put(createAction(CREATE_EVENT.SUCCESS, { event: eventObj }));
    } catch (error) {
      console.error(error);
      yield put(createAction(CREATE_EVENT.ERROR, { error }));
    }
  }

  yield put(createAction(RESET_FORM));
}

export default function*() {
  yield all([
    takeEvery(AUTHENTICATE.SUCCESS, initialize),
    takeEvery(FETCH_EVENTS.PENDING, fetchEvents),
    takeEvery(SELECT_EVENT, eventSelection),
    takeEvery(START_FORM, startForm),
  ]);
}

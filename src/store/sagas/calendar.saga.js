import { all, take, takeEvery, select, put, call } from 'redux-saga/effects';
import moment from 'moment';

import { createAction } from 'utils/store';
import { getMonthsInRange } from 'utils/time';
import { mapValues } from 'constants/lodash';
import { getUser, getCalendarForm } from 'store/selectors/base.selectors';
import { getEventForMonth, createEvent } from 'store/api/calendar.api';
import { AUTHENTICATE } from 'store/actions/user.actions';
import {
  OPEN_CREATION_MODAL,
  START_FORM,
  UPDATE_FORM,
  RESET_FORM,
  CANCEL_CREATE,
  CREATE_EVENT,
  FETCH_EVENTS,
} from 'store/actions/calendar.actions';

function* fetchEvents() {
  try {
    yield put(createAction(FETCH_EVENTS.PENDING));
    const events = yield call(
      getEventForMonth,
      moment().year(),
      moment().month(),
    );
    yield put(
      createAction(FETCH_EVENTS.SUCCESS, {
        events: mapValues(events, event => ({
          ...event,
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

function* startForm({ start, end }) {
  const { uid, displayName } = yield select(getUser);
  yield put(
    createAction(UPDATE_FORM, { form: { title: displayName, start, end } }),
  );
  yield put(createAction(OPEN_CREATION_MODAL));

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
    takeEvery(AUTHENTICATE.SUCCESS, fetchEvents),
    takeEvery(START_FORM, startForm),
  ]);
}

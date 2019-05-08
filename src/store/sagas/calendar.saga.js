import { all, take, takeEvery, select, put, call } from 'redux-saga/effects';

import { createAction } from 'utils/store';
import { getUser, getCalendarForm } from 'store/selectors/base.selectors';
import { createEvent } from 'store/api/calendar.api';
import {
  OPEN_CREATION_MODAL,
  START_FORM,
  UPDATE_FORM,
  RESET_FORM,
  CANCEL_CREATE,
  CREATE_EVENT,
} from 'store/actions/calendar.actions';

function* startForm({ start, end }) {
  const { uid, displayName } = yield select(getUser);
  yield put(
    createAction(UPDATE_FORM, { form: { title: displayName, start, end } }),
  );
  yield put(createAction(OPEN_CREATION_MODAL));

  const { type } = yield take([CANCEL_CREATE, CREATE_EVENT.PENDING]);
  if (type === CREATE_EVENT.PENDING) {
    const event = yield select(getCalendarForm);
    try {
      const eventObj = yield call(createEvent, event, uid);

      yield put(createAction(CREATE_EVENT.SUCCESS, { event: eventObj }));
    } catch (error) {
      console.log(error);
      yield put(createAction(CREATE_EVENT.ERROR, { error }));
    }
  }

  yield put(createAction(RESET_FORM));
}

export default function*() {
  yield all([takeEvery(START_FORM, startForm)]);
}

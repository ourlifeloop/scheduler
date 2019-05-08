import { all, take, takeEvery, select, put } from 'redux-saga/effects';

import { createAction } from 'utils/store';
import { getUser } from 'store/selectors/base.selectors';
import {
  OPEN_CREATION_MODAL,
  START_FORM,
  UPDATE_FORM,
  RESET_FORM,
  CANCEL_CREATE,
  CREATE_EVENT,
} from 'store/actions/calendar.actions';

function* startForm({ start, end }) {
  const { displayName } = yield select(getUser);
  yield put(
    createAction(UPDATE_FORM, { form: { title: displayName, start, end } }),
  );
  yield put(createAction(OPEN_CREATION_MODAL));

  const { type } = yield take([CANCEL_CREATE, CREATE_EVENT.PENDING]);
  if (type === CREATE_EVENT.PENDING) {
    // Create api
  }

  yield put(createAction(RESET_FORM));
}

export default function*() {
  yield all([takeEvery(START_FORM, startForm)]);
}

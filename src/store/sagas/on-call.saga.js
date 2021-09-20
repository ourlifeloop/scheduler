import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createAction } from 'utils/store';

import { FETCH_ON_CALL_STATE } from 'store/actions/on-call.actions';
import { AUTHENTICATE } from 'store/actions/user.actions';
import { getOnCallState } from 'store/api/on-call.api';

function* initialize() {
  yield put(createAction(FETCH_ON_CALL_STATE.PENDING));
}

function* fetchState() {
  try {
    const state = yield call(getOnCallState);
    yield put(createAction(FETCH_ON_CALL_STATE.SUCCESS, { state }));
  } catch (error) {
    console.error(error);
    yield put(createAction(FETCH_ON_CALL_STATE.ERROR, { error }));
  }
}

export default function* CalndarSaga() {
  yield all([
    takeEvery(AUTHENTICATE.SUCCESS, initialize),
    takeEvery(FETCH_ON_CALL_STATE.PENDING, fetchState),
  ]);
}

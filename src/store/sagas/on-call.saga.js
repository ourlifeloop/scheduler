import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { createAction } from 'utils/store';

import {
  FETCH_ON_CALL_STATE,
  CREATE_MEMBER,
  DELETE_MEMBER,
} from 'store/actions/on-call.actions';
import { AUTHENTICATE } from 'store/actions/user.actions';
import {
  fetchOnCallState,
  createMember as createMemberAPI,
  deleteMember as deleteMemberAPI,
} from 'store/api/on-call.api';
import { getOnCallState } from 'store/selectors/base.selectors';

function* initialize() {
  yield put(createAction(FETCH_ON_CALL_STATE.PENDING));
}

function* fetchState() {
  try {
    const state = yield call(fetchOnCallState);
    yield put(createAction(FETCH_ON_CALL_STATE.SUCCESS, { state }));
  } catch (error) {
    console.error(error);
    yield put(createAction(FETCH_ON_CALL_STATE.ERROR, { error }));
  }
}

function* createMember({ member, group }) {
  const state = yield select(getOnCallState);
  try {
    const newState = yield call(createMemberAPI, state, group, member);
    yield put(createAction(CREATE_MEMBER.SUCCESS, { state: newState }));
  } catch (error) {
    console.error(error);
    yield put(createAction(CREATE_MEMBER.ERROR, { error }));
  }
}

function* deleteMember({ member, group }) {
  const state = yield select(getOnCallState);
  try {
    const newState = yield call(deleteMemberAPI, state, group, member);
    yield put(createAction(DELETE_MEMBER.SUCCESS, { state: newState }));
  } catch (error) {
    console.error(error);
    yield put(createAction(DELETE_MEMBER.ERROR, { error }));
  }
}

export default function* CalndarSaga() {
  yield all([
    takeEvery(AUTHENTICATE.SUCCESS, initialize),
    takeEvery(FETCH_ON_CALL_STATE.PENDING, fetchState),
    takeEvery(CREATE_MEMBER.PENDING, createMember),
    takeEvery(DELETE_MEMBER.PENDING, deleteMember),
  ]);
}

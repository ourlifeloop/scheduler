import { all, call, put, take, fork, select } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import Firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';

import { createAction } from 'utils/store';
import { getPathname } from 'store/selectors/base.selectors.js';
import { INITIALIZED, LOGGED_IN, SIGNED_OUT } from 'store/actions/user.actions';
import { getCurrentUser, signout, login, signup } from 'store/api/user.api';

Firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
});

function* onLogin(user) {
  yield put(createAction(LOGGED_IN.SUCCESS, { user }));
  const pathname = yield select(getPathname);
  if (pathname === '/') {
    yield put(push('/dashboard'));
  }
}

function* loginFlow() {
  try {
    const { key, form } = yield take(LOGGED_IN.PENDING);
    let loginUser;
    if (key === 'signup') {
      loginUser = yield call(signup, form);
    } else {
      loginUser = yield call(login, form);
    }
    loginUser = loginUser.user ? loginUser.user.toJSON() : loginUser.toJSON();
    yield call(onLogin, loginUser);
  } catch (error) {
    yield put(createAction(LOGGED_IN.ERROR, { error: error.message }));
  }
}

function* signoutFlow() {
  try {
    const action = yield take([LOGGED_IN.ERROR, SIGNED_OUT.PENDING]);
    if (action.type === LOGGED_IN.ERROR) {
      return;
    }
    yield call(signout);
    yield put(createAction(SIGNED_OUT.SUCCESS));
  } catch (error) {
    yield put(createAction(SIGNED_OUT.ERROR, { error: error.message }));
  }
}

function* sessionFlow() {
  const currentUser = yield call(getCurrentUser);
  if (currentUser) {
    yield fork(onLogin, currentUser);
    yield call(signoutFlow);
  } else {
    yield put(createAction(INITIALIZED));
  }
  while (true) {
    yield fork(loginFlow);
    yield call(signoutFlow);
  }
}

export default function*() {
  yield all([call(sessionFlow)]);
}

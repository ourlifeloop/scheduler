import { all, call, put, take, fork, select } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import Firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';

import { createAction } from 'utils/store';
import { getPathname, getLoginForm } from 'store/selectors/base.selectors';
import {
  INITIALIZED,
  AUTHENTICATE,
  SIGNED_OUT,
} from 'store/actions/user.actions';
import {
  getCurrentUser,
  signout,
  login,
  signup,
  passwordReset,
} from 'store/api/user.api';

Firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
});

function* onLogin(user) {
  yield put(createAction(AUTHENTICATE.SUCCESS, { user }));
  yield put(push('/calendar'));
}

function* loginFlow() {
  try {
    yield take(AUTHENTICATE.PENDING);
    const pathname = yield select(getPathname);
    const form = yield select(getLoginForm);
    let loginUser;
    if (pathname === '/signup') {
      loginUser = yield call(signup, form);
    } else if (pathname === '/forgot') {
      loginUser = yield call(passwordReset, form);
    } else {
      console.log('LOGIN');
      loginUser = yield call(login, form);
    }
    if (loginUser) {
      loginUser = loginUser.user ? loginUser.user.toJSON() : loginUser.toJSON();
      yield call(onLogin, loginUser);
    } else {
      yield put(push('/'));
    }
  } catch (error) {
    yield put(createAction(AUTHENTICATE.ERROR, { error: error.message }));
  }
}

function* signoutFlow() {
  try {
    const action = yield take([AUTHENTICATE.ERROR, SIGNED_OUT.PENDING]);
    if (action.type === AUTHENTICATE.ERROR) {
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import Login from 'components/login';
import Forgot from 'components/forgot';
import Signup from 'components/signup';
import Calendar from 'components/calendar';

import createStore from 'store';

import 'styles/global.scss';

const { store, history } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Login path="/" />
      <Forgot path="/forgot" />
      <Signup path="/signup" />
      <Calendar path="/calendar" />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

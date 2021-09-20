import React from 'react';
import ReactDOM from 'react-dom';
import { LocationProvider, Router } from '@reach/router';
import { Provider } from 'react-redux';

import ProtectedRoutes from 'components/protected-routes';
import Login from 'components/login';
import Forgot from 'components/forgot';
import Signup from 'components/signup';

import createStore from 'store';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/global.scss';

const { store, history } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <LocationProvider history={history}>
      <Router>
        <Login path="/" />
        <Forgot path="/forgot" />
        <Signup path="/signup" />
        <ProtectedRoutes path="*" />
      </Router>
    </LocationProvider>
  </Provider>,
  document.getElementById('root'),
);

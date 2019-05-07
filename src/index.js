import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import Login from 'components/login';
import Forgot from 'components/forgot';
import Signup from 'components/signup';
import Calendar from 'components/calendar';

import 'styles/global.scss';

ReactDOM.render(
  <Router>
    <Login path="/" />
    <Forgot path="/forgot" />
    <Signup path="/signup" />
    <Calendar path="/calendar" />
  </Router>,
  document.getElementById('root'),
);

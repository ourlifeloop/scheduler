import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import AuthenticationWrapper from 'components/authentication-wrapper';

export default function Login({ updateLoginForm, loginForm }) {
  return (
    <AuthenticationWrapper
      title="Login"
      links={[
        <Link key="forgot" to="/forgot">
          Forgot Password?
        </Link>,
        <Link key="signup" to="/signup">
          Sign Up
        </Link>,
      ]}
    >
      <label htmlFor="email">Email</label>
      <input
        onChange={e => updateLoginForm({ email: e.target.value })}
        value={loginForm.email}
        className="u-full-width"
        type="email"
        placeholder="test@mailbox.com"
        id="email"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={e => updateLoginForm({ password: e.target.value })}
        value={loginForm.password}
        className="u-full-width"
        type="password"
        id="password"
      />
    </AuthenticationWrapper>
  );
}

Login.propTypes = {
  updateLoginForm: PropTypes.func.isRequired,
  loginForm: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
};

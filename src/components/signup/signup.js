import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import AuthenticationWrapper from 'components/authentication-wrapper';

export default function Signup({ updateLoginForm, loginForm }) {
  return (
    <AuthenticationWrapper
      title="Sign Up"
      links={[
        <Link key="forgot" to="/forgot">
          Forgot Password?
        </Link>,
        <Link key="login" to="/">
          Login
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
      <label htmlFor="name">Full Name</label>
      <input
        onChange={e => updateLoginForm({ displayName: e.target.value })}
        value={loginForm.displayName}
        className="u-full-width"
        type="text"
        placeholder="First Last"
        id="name"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={e => updateLoginForm({ password: e.target.value })}
        value={loginForm.password}
        className="u-full-width"
        type="password"
        id="password"
      />
      <label htmlFor="confirm">Confirm Password</label>
      <input
        onChange={e => updateLoginForm({ confirm: e.target.value })}
        value={loginForm.confirm}
        className="u-full-width"
        type="password"
        id="confirm"
      />
    </AuthenticationWrapper>
  );
}

Signup.propTypes = {
  updateLoginForm: PropTypes.func.isRequired,
  loginForm: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
  }),
};

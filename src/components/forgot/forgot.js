import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import AuthenticationWrapper from 'components/authentication-wrapper';

export default function Forgot({ updateLoginForm, loginForm, authenticate }) {
  return (
    <AuthenticationWrapper
      title="Forgot Password"
      links={[
        <Link key="login" to="/">
          Login
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
    </AuthenticationWrapper>
  );
}

Forgot.propTypes = {
  updateLoginForm: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  loginForm: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

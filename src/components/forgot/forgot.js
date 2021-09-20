import React from 'react';
import PropTypes from 'prop-types';

import AuthenticationWrapper from 'components/authentication-wrapper';
import Link from 'primitives/link';

export default function Forgot({ updateLoginForm, loginForm }) {
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
  loginForm: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

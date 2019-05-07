import React from 'react';
import classNames from 'classnames';
import { Link } from '@reach/router';

import FlexContainer from 'primitives/flex-container';
import FormContainer from 'primitives/form-container';

import styles from './styles.module.scss';

export default function Signup() {
  return (
    <FormContainer title="Sign Up">
      <label htmlFor="email">Email</label>
      <input
        className="u-full-width"
        type="email"
        placeholder="test@mailbox.com"
        id="email"
      />
      <label htmlFor="password">Password</label>
      <input className="u-full-width" type="password" id="password" />
      <label htmlFor="confirm">Confirm Password</label>
      <input className="u-full-width" type="password" id="confirm" />
      <FlexContainer justify="spaceBetween" align="center">
        <input
          className={classNames('button-primary', styles.submit)}
          type="submit"
          value="Submit"
        />
        <FlexContainer>
          <Link className={styles.link} to="/forgot">
            Forgot Password?
          </Link>
          <Link className={styles.link} to="/">
            Login
          </Link>
        </FlexContainer>
      </FlexContainer>
    </FormContainer>
  );
}

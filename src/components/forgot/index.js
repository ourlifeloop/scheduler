import React from 'react';
import classNames from 'classnames';
import { Link } from '@reach/router';

import FlexContainer from 'primitives/flex-container';
import FormContainer from 'primitives/form-container';

import styles from './styles.module.scss';

export default function Forgot() {
  return (
    <FormContainer title="Forgot Password">
      <label htmlFor="email">Email</label>
      <input
        className="u-full-width"
        type="email"
        placeholder="test@mailbox.com"
        id="email"
      />
      <FlexContainer justify="spaceBetween" align="center">
        <input
          className={classNames('button-primary', styles.submit)}
          type="submit"
          value="Submit"
        />
        <FlexContainer>
          <Link className={styles.link} to="/">
            Login
          </Link>
          <Link className={styles.link} to="/signup">
            Sign Up
          </Link>
        </FlexContainer>
      </FlexContainer>
    </FormContainer>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';

import styles from './styles.module.scss';

export default function Navigation({ signout }) {
  return (
    <div className={styles.header}>
      <div className="container">
        <FlexContainer justify="spaceBetween" align="center">
          <img
            className={styles.logo}
            src="/images/logo.png"
            alt="Lifeloop Logo"
          />
          <FlexContainer align="center">
            <Button className={styles.minorLink} link onClick={() => signout()}>
              Sign Out
            </Button>
          </FlexContainer>
        </FlexContainer>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  signout: PropTypes.func.isRequired,
};

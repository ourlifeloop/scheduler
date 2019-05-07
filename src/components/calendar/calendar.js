import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';

import styles from './styles.module.scss';

export default function Calendar({ signout }) {
  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <FlexContainer justify="spaceBetween" align="center">
            <Link className={styles.titleLink} to="/calendar">
              <h4>Discord Scheduler</h4>
            </Link>
            <FlexContainer align="center">
              <Link className={styles.minorLink} to="/settings">
                Settings
              </Link>
              <Button
                className={styles.minorLink}
                link
                onClick={() => signout()}
              >
                Sign Out
              </Button>
            </FlexContainer>
          </FlexContainer>
        </div>
      </div>
    </>
  );
}

Calendar.propTypes = {
  signout: PropTypes.func.isRequired,
};

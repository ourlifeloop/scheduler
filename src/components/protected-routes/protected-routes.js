import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';

import OnCallScheduler from 'components/on-call-scheduler';
import FlexContainer from 'primitives/flex-container';
import Navigation from 'components/navigation';
import { usePrevious } from 'utils/effects';
import Calendar from 'components/calendar';
import Spinner from 'primitives/spinner';

import styles from './styles.module.scss';

export default function ProtectedRoutes({ isLoggedIn, isInitialized, toHome }) {
  const prevIsLoggedIn = usePrevious(isLoggedIn);
  const prevIsInitialized = usePrevious(isInitialized);

  useEffect(() => {
    const didSignOut = prevIsLoggedIn && !isLoggedIn;
    const initializedWithoutAuth =
      !prevIsInitialized && isInitialized && !isLoggedIn;
    if (didSignOut || initializedWithoutAuth) {
      toHome();
    }
  });

  if (!isInitialized) {
    return (
      <div className="container">
        <FlexContainer justify="center" className={styles.loader}>
          <Spinner size={60} />
        </FlexContainer>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <Router>
        <Calendar path="/calendar" />
        <OnCallScheduler path="/on-call" />
      </Router>
    </>
  );
}

ProtectedRoutes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  toHome: PropTypes.func.isRequired,
};

import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';

import OnCallScheduler from 'components/on-call-scheduler';
import Navigation from 'components/navigation';
import { usePrevious } from 'utils/effects';
import Calendar from 'components/calendar';

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
    return null;
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

import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';
import Link from 'primitives/link';

import styles from './styles.module.scss';
import classNames from 'classnames';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => ({
      className: classNames(styles.headerLink, {
        [styles['headerLink--active']]: isCurrent,
      }),
    })}
  />
);

export default function Navigation({ signout }) {
  return (
    <div className={styles.header}>
      <div className="container">
        <FlexContainer justify="spaceBetween" align="center">
          <FlexContainer align="center">
            <img
              className={styles.logo}
              src="/images/logo.png"
              alt="Lifeloop Logo"
            />
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/on-call">On Call</NavLink>
          </FlexContainer>
          <FlexContainer align="center">
            <Button className={styles.headerLink} link onClick={signout}>
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

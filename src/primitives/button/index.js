import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'redux-first-history';
import classNames from 'classnames';

import Spinner from 'primitives/spinner';

import styles from './styles.module.scss';

export default function Button({
  children,
  className,
  minimal,
  primary,
  isLoading,
  to,
  ...rest
}) {
  const linkClass = classNames(className, styles.container, {
    'button-primary': primary,
  });

  let loadingSpinner = null;
  if (isLoading) {
    loadingSpinner = (
      <Spinner light={primary} size={20} className={styles.spinner} />
    );
  }

  const innerContent = (
    <>
      {loadingSpinner}
      <span
        className={classNames(styles.inner, { [styles.loading]: isLoading })}
      >
        {children}
      </span>
    </>
  );

  if (to) {
    return (
      <RouterLink {...rest} to={to} className={linkClass}>
        {innerContent}
      </RouterLink>
    );
  }
  return (
    <button {...rest} type="button" className={linkClass}>
      {innerContent}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  primary: PropTypes.bool,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  to: null,
  className: null,
  primary: false,
  isLoading: false,
};

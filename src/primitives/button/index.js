import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Spinner from 'primitives/spinner';

import styles from './styles.module.scss';

export default function Button({
  children,
  className,
  link,
  primary,
  isLoading,
  ...rest
}) {
  const linkClass = classNames(className, styles.container, {
    [styles['link--primary']]: primary,
    'button-primary': primary,
    [styles.link]: link,
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

  return (
    <button {...rest} type="button" className={linkClass}>
      {innerContent}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  primary: PropTypes.bool,
  isLoading: PropTypes.bool,
  link: PropTypes.bool,
};

Button.defaultProps = {
  className: null,
  primary: false,
  isLoading: false,
  link: false,
};

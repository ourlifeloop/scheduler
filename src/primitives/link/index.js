import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as RouterLink } from '@reach/router';

import styles from './styles.module.scss';

export default function Link({ isDark, className, ...props }) {
  return (
    <RouterLink {...props} className={classNames(className, styles.link)} />
  );
}

Link.propTypes = {
  isDark: PropTypes.bool,
  className: PropTypes.string,
};

Link.defaultProps = {
  isDark: false,
  className: '',
};

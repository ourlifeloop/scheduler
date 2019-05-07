import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/flex-container';

import styles from './styles.module.scss';

export default function FormContainer({ title, children }) {
  return (
    <div className="container">
      <div className={classNames('row', styles.container)}>
        <div className="three columns">&nbsp;</div>
        <div className="six columns">
          <FlexContainer direction="column">
            <h2>{title}</h2>
            <form>{children}</form>
          </FlexContainer>
        </div>
        <div className="three columns">&nbsp;</div>
      </div>
    </div>
  );
}

FormContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

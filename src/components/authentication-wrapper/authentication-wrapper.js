import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';

import styles from './styles.module.scss';

export default function AuthenticationWrapper({
  children,
  title,
  authenticate,
  isLoggingIn,
  error,
  links,
}) {
  return (
    <div className="container">
      <div className={classNames('row', styles.container)}>
        <div className="three columns">&nbsp;</div>
        <div className="six columns">
          <FlexContainer direction="column">
            <h2>{title}</h2>
            <form>
              {children}
              <FlexContainer justify="spaceBetween" align="center">
                <Button
                  primary
                  isLoading={isLoggingIn}
                  onClick={() => authenticate()}
                  className={styles.submit}
                >
                  Submit
                </Button>
                <FlexContainer>
                  {React.Children.map(links, link =>
                    React.cloneElement(link, {
                      className: classNames(link.props.className, styles.link),
                    }),
                  )}
                </FlexContainer>
              </FlexContainer>
              {!!error && <div className={styles.error}>{error}</div>}
            </form>
          </FlexContainer>
        </div>
        <div className="three columns">&nbsp;</div>
      </div>
    </div>
  );
}

AuthenticationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  authenticate: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(PropTypes.node),
  error: PropTypes.string,
};

AuthenticationWrapper.defaultProps = {
  links: [],
  error: undefined,
};

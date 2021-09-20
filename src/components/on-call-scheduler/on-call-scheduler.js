import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/flex-container';
import { ON_CALL_GROUP } from 'store/api/on-call.api';
import OnCallGroup from 'components/on-call-group';
import Spinner from 'primitives/spinner';

import styles from './styles.module.scss';

export default function OnCallScheduler({ isFetching }) {
  if (isFetching) {
    return (
      <div className="container">
        <FlexContainer justify="center" className={styles.loader}>
          <Spinner size={60} />
        </FlexContainer>
      </div>
    );
  }
  return (
    <div className="container">
      <div className={classNames('row', styles.container)}>
        <OnCallGroup title="Developer" group={ON_CALL_GROUP.DEVELOPER} />
        <OnCallGroup title="QA" group={ON_CALL_GROUP.QA} />
        <OnCallGroup title="Support" group={ON_CALL_GROUP.SUPPORT} />
      </div>
    </div>
  );
}

OnCallScheduler.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/flex-container';
import { ChevronRight, X } from 'constants/icons';
import Button from 'primitives/button';
import Modal from 'primitives/modal';

import styles from './styles.module.scss';

export default function OnCallGroup({
  title,
  group,
  onCallState,
  createMember,
  deleteMember,
}) {
  const [memberForm, setMemberForm] = useState();
  const members = onCallState[group];
  const current = onCallState.current[group] || members[0];

  return (
    <>
      <div className="one-third column">
        <FlexContainer justify="center">
          <h2>{title}</h2>
        </FlexContainer>
        <div>
          {members.map(member => {
            const isCurrent = member === current;
            return (
              <FlexContainer
                key={member}
                align="center"
                className={styles.memberRow}
              >
                {isCurrent ? (
                  <ChevronRight size={20} />
                ) : (
                  <div className={styles.iconSpacer} />
                )}
                <FlexContainer
                  flex="1"
                  direction="column"
                  className={styles.member}
                >
                  <div className={styles.memberName}>{member}</div>
                  <div className={styles.nextDate}>
                    {isCurrent ? 'Current' : null}
                  </div>
                </FlexContainer>
                <X
                  size={20}
                  className={styles.deleteBtn}
                  onClick={() => deleteMember(group, member)}
                />
              </FlexContainer>
            );
          })}
        </div>
        <FlexContainer justify="center" className={styles.btnContainer}>
          <Button onClick={() => setMemberForm('')}>Add Member</Button>
        </FlexContainer>
      </div>
      <Modal
        title={`Create ${title}`}
        isOpen={memberForm !== undefined}
        onCancel={() => setMemberForm()}
        actionButtons={[
          <Button
            primary
            key="create"
            disabled={!memberForm}
            onClick={() => {
              createMember(group, memberForm);
              setMemberForm();
            }}
          >
            Create
          </Button>,
        ]}
      >
        <form className={styles.form}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            onChange={e => setMemberForm(e.target.value)}
            value={memberForm}
            className="u-full-width"
            id="name"
          />
        </form>
      </Modal>
    </>
  );
}

OnCallGroup.propTypes = {
  title: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  onCallState: PropTypes.shape({
    current: PropTypes.shape().isRequired,
  }).isRequired,
  createMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';
import Modal from 'primitives/modal';

import styles from './styles.module.scss';

export default function OnCallGroup({
  title,
  group,
  onCallState,
  createMember,
}) {
  const [memberForm, setMemberForm] = useState();
  const members = onCallState[group];
  const current = onCallState.current[group];

  console.log(members, current);

  return (
    <>
      <div className="one-third column">
        <FlexContainer justify="center">
          <h2>{title}</h2>
        </FlexContainer>
        <FlexContainer justify="center">
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
};

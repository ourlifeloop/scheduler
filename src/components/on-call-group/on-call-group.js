import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import FlexContainer from 'primitives/flex-container';
import { ChevronRight, X } from 'constants/icons';
import Button from 'primitives/button';
import Modal from 'primitives/modal';

import styles from './styles.module.scss';

const SUNDAY = 0;
const SATURDAY = 6;
const addBusinessDays = numDaysToAdd => {
  let daysRemaining = numDaysToAdd;
  const newDate = moment();

  while (daysRemaining > 0) {
    newDate.add(1, 'days');
    if (newDate.day() !== SUNDAY && newDate.day() !== SATURDAY) {
      daysRemaining--;
    }
  }

  return newDate;
};

const getNextDate = (numMembers, onCallIndex, currentIndex) => {
  let offset = currentIndex - onCallIndex;
  if (offset <= 0) {
    offset = numMembers + offset;
  }
  return addBusinessDays(offset).format('M/D/YYYY');
};

export default function OnCallGroup({
  title,
  group,
  onCallState,
  createMember,
  deleteMember,
}) {
  const [memberForm, setMemberForm] = useState();

  const memberData = useMemo(() => {
    const members = onCallState[group];
    const current = onCallState.current[group] || members[0];
    const onCallIndex = members.indexOf(current);
    return members.map((member, i) => {
      const isCurrent = member === current;
      return {
        key: `${member}-${i}`,
        name: member,
        isCurrent,
        metaText: isCurrent
          ? 'Current'
          : `Next: ${getNextDate(members.length, onCallIndex, i)}`,
      };
    });
  }, [onCallState, group]);

  return (
    <>
      <div className="one-third column">
        <FlexContainer justify="center">
          <h2>{title}</h2>
        </FlexContainer>
        <div>
          {!memberData.length && (
            <FlexContainer justify="center">
              <div className={styles.nextDate}>No Members</div>
            </FlexContainer>
          )}
          {memberData.map(({ key, name, isCurrent, metaText }) => (
            <FlexContainer
              key={key}
              align="center"
              className={styles.memberRow}
            >
              {isCurrent ? (
                <ChevronRight className={styles.currentIcon} size={20} />
              ) : (
                <div className={styles.iconSpacer} />
              )}
              <FlexContainer
                flex="1"
                direction="column"
                className={styles.member}
              >
                <div className={styles.memberName}>{name}</div>
                <div className={styles.nextDate}>{metaText}</div>
              </FlexContainer>
              <X
                size={20}
                className={styles.deleteBtn}
                onClick={() => deleteMember(group, name)}
              />
            </FlexContainer>
          ))}
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

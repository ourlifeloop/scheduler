import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';

import REASONS from 'constants/reasons';
import DURATIONS from 'constants/durations';
import { find, map } from 'constants/lodash';
import Button from 'primitives/button';
import Modal from 'primitives/modal';

import styles from './styles.module.scss';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const REASON_OPTIONS = map(REASONS, ({ key, title, color }) => ({
  value: key,
  label: title,
  color,
}));

const DURATION_OPTIONS = map(DURATIONS, ({ key, title }) => ({
  value: key,
  label: title,
}));

export default function EventFormModal({
  updateForm,
  cancelForm,
  modifyEvent,
  deleteEvent,
  isEventFormModalOpen,
  form,
  isValidForm,
}) {
  const action = form.id ? 'Edit' : 'Create';
  let actionButtons = [
    <Button disabled={!isValidForm} key="modify" primary onClick={modifyEvent}>
      {action}
    </Button>,
  ];
  if (form.id) {
    actionButtons = [
      <Button key="delete" onClick={() => deleteEvent(form.id)}>
        Delete
      </Button>,
      ...actionButtons,
    ];
  }
  return (
    <Modal
      title={`${action} Event`}
      onCancel={cancelForm}
      isOpen={isEventFormModalOpen}
      actionButtons={actionButtons}
    >
      <div className="row">
        <div className="one-half column">
          <label htmlFor="reason">Reason *</label>
          <Select
            className={styles.select}
            classNamePrefix="react-select"
            value={find(REASON_OPTIONS, { value: form.reason })}
            onChange={({ value }) => updateForm({ reason: value })}
            options={REASON_OPTIONS}
            styles={{
              option: (styles, { data }) => ({
                ...styles,
                ...dot(data.color),
              }),
              singleValue: (styles, { data }) => ({
                ...styles,
                ...dot(data.color),
              }),
            }}
          />
        </div>
        <div className="one-half column">
          <label htmlFor="duration">Duration *</label>
          <Select
            className={styles.select}
            classNamePrefix="react-select"
            value={find(DURATION_OPTIONS, { value: form.duration })}
            onChange={({ value }) => updateForm({ duration: value })}
            options={DURATION_OPTIONS}
          />
        </div>
      </div>
      <div className="row">
        <div className="one-half column">
          <label htmlFor="start">Start Date *</label>
          <DatePicker
            className="u-full-width"
            onChange={start => updateForm({ start })}
            selected={form.start}
            id="start"
          />
        </div>
        <div className="one-half column">
          <label htmlFor="end">End Date *</label>
          <DatePicker
            className="u-full-width"
            onChange={end => updateForm({ end })}
            selected={form.end}
            id="end"
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="title">Name *</label>
        <input
          type="text"
          className="u-full-width"
          onChange={e => updateForm({ title: e.target.value })}
          value={form.title}
          id="title"
        />
      </div>
      <div className="row">
        <label htmlFor="description">Description</label>
        <textarea
          className={classNames('u-full-width', styles.textarea)}
          onChange={e => updateForm({ description: e.target.value })}
          value={form.description}
          columns="10"
          id="description"
        />
      </div>
    </Modal>
  );
}

EventFormModal.propTypes = {
  updateForm: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
  modifyEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  isEventFormModalOpen: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  isValidForm: PropTypes.bool.isRequired,
};

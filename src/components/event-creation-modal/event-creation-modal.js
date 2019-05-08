import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';

import Button from 'primitives/button';
import Modal from 'primitives/modal';

import styles from './styles.module.scss';

export default function EventCreationModal({
  updateForm,
  cancelCreate,
  createEvent,
  isCreationModalOpen,
  form,
}) {
  return (
    <Modal
      title="Create Event"
      onCancel={cancelCreate}
      isOpen={isCreationModalOpen}
      actionButtons={[
        <Button key="create" primary onClick={createEvent}>
          Create
        </Button>,
      ]}
    >
      <div className="row">
        <div className="one-half column">
          <label htmlFor="start">Start Date</label>
          <DatePicker
            className="u-full-width"
            onChange={start => updateForm({ start })}
            selected={form.start}
            id="start"
          />
        </div>
        <div className="one-half column">
          <label htmlFor="end">End Date</label>
          <DatePicker
            onChange={end => updateForm({ end })}
            selected={form.end}
            id="end"
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="title">Name</label>
        <input
          type="text"
          className="u-full-width"
          disabled
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

EventCreationModal.propTypes = {
  updateForm: PropTypes.func.isRequired,
  cancelCreate: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  isCreationModalOpen: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@reach/router';
import BigCalendar from 'react-big-calendar';
import DatePicker from 'react-datepicker';

import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';
import Modal from 'primitives/modal';

import styles from './styles.module.scss';

const localizer = BigCalendar.momentLocalizer(moment);

// const events = [
//   {
//     start: new Date(),
//     end: new Date(moment().add(1, 'days')),
//     title: 'Some title',
//   },
// ];

export default function Calendar({
  signout,
  startForm,
  updateForm,
  cancelCreate,
  createEvent,
  isCreationModalOpen,
  form,
}) {
  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <FlexContainer justify="spaceBetween" align="center">
            <Link className={styles.titleLink} to="/calendar">
              <h4>Discord Scheduler</h4>
            </Link>
            <FlexContainer align="center">
              <Link className={styles.minorLink} to="/settings">
                Settings
              </Link>
              <Button
                className={styles.minorLink}
                link
                onClick={() => signout()}
              >
                Sign Out
              </Button>
            </FlexContainer>
          </FlexContainer>
        </div>
      </div>
      <div className="container">
        <div className={styles.calendar}>
          <BigCalendar
            views={[BigCalendar.Views.MONTH]}
            localizer={localizer}
            events={[]}
            style={{ height: '100%' }}
            selectable
            onSelectEvent={console.log}
            onSelectSlot={({ start, end }) => startForm(start, end)}
          />
        </div>
      </div>
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
          <label htmlFor="title">Title</label>
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
    </>
  );
}

Calendar.propTypes = {
  signout: PropTypes.func.isRequired,
  startForm: PropTypes.func.isRequired,
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

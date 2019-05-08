import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import BigCalendar from 'react-big-calendar';

import EventCreationModal from 'components/event-creation-modal';
import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';

import styles from './styles.module.scss';

const localizer = BigCalendar.momentLocalizer(moment);

// const events = [
//   {
//     start: new Date(),
//     end: new Date(moment().add(1, 'days')),
//     title: 'Some title',
//   },
// ];

export default function Calendar({ signout, startForm }) {
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
      <EventCreationModal />
    </>
  );
}

Calendar.propTypes = {
  signout: PropTypes.func.isRequired,
  startForm: PropTypes.func.isRequired,
};

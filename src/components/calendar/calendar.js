import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';

import EventFormModal from 'components/event-form-modal';
import FlexContainer from 'primitives/flex-container';
import Button from 'primitives/button';
import { values } from 'constants/lodash';
import { normalizeDate } from 'utils/time';
import REASONS from 'constants/reasons';

import styles from './styles.module.scss';

const localizer = BigCalendar.momentLocalizer(moment);

export default function Calendar({
  signout,
  fetchMonth,
  startForm,
  selectEvent,
  events,
}) {
  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <FlexContainer justify="spaceBetween" align="center">
            <img
              className={styles.logo}
              src="/images/logo.png"
              alt="Lifeloop Logo"
            />
            <FlexContainer align="center">
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
            selectable
            views={[BigCalendar.Views.MONTH]}
            localizer={localizer}
            events={values(events)}
            style={{ height: '100%' }}
            onSelectEvent={evt => selectEvent(evt.id)}
            onNavigate={date => fetchMonth(date)}
            onSelectSlot={({ start, end }) =>
              startForm(normalizeDate(start), normalizeDate(end))
            }
            eventPropGetter={event => ({
              style: { backgroundColor: REASONS[event.reason].color },
            })}
          />
        </div>
      </div>
      <EventFormModal />
    </>
  );
}

Calendar.propTypes = {
  signout: PropTypes.func.isRequired,
  fetchMonth: PropTypes.func.isRequired,
  startForm: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired,
  events: PropTypes.shape().isRequired,
};

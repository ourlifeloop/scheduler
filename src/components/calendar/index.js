import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getEvents } from 'store/selectors/base.selectors';
import {
  startForm,
  fetchMonth,
  selectEvent,
} from 'store/actions/calendar.actions';

import Calendar from './calendar';

const mapStateToProps = createStructuredSelector({
  events: getEvents,
});

export default connect(mapStateToProps, { startForm, fetchMonth, selectEvent })(
  Calendar,
);

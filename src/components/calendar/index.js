import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getEvents } from 'store/selectors/base.selectors';
import { startForm } from 'store/actions/calendar.actions';
import { signout } from 'store/actions/user.actions';

import Calendar from './calendar';

const mapStateToProps = createStructuredSelector({
  events: getEvents,
});

export default connect(
  mapStateToProps,
  { startForm, signout },
)(Calendar);

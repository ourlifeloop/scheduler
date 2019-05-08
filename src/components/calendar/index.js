import { connect } from 'react-redux';

import { startForm } from 'store/actions/calendar.actions';
import { signout } from 'store/actions/user.actions';

import Calendar from './calendar';

export default connect(
  null,
  { startForm, signout },
)(Calendar);

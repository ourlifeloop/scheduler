import { connect } from 'react-redux';

import { signout } from 'store/actions/user.actions';

import Calendar from './calendar';

export default connect(
  null,
  { signout },
)(Calendar);

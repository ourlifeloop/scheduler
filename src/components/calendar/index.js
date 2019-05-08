import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getIsCreationModalOpen } from 'store/selectors/base.selectors';
import {
  startForm,
  cancelCreate,
  createEvent,
} from 'store/actions/calendar.actions';
import { signout } from 'store/actions/user.actions';

import Calendar from './calendar';

const mapStateToProps = createStructuredSelector({
  isCreationModalOpen: getIsCreationModalOpen,
});

export default connect(
  mapStateToProps,
  { startForm, cancelCreate, createEvent, signout },
)(Calendar);

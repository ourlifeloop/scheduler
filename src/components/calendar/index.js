import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getIsCreationModalOpen,
  getCalendarForm,
} from 'store/selectors/base.selectors';
import {
  startForm,
  updateForm,
  cancelCreate,
  createEvent,
} from 'store/actions/calendar.actions';
import { signout } from 'store/actions/user.actions';

import Calendar from './calendar';

const mapStateToProps = createStructuredSelector({
  isCreationModalOpen: getIsCreationModalOpen,
  form: getCalendarForm,
});

export default connect(
  mapStateToProps,
  { startForm, updateForm, cancelCreate, createEvent, signout },
)(Calendar);

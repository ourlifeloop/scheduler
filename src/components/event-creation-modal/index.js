import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getIsCreationModalOpen,
  getCalendarForm,
} from 'store/selectors/base.selectors';
import {
  updateForm,
  cancelCreate,
  createEvent,
} from 'store/actions/calendar.actions';

import EventCreationModal from './event-creation-modal';

const mapStateToProps = createStructuredSelector({
  isCreationModalOpen: getIsCreationModalOpen,
  form: getCalendarForm,
});

export default connect(
  mapStateToProps,
  { updateForm, cancelCreate, createEvent },
)(EventCreationModal);

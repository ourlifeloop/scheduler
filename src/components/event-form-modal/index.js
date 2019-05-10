import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getisEventFormModalOpen,
  getCalendarForm,
} from 'store/selectors/base.selectors';
import {
  updateForm,
  cancelForm,
  createEvent,
} from 'store/actions/calendar.actions';

import EventFormModal from './event-form-modal';

const mapStateToProps = createStructuredSelector({
  isEventFormModalOpen: getisEventFormModalOpen,
  form: getCalendarForm,
});

export default connect(
  mapStateToProps,
  { updateForm, cancelForm, createEvent },
)(EventFormModal);

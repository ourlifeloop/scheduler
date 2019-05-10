import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getisEventFormModalOpen,
  getCalendarForm,
} from './node_modules/store/selectors/base.selectors';
import {
  updateForm,
  cancelForm,
  createEvent,
} from './node_modules/store/actions/calendar.actions';

import EventFormModal from './event-form-modal';

const mapStateToProps = createStructuredSelector({
  isEventFormModalOpen: getisEventFormModalOpen,
  form: getCalendarForm,
});

export default connect(
  mapStateToProps,
  { updateForm, cancelForm, createEvent },
)(EventFormModal);

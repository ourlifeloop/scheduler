import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleViewer } from 'store/actions/calendar.actions';
import { selectedEvent } from 'store/selectors/calendar.selectors';
import { getIsViewerModalOpen } from 'store/selectors/base.selectors';

import EventViewerModal from './event-viewer-modal';

const mapStateToProps = createStructuredSelector({
  isViewerModalOpen: getIsViewerModalOpen,
  selectedEvent,
});

export default connect(
  mapStateToProps,
  { toggleViewer },
)(EventViewerModal);

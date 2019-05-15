import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'primitives/modal';
import REASONS from 'constants/reasons';

import styles from './styles.module.scss';

export default function EventViewingModal({
  isViewerModalOpen,
  selectedEvent,
  toggleViewer,
}) {
  return (
    <Modal title="Event" onCancel={toggleViewer} isOpen={isViewerModalOpen}>
      <p className={styles.title}>
        {selectedEvent.title} is {(REASONS[selectedEvent.reason] || {}).title}
      </p>
      <p className={styles.description}>
        <b>Description: </b>
        {selectedEvent.description}
      </p>
    </Modal>
  );
}

EventViewingModal.propTypes = {
  isViewerModalOpen: PropTypes.bool.isRequired,
  selectedEvent: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    reason: PropTypes.string,
    description: PropTypes.string,
  }),
};

EventViewingModal.defaultProps = {
  selectedEvent: {},
};

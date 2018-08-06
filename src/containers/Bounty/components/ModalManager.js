import React from 'react';
import { ExtendDeadlineModal } from 'containers/Bounty/components';

const ModalManager = props => {
  const { visible, modalType, onClose, onExtendDeadline } = props;

  if (!visible) {
    return null;
  }

  if (modalType === 'deadlineWarning') {
    return (
      <ExtendDeadlineModal
        onClose={onClose}
        onExtendDeadline={onExtendDeadline}
      />
    );
  }
};

export default ModalManager;

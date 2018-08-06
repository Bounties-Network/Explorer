import React from 'react';
import { BigNumber } from 'bignumber.js';
import {
  ExtendDeadlineModal,
  ActivateDraftFormModal
} from 'containers/Bounty/components';

const ModalManager = props => {
  const {
    visible,
    modalType,
    onClose,
    onExtendDeadline,
    bounty,
    onActivateDraft
  } = props;

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

  if (modalType === 'activate') {
    return (
      <ActivateDraftFormModal
        onClose={onClose}
        onSubmit={onActivateDraft}
        minimumBalance={BigNumber(
          bounty.calculated_fulfillmentAmount,
          10
        ).toString()}
      />
    );
  }
};

export default ModalManager;

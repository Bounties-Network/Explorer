import React from 'react';
import { BigNumber } from 'bignumber.js';
import {
  ExtendDeadlineErrorModal,
  ActivateDraftFormModal,
  ExtendDeadlineFormModal,
  ActivateDeadFormModal
} from 'containers/Bounty/components';

const ModalManager = props => {
  const {
    visible,
    modalType,
    onClose,
    onExtendDeadline,
    bounty,
    onActivateDraft,
    activateDeadBounty
  } = props;

  if (!visible) {
    return null;
  }

  if (modalType === 'deadlineWarning') {
    return (
      <ExtendDeadlineErrorModal
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

  if (modalType === 'extendDealine') {
    return <ExtendDeadlineFormModal onClose={onClose} onSubmit={() => {}} />;
  }

  if (modalType === 'activateDead') {
    return (
      <ActivateDeadFormModal
        onClose={onClose}
        onSubmit={activateDeadBounty}
        minimumBalance={BigNumber(
          bounty.calculated_fulfillmentAmount,
          10
        ).toString()}
      />
    );
  }
};

export default ModalManager;

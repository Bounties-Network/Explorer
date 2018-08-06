import React from 'react';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import {
  ExtendDeadlineErrorModal,
  ActivateDraftFormModal,
  ExtendDeadlineFormModal,
  ActivateDeadFormModal,
  IncreasePayoutFormModal
} from 'containers/Bounty/components';

const ModalManager = props => {
  const {
    visible,
    modalType,
    onClose,
    onExtendDeadlineError,
    bounty,
    onActivateDraft,
    activateDeadBounty,
    extendDeadline,
    increasePayout
  } = props;

  if (!visible) {
    return null;
  }

  if (modalType === 'deadlineWarning') {
    return (
      <ExtendDeadlineErrorModal
        onClose={onClose}
        onExtendDeadline={onExtendDeadlineError}
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

  if (modalType === 'extendDeadline') {
    const tomorrow = moment()
      .add(1, 'days')
      .utc();
    const currentDeadline = moment(bounty.deadline).utc();

    const minimumDeadline =
      currentDeadline > tomorrow ? currentDeadline : tomorrow;

    return (
      <ExtendDeadlineFormModal
        onClose={onClose}
        onSubmit={extendDeadline}
        minimumDeadline={minimumDeadline}
      />
    );
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

  if (modalType === 'increasePayout') {
    return (
      <IncreasePayoutFormModal
        onClose={onClose}
        onSubmit={increasePayout}
        minimumBalance={BigNumber(bounty.calculated_balance, 10).toString()}
      />
    );
  }
};

export default ModalManager;

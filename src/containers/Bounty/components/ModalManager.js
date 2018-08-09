import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as fulfillmentActions } from 'public-modules/Fulfillment';
import { actions as bountyUIActions } from '../reducer';
import { rootBountyPageSelector } from '../selectors';
import {
  ExtendDeadlineErrorModal,
  ActivateDraftFormModal,
  ExtendDeadlineFormModal,
  ActivateDeadFormModal,
  IncreasePayoutFormModal,
  FulfillBountyFormModal,
  KillBountyFormModal
} from 'containers/Bounty/components';

const ModalManagerComponent = props => {
  const {
    bounty,
    onExtendDeadlineError,
    modalVisible,
    modalType,
    closeModal,
    initiateWalkthrough,

    /* bounty actions */
    activateDraftBountyAction,
    killBountyAction,
    activateBountyAction,
    extendDeadlineAction,
    increasePayoutAction,
    fulfillBountyAction
    /*****************/
  } = props;

  if (!modalVisible) {
    return null;
  }

  const minimumBalance = BigNumber(
    bounty.calculated_fulfillmentAmount,
    10
  ).toString();

  const killBounty = () =>
    initiateWalkthrough(() => killBountyAction(bounty.id));

  const activateDraftBounty = values =>
    initiateWalkthrough(() =>
      activateDraftBountyAction({ ...bounty }, values.balance)
    );

  const extendDeadline = values =>
    initiateWalkthrough(() => extendDeadlineAction(bounty.id, values.deadline));

  const activateBounty = values =>
    initiateWalkthrough(() =>
      activateBountyAction(
        bounty.id,
        values.balance,
        bounty.paysTokens,
        bounty.tokenDecimals,
        bounty.tokenContract
      )
    );

  const increasePayout = values =>
    initiateWalkthrough(() =>
      increasePayoutAction(
        bounty.id,
        values.fulfillmentAmount,
        values.balance,
        bounty.paysTokens,
        bounty.tokenDecimals,
        bounty.tokenContract
      )
    );

  const fulfillBounty = values =>
    initiateWalkthrough(() => fulfillBountyAction(bounty.id, values));

  if (modalType === 'deadlineWarning') {
    return (
      <ExtendDeadlineErrorModal
        onClose={closeModal}
        onExtendDeadline={onExtendDeadlineError}
      />
    );
  }

  if (modalType === 'kill') {
    return <KillBountyFormModal onClose={closeModal} onSubmit={killBounty} />;
  }

  if (modalType === 'activate') {
    return (
      <ActivateDraftFormModal
        onClose={closeModal}
        onSubmit={activateDraftBounty}
        minimumBalance={minimumBalance}
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
        onClose={closeModal}
        onSubmit={extendDeadline}
        minimumDeadline={minimumDeadline}
      />
    );
  }

  if (modalType === 'activateDead') {
    return (
      <ActivateDeadFormModal
        onClose={closeModal}
        onSubmit={activateBounty}
        minimumBalance={minimumBalance}
      />
    );
  }

  if (modalType === 'increasePayout') {
    return (
      <IncreasePayoutFormModal
        onClose={closeModal}
        onSubmit={increasePayout}
        minimumBalance={BigNumber(bounty.calculated_balance, 10).toString()}
      />
    );
  }

  if (modalType === 'fulfillBounty') {
    return (
      <FulfillBountyFormModal onClose={closeModal} onSubmit={fulfillBounty} />
    );
  }
};

const mapStateToProps = (state, router) => {
  const bountyPage = rootBountyPageSelector(state);

  return {
    modalType: bountyPage.modalType,
    modalVisible: bountyPage.modalVisible
  };
};

const ModalManager = compose(
  connect(
    mapStateToProps,
    {
      closeModal: bountyUIActions.closeModal,
      showModal: bountyUIActions.showModal,
      activateDraftBountyAction: bountyActions.createBounty,
      killBountyAction: bountyActions.killBounty,
      activateBountyAction: bountyActions.activateBounty,
      extendDeadlineAction: bountyActions.extendDeadline,
      increasePayoutAction: bountyActions.increasePayout,
      fulfillBountyAction: fulfillmentActions.createFulfillment
    }
  )
)(ModalManagerComponent);

export default ModalManager;

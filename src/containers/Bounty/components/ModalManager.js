import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as fulfillmentActions } from 'public-modules/Fulfillment';
import { actions as reviewActions } from 'public-modules/Review';
import { actions as bountyUIActions } from '../reducer';
import { rootBountyPageSelector } from '../selectors';
import {
  ExtendDeadlineErrorModal,
  ActivateDraftFormModal,
  ExtendDeadlineFormModal,
  ActivateDeadFormModal,
  IncreasePayoutFormModal,
  FulfillBountyFormModal,
  KillBountyFormModal,
  ContributeFormModal,
  TransferOwnershipFormModal,
  IssueRatingFormModal
} from 'containers/Bounty/components';

const ModalManagerComponent = props => {
  const {
    user,
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
    fulfillBountyAction,
    transferOwnershipAction,
    contributeAction
    /*****************/
  } = props;

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

  const transferOwnership = values =>
    initiateWalkthrough(() =>
      transferOwnershipAction(bounty.id, values.newOwner)
    );

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

  const contribute = values =>
    initiateWalkthrough(() =>
      contributeAction(
        bounty.id,
        values.contribution,
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
        values.balance || '0',
        bounty.paysTokens,
        bounty.tokenDecimals,
        bounty.tokenContract
      )
    );

  const fulfillBounty = values =>
    initiateWalkthrough(() => fulfillBountyAction(bounty.id, values));

  const tomorrow = moment().add(1, 'days');
  const currentDeadline = moment.utc(bounty.deadline);

  const minimumDeadline =
    currentDeadline > tomorrow
      ? currentDeadline.add(1, 'days').local()
      : tomorrow;

  return (
    <React.Fragment>
      <ContributeFormModal
        visible={modalVisible && modalType === 'contribute'}
        onClose={closeModal}
        onSubmit={contribute}
        tokenSymbol={bounty.tokenSymbol}
      />
      <ExtendDeadlineErrorModal
        visible={modalVisible && modalType === 'deadlineWarning'}
        onClose={closeModal}
        onExtendDeadline={onExtendDeadlineError}
      />
      <KillBountyFormModal
        visible={modalVisible && modalType === 'kill'}
        onClose={closeModal}
        onSubmit={killBounty}
      />
      <ActivateDraftFormModal
        visible={modalVisible && modalType === 'activate'}
        onClose={closeModal}
        onSubmit={activateDraftBounty}
        minimumBalance={minimumBalance}
        tokenSymbol={bounty.tokenSymbol}
        initialValues={{ balance: minimumBalance }}
      />
      <ExtendDeadlineFormModal
        visible={modalVisible && modalType === 'extendDeadline'}
        onClose={closeModal}
        onSubmit={extendDeadline}
        minimumDeadline={minimumDeadline}
        initialValues={{ deadline: minimumDeadline }}
      />
      <TransferOwnershipFormModal
        visible={modalVisible && modalType === 'transferOwnership'}
        onClose={closeModal}
        onSubmit={transferOwnership}
      />
      <ActivateDeadFormModal
        visible={modalVisible && modalType === 'activateDead'}
        onClose={closeModal}
        onSubmit={activateBounty}
        minimumBalance={minimumBalance}
        tokenSymbol={bounty.tokenSymbol}
        initialValues={{ balance: minimumBalance }}
      />
      <IncreasePayoutFormModal
        onClose={closeModal}
        onSubmit={increasePayout}
        minimumPayout={BigNumber(
          bounty.calculated_fulfillmentAmount,
          10
        ).toString()}
        visible={modalVisible && modalType === 'increasePayout'}
        tokenSymbol={bounty.tokenSymbol}
        minimumBalance={BigNumber(bounty.calculated_balance, 10).toString()}
      />
      <FulfillBountyFormModal
        visible={modalType === 'fulfillBounty'}
        privateFulfillments={bounty.private_fulfillments}
        onClose={closeModal}
        onSubmit={fulfillBounty}
        name={user.name}
        email={user.email}
      />
      <IssueRatingFormModal
        key="issuer"
        type="issuer"
        visible={modalVisible && modalType === 'issueRatingForIssuer'}
        onSubmit={reviewActions}
        onClose={closeModal}
        bounty={bounty}
      />
      <IssueRatingFormModal
        key="fulfiller"
        type="fulfiller"
        visible={modalVisible && modalType === 'issueRatingForFulfiller'}
        onSubmit={reviewActions}
        onClose={closeModal}
        bounty={bounty}
      />
    </React.Fragment>
  );
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
      fulfillBountyAction: fulfillmentActions.createFulfillment,
      transferOwnershipAction: bountyActions.transferOwnership,
      contributeAction: bountyActions.contribute
    }
  )
)(ModalManagerComponent);

export default ModalManager;

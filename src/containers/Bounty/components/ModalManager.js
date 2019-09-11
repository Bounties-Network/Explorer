import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as fulfillmentActions } from 'public-modules/Fulfillment';
import { actions as fulfillerApplicationActions } from 'public-modules/FulfillerApplication';
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
  FulfillerApplicationFormModal,
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
    updateFulfillmentAction,
    transferOwnershipAction,
    contributeAction,

    createFulfillerApplicationAction,
    fulfillmentToEdit
  } = props;

  const belongsToLoggedInUser =
    user && bounty.user.public_address === user.public_address;

  const minimumBalance = BigNumber(
    bounty.calculated_fulfillment_amount,
    10
  ).toString();

  const killBounty = () =>
    initiateWalkthrough(() =>
      killBountyAction(
        bounty.bounty_id,
        bounty.contract_version,
        bounty.balance
      )
    );

  const activateDraftBounty = values =>
    initiateWalkthrough(() =>
      activateDraftBountyAction({ ...bounty }, values.balance)
    );

  const extendDeadline = values =>
    initiateWalkthrough(() =>
      extendDeadlineAction(
        bounty.bounty_id,
        bounty.contract_version,
        values.deadline
      )
    );

  const transferOwnership = values =>
    initiateWalkthrough(() =>
      transferOwnershipAction(
        bounty.bounty_id,
        bounty.contract_version,
        values.newOwner
      )
    );

  const activateBounty = values =>
    initiateWalkthrough(() => {
      if (bounty.contract_version === 2 || bounty.contract_version === 2.1) {
        contributeAction(
          bounty.bounty_id,
          values.balance,
          bounty.token_version,
          bounty.token_decimals,
          bounty.token_contract,
          user.public_address,
          bounty.contract_version
        );
      } else {
        activateBountyAction(
          bounty.bounty_id,
          values.balance,
          bounty.token_version !== 0,
          bounty.token_decimals,
          bounty.token_contract
        );
      }
    });

  const contribute = values =>
    initiateWalkthrough(() =>
      contributeAction(
        bounty.bounty_id,
        values.contribution,
        bounty.token_version,
        bounty.token_decimals,
        bounty.token_contract,
        user.public_address,
        bounty.contract_version
      )
    );

  const increasePayout = values =>
    initiateWalkthrough(() =>
      increasePayoutAction(
        bounty.bounty_id,
        bounty.contract_version,
        values.fulfillment_amount,
        values.balance || '0',
        bounty.token_version !== 0,
        bounty.token_decimals,
        bounty.token_contract,
        bounty
      )
    );

  const fulfillBounty = values =>
    initiateWalkthrough(() =>
      fulfillBountyAction(
        bounty.bounty_id,
        bounty.contract_version,
        bounty.platform,
        values
      )
    );

  const updateFulfillment = values =>
    initiateWalkthrough(() =>
      updateFulfillmentAction(
        bounty.bounty_id,
        bounty.contract_version,
        bounty.platform,
        values
      )
    );

  const createFulfillerApplication = (values, callback) =>
    createFulfillerApplicationAction(bounty.id, values.message, callback);

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
        token_symbol={bounty.token_symbol}
        tokenDecimals={bounty.token_decimals}
        token_contract={bounty.token_contract}
        belongsToLoggedInUser={belongsToLoggedInUser}
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
        token_symbol={bounty.token_symbol}
        tokenDecimals={bounty.token_decimals}
        token_contract={bounty.token_contract}
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
        token_symbol={bounty.token_symbol}
        tokenDecimals={bounty.token_decimals}
        token_contract={bounty.token_contract}
        initialValues={{ balance: minimumBalance }}
      />
      <IncreasePayoutFormModal
        onClose={closeModal}
        onSubmit={increasePayout}
        minimumPayout={BigNumber(
          bounty.calculated_fulfillment_amount,
          10
        ).toString()}
        visible={modalVisible && modalType === 'increasePayout'}
        token_symbol={bounty.token_symbol}
        tokenDecimals={bounty.token_decimals}
        token_contract={bounty.token_contract}
        minimumBalance={BigNumber(bounty.calculated_balance, 10).toString()}
        contract_version={bounty.contract_version}
      />
      <FulfillBountyFormModal
        visible={modalType === 'fulfillBounty'}
        private_fulfillments={bounty.private_fulfillments}
        onClose={closeModal}
        onSubmit={fulfillBounty}
        name={user.name}
        email={user.email}
      />
      <FulfillBountyFormModal
        visible={modalType === 'updateFulfillment'}
        private_fulfillments={bounty.private_fulfillments}
        onClose={closeModal}
        onSubmit={updateFulfillment}
        name={user.name}
        email={user.email}
        fulfillmentToEdit={fulfillmentToEdit}
      />
      <FulfillerApplicationFormModal
        visible={modalType === 'fulfillerApplication'}
        onClose={closeModal}
        onSubmit={createFulfillerApplication}
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
    modalVisible: bountyPage.modalVisible,
    fulfillmentToEdit: bountyPage.fulfillmentToEdit
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
      updateFulfillmentAction: fulfillmentActions.updateFulfillment,
      transferOwnershipAction: bountyActions.transferOwnership,
      contributeAction: bountyActions.contribute,
      createFulfillerApplicationAction:
        fulfillerApplicationActions.createFulfillerApplication
    }
  )
)(ModalManagerComponent);

export default ModalManager;

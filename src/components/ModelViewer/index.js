import React from 'react';
import styles from './ModelViewer.module.scss';

import { Text } from 'components';

import {
  LoadingModel,
  ActivateBountyModal,
  KillBountyModal,
  SubmissionDetailModal,
  ActivationWalletConfirmationModal,
  TransactionPendingModal,
  MetamaskLockModal,
  RateFulfillerModal
} from '../Models';

class ModelViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModel: 'RateFulfillerModal'
    };
  }

  onModelChange(model) {
    this.setState({ currentModel: model });
  }

  render() {
    const { currentModel } = this.state;

    return (
      <div className={`${styles.ModelViewer}`}>
        <div className={`${styles.controls}`}>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('none');
              }}
              checked={currentModel === 'none'}
            />
            <Text>Hide All Models</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('LoadingModal');
              }}
              checked={currentModel === 'LoadingModal'}
            />
            <Text>Loading Model</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('ActivateBountyModal');
              }}
              checked={currentModel === 'ActivateBountyModal'}
            />
            <Text>Activate Bounty Model</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('KillBountyModal');
              }}
              checked={currentModel === 'KillBountyModal'}
            />
            <Text>Kill Bounty Model</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('SubmissionDetailModal');
              }}
              checked={currentModel === 'SubmissionDetailModal'}
            />
            <Text>Submissions Detail Model</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('ActivationWalletConfirmationModal');
              }}
              checked={currentModel === 'ActivationWalletConfirmationModal'}
            />
            <Text>Activation Wallet Conf Model</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('TransactionPendingModal');
              }}
              checked={currentModel === 'TransactionPendingModal'}
            />
            <Text>Transaction Pending Model</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('MetamaskLockModal');
              }}
              checked={currentModel === 'MetamaskLockModal'}
            />
            <Text>MetaMask Lock Modal</Text>
          </div>
          <div className={`${styles.cell}`}>
            <input
              type="radio"
              onChange={() => {
                this.onModelChange('RateFulfillerModal');
              }}
              checked={currentModel === 'RateFulfillerModal'}
            />
            <Text>Rate Fulfiller Modal</Text>
          </div>
        </div>
        <hr />
        <div className={`${styles.modelArea}`}>
          {currentModel === 'LoadingModal' ? (
            <LoadingModel>
              Confirm Ethereum transaction to accept submission.
            </LoadingModel>
          ) : (
            ''
          )}
          {currentModel === 'ActivateBountyModal' ? (
            <ActivateBountyModal />
          ) : (
            ''
          )}
          {currentModel === 'KillBountyModal' ? <KillBountyModal /> : ''}
          {currentModel === 'SubmissionDetailModal' ? (
            <SubmissionDetailModal />
          ) : (
            ''
          )}
          {currentModel === 'ActivationWalletConfirmationModal' ? (
            <ActivationWalletConfirmationModal />
          ) : (
            ''
          )}
          {currentModel === 'TransactionPendingModal' ? (
            <TransactionPendingModal />
          ) : (
            ''
          )}
          {currentModel === 'MetamaskLockModal' ? <MetamaskLockModal /> : ''}
          {currentModel === 'RateFulfillerModal' ? <RateFulfillerModal /> : ''}
        </div>
      </div>
    );
  }
}

export default ModelViewer;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionWalkthrough.module.scss';
import { Text, Modal, Button } from 'components';

const InitiateWalkthrough = props => {
  const { onClose, visible, onConfirm } = props;

  return (
    <Modal onClose={onClose} visible={visible}>
      <Modal.Header icon={['fal', 'wallet']}>
        <Modal.Message>Your wallet will take it from here!</Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Text className={styles.textBreak}>
          After clicking &quot;OK &quot;, a wallet dialogue will prompt you to
          confirm your transaction and pay a small amount of ETH (gas fee).
        </Text>
        <Text>A default gas limit and price will be set for you.</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const PendingWalletConfirm = props => {
  const { text } = props;

  return (
    <Modal visible={true}>
      <Modal.Header loadingIcon>
        <Modal.Message>{text}</Modal.Message>
      </Modal.Header>
    </Modal>
  );
};

const PendingReceipt = props => {
  const { text, dismissable, onDismiss, visible, toDashboard } = props;

  return (
    <Modal visible={visible} dismissable={dismissable} onClose={onDismiss}>
      <Modal.Header loadingIcon closable={dismissable}>
        <Modal.Message>
          Waiting for your transaction to be cofirmed on the blockchain...
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        {dismissable ? (
          <Button margin onClick={onDismiss}>
            Dismiss
          </Button>
        ) : null}
        <Button type="primary" onClick={toDashboard}>
          Go to Dasbhoard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const WalkthroughError = props => {
  const { onClose } = props;

  return (
    <Modal dismissable onClose={onClose} icon={['far', 'exclamation-triangle']}>
      <Modal.Header closable>
        <Modal.Message>Something happened. Try again later.</Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const TransactionWalkthrough = props => {
  const { visible, stage, onClose } = props;

  return <div>Walkthrough</div>;
};

export default TransactionLoading;

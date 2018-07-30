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

InitiateWalkthrough.PropTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  onConfirm: PropTypes.func
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

PendingWalletConfirm.propTypes = {
  text: PropTypes.string
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

PendingReceipt.propTypes = {
  text: PropTypes.string,
  dismissable: PropTypes.bool,
  onDismiss: PropTypes.func,
  visible: PropTypes.bool,
  toDashboard: PropTypes.func
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

WalkthroughError.propTypes = {
  onClose: propTypes.func
};

const TransactionWalkthrough = props => {
  const {
    visible,
    stage,
    onClose,
    onDismiss,
    onConfirm,
    toDashboard,
    pendingReceiptText,
    dismissable,
    pendingWalletText
  } = props;

  if (!visible) {
    return null;
  }

  if (stage === 'initiatePrompt') {
    return (
      <InitiateWalkthrough
        onConfirm={onConfirm}
        visible={true}
        onClose={onClose}
      />
    );
  }

  if (stage === 'pendingWalletConfirm') {
    return <PendingWalletConfirm text={pendingWalletText} visible={true} />;
  }

  if (stage === 'pendingReceipt') {
    return (
      <PendingReceipt
        text={pendingReceiptText}
        dismissable={dismissable}
        onDismiss={onDismiss}
        visible={true}
        toDashboard={toDashboard}
      />
    );
  }

  if (stage === 'error') {
    return <WalkthroughError onClose={onClose} />;
  }
};

TransactionWalkthrough.propTypes = {
  visible: PropTypes.bool,
  stage:
    PropTypes.oneOf[
      ('initiatePrompt', 'pendingWalletConfirm', 'pendingReceipt', 'error')
    ],
  onClose: PropTypes.func,
  onDismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  toDashboard: PropTypes.func,
  pendingReceiptText: PropTypes.text,
  dismissable: PropTypes.bool,
  pendingWalletText: PropTypes.text
};

TransactionWalkthrough.defaultProps = {
  pendingReceiptText:
    'Confirming Ethereum transaction with your enabled wallet',
  pendingWalletText:
    'Your transaction is being processed. We will notify you once it is confirmed'
};

export default TransactionWalkthrough;

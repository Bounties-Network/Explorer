import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './TransactionWalkthrough.module.scss';
import { Text, Modal, Button } from 'components';

const InitiateWalkthrough = props => {
  const { onClose, visible, onConfirm } = props;

  return (
    <Modal onClose={onClose} visible={visible} fixed size="small">
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

InitiateWalkthrough.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  onConfirm: PropTypes.func
};

const PendingWalletConfirm = props => {
  const { text } = props;

  return (
    <Modal visible={true} fixed size="small">
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
  const { text, visible, toDashboard } = props;

  return (
    <Modal visible={visible} fixed size="small">
      <Modal.Header loadingIcon>
        <Modal.Message>
          Waiting for your transaction to be cofirmed on the blockchain...
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button type="primary" onClick={toDashboard}>
          Go to Dasbhoard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PendingReceipt.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  toDashboard: PropTypes.func
};

const WalkthroughError = props => {
  const { onClose, visible } = props;

  return (
    <Modal dismissable onClose={onClose} fixed size="small" visible={visible}>
      <Modal.Header icon={['far', 'exclamation-triangle']} closable>
        <Modal.Message>Something happened. Try again later.</Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

WalkthroughError.propTypes = {
  onClose: PropTypes.func
};

const WalkthroughSuccess = props => {
  const { visible, toDashboard, buttonText, successPath, successLink } = props;

  return (
    <Modal fixed size="small" visible={visible}>
      <Modal.Header icon={['far', 'check-circle']}>
        <Modal.Message>Your transaction has been confirmed!</Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button margin onClick={toDashboard} type="primary">
          To Dashboard
        </Button>
        <a href={successLink}>
          <Button type="action">{buttonText}</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

const TransactionWalkthrough = props => {
  const {
    visible,
    stage,
    onClose,
    onConfirm,
    toDashboard,
    pendingReceiptText,
    pendingWalletText,
    transaction,
    successLink
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

  if (stage === 'pendingReceipt' && !transaction.completed) {
    return (
      <PendingReceipt
        text={pendingReceiptText}
        visible={true}
        toDashboard={toDashboard}
      />
    );
  }

  if (stage === 'pendingReceipt' && transaction.completed) {
    return (
      <WalkthroughSuccess
        visible={true}
        toDashboard={toDashboard}
        buttonText={transaction.linkText}
        successLink={successLink}
      />
    );
  }

  if (stage === 'error') {
    return <WalkthroughError onClose={onClose} visible={true} />;
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
  pendingWalletText: PropTypes.text
};

TransactionWalkthrough.defaultProps = {
  pendingReceiptText:
    'Your transaction is being processed. We will notify you once it is confirmed.',
  pendingWalletText:
    'Confirming Ethereum transaction with your enabled wallet. This may take a few seconds.'
};

export default TransactionWalkthrough;

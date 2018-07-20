import React from 'react';
import { Modal, Text, Button } from 'components';

const WalletRequired = props => {
  const { visible, onClose } = props;

  return (
    <Modal visible={visible} size="small" dismissable onClose={onClose}>
      <Modal.Header closable icon={['fal', 'wallet']}>
        <Modal.Message>
          Web3 enabled browser and secure wallet required.
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Text inline type>
          In order to use{' '}
        </Text>
        <Text weight="fontWeight-bold" inline>
          bounties.network
        </Text>
        <Text inline>, please install a secure wallet such as </Text>
        <Text inline link src="https://metamask.io/">
          MetaMask.
        </Text>
        <Text inline>
          {' '}
          If you'd like help getting set up, take a look at our{' '}
        </Text>
        <Text inline link src="https://bounties.network/gettingStarted">
          Getting Started Guide
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          Cancel
        </Button>
        <a href="https://metamask.io/">
          <Button type="primary">Visit MetaMask.io</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default WalletRequired;

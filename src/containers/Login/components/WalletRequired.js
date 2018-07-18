import React from 'react';
import { Modal, Text, Button } from 'components';

const WalletRequired = props => {
  return (
    <Modal visible size="small">
      <Modal.Header closable icon={['fal', 'wallet']}>
        <Modal.Heading>
          Web3 enabled browser and secure wallet required.
        </Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Text inline>In order to use </Text>
        <Text weight="fontWeight-bold" inline>
          bounties.network
        </Text>
        <Text inline>, please install a secure wallet such as </Text>
        <Text inline link>
          MetaMask.
        </Text>
        <Text inline>
          {' '}
          If you'd like help getting set up, take a look at our{' '}
        </Text>
        <Text inline link>
          Getting Started Guide
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button margin>Cancel</Button>
        <Button type="primary">Visit MetaMask.io</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WalletRequired;

import React from 'react';
import { Modal, Text, Button } from 'components';

const UnlockWallet = props => {
  const { visible, onClose } = props;

  return (
    <Modal visible={visible} size="small" dismissable onClose={onClose}>
      <Modal.Header closable icon={['fal', 'unlock']}>
        <Modal.Heading>Please unlock your secure wallet</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Text inline>
          Youll need to log in to your secure wallet account (e.g.
        </Text>
        <Text weight="fontWeight-bold" inline>
          MetaMask
        </Text>
        <Text inline>) in order to access bounties.network.</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnlockWallet;

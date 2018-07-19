import React from 'react';
import { Modal, Text, Button, Avatar } from 'components';
import { shortenAddress } from 'utils/helpers';
import styles from './baseStyles.module.scss';

const AddressMismatch = props => {
  const { visible, img, currentAddress, previousAddress, onClose } = props;

  return (
    <Modal visible={visible} size="small" dismissable onClose={onClose}>
      <Modal.Header closable icon={['fal', 'address-card']}>
        <Modal.Heading>Wallet address does not match.</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Text inline>You were previously signed in to </Text>
        <Text inline weight="fontweight-bold">
          bounties.network
        </Text>
        <Text inline>using the following address:</Text>
        <div>
          <Avatar
            className={styles.avatar}
            size="small"
            img={img}
            hash={previousAddress}
            address={previousAddress}
          />
        </div>
        <Text inline>
          This address does not match your current wallet account address:
        </Text>
        <Text inline weight="fontweight-bold">
          {shortenAddress(currentAddress)}
        </Text>
        <Text inline>
          . Please switch your wallet account, or log out of boiunties.network
          and sign in using a different address
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary">Logout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressMismatch;

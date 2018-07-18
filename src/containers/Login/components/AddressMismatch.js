import React from 'react';
import { Modal, Text, Button, Avatar } from 'components';
import styles from './baseStyles.module.scss';

const AddressMismatch = props => {
  return (
    <Modal visible size="small">
      <Modal.Header closable icon={['fal', 'wallet']}>
        <Modal.Heading>Wallet address does not match.</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Text inline>You were previously signed in to </Text>
        <Text inline weight="fontweight-bold">
          bounties.network{' '}
        </Text>
        <Text inline>using the following address:</Text>
        <div>
          <Avatar
            className={styles.avatar}
            size="small"
            img="https://i.imgur.com/lhTwRZY.png"
            address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
          />
        </div>
        <Text inline>
          This address does not match your current wallet account address:{' '}
        </Text>
        <Text inline weight="fontweight-bold">
          0xe68f...294r
        </Text>
        <Text inline>
          . Please switch your wallet account, or log out of boiunties.network
          and sign in using a different address
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button margin>Log out</Button>
        <Button type="primary">Retry</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressMismatch;

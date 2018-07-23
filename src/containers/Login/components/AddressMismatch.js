import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, Button, Avatar } from 'components';
import { shortenAddress } from 'utils/helpers';
import styles from './baseStyles.module.scss';

const AddressMismatch = props => {
  const {
    visible,
    img,
    currentAddress,
    previousAddress,
    onClose,
    logout,
    loggingOut
  } = props;

  return (
    <Modal
      visible={visible}
      size="small"
      dismissable={false}
      closable={false}
      onClose={onClose}
    >
      <Modal.Header closable icon={['fal', 'address-card']}>
        <Modal.Heading>Wallet address does not match.</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Text inline>You were previously signed in to </Text>
        <Text inline weight="fontweight-bold">
          bounties.network
        </Text>
        <Text inline> using the following address:</Text>
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
          {' '}
          {shortenAddress(currentAddress)}
        </Text>
        <Text inline>
          . Please switch your wallet account, or log out of the Bounties
          Network and sign in using a different address
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button type="primary" onClick={logout} loading={loggingOut}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddressMismatch.propTypes = {
  visible: PropTypes.bool,
  img: PropTypes.string,
  currentAddress: PropTypes.string,
  previousAddress: PropTypes.string,
  onClose: PropTypes.func,
  logout: PropTypes.func,
  loggingOut: PropTypes.bool
};

export default AddressMismatch;

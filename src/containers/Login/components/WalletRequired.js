import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, Button } from 'components';

const WalletRequired = props => {
  const { visible, onClose, closable } = props;

  return (
    <Modal
      visible={visible}
      size="small"
      dismissable={closable}
      onClose={onClose}
      closable={closable}
    >
      <Modal.Header closable icon={['fal', 'wallet']}>
        <Modal.Message>
          Web3 enabled browser and secure wallet required.
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Text inline>In order to use </Text>
        <Text weight="fontWeight-bold" inline>
          bounties.network
        </Text>
        <Text inline>, please install a secure wallet such as </Text>
        <Text inline link src="https://metamask.io/">
          MetaMask.{' '}
        </Text>
        <Text inline>
          If you&#39;d like help getting set up, take a look at our{' '}
        </Text>
        <Text inline link src="https://bounties.network/gettingStarted">
          Getting Started Guide
        </Text>
      </Modal.Body>
      <Modal.Footer>
        {closable ? (
          <Button margin onClick={onClose}>
            Cancel
          </Button>
        ) : null}
        <a href="https://metamask.io/">
          <Button type="primary">Visit MetaMask.io</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

WalletRequired.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  closable: PropTypes.bool
};

WalletRequired.defaultProps = {
  closable: true
};

export default WalletRequired;

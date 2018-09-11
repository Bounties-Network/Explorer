import React from 'react';
import PropTypes from 'prop-types';
import { getMobileOperatingSystem } from 'utils/helpers';
import { Modal, Text, Button } from 'components';

const WalletRequired = props => {
  const { visible, onClose, closable } = props;

  const operatingSystem = getMobileOperatingSystem();
  let walletName = 'MetaMask';
  let walletLink = 'https://metamask.io';

  if (operatingSystem === 'iOS') {
    walletName = 'Coinbase Wallet';
    walletLink =
      'https://itunes.apple.com/us/app/coinbase-bitcoin-wallet/id886427730?mt=8';
  }

  if (operatingSystem === 'Android') {
    walletName = 'Coinbase Wallet';
    walletLink =
      'https://play.google.com/store/apps/details?id=com.coinbase.android';
  }

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
        <Modal.Description>
          In order to use
          <Text weight="fontWeight-bold" inline>
            {' '}
            bounties.network
          </Text>
          , please install a secure wallet such as
          <Text link src={walletLink}>
            {' '}
            {walletName}.{' '}
          </Text>
          If you&#39;d like help getting set up, take a look at our{' '}
          <Text link src="https://bounties.network/gettingStarted">
            Getting Started Guide.
          </Text>
        </Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        {closable && (
          <Button margin onClick={onClose}>
            Cancel
          </Button>
        )}
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

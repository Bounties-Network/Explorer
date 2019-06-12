import React from 'react';
import PropTypes from 'prop-types';
import { getMobileOperatingSystem } from 'utils/helpers';
import { Modal, Text, Button } from 'components';

const WalletRequired = props => {
  const { visible, onClose, choosePortisProvider, closable } = props;

  const operatingSystem = getMobileOperatingSystem();
  let walletName = 'MetaMask';
  let walletLink = 'https://metamask.io';

  if (operatingSystem === 'iOS') {
    walletName = 'Coinbase Wallet';
    walletLink =
      'https://itunes.apple.com/us/app/coinbase-wallet/id1278383455?mt=8';
  }

  if (operatingSystem === 'Android') {
    walletName = 'Status Wallet';
    walletLink =
      'https://play.google.com/store/apps/details?id=im.status.ethereum';
  }

  return (
    <Modal
      visible={visible}
      size="small"
      dismissable={closable}
      onClose={onClose}
      closable={closable}
    >
      <Modal.Header closable icon="wallet">
        <Modal.Message>
          Web3 enabled browser or secure wallet required.
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
            {walletName},{' '}
          </Text>
          or use
          <Text link src="https://portis.io">
            {' '}
            Portis,{' '}
          </Text>
          a secure cloud hosted wallet. If you&#39;d like help getting set up,
          take a look at our{' '}
          <Text link src="https://bounties.network/gettingStarted">
            Getting Started Guide.
          </Text>
        </Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        <Button margin onClick={onClose}>
          Visit {walletName}
        </Button>
        <Button type="primary" onClick={choosePortisProvider}>
          Use Portis
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

WalletRequired.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  choosePortisProvider: PropTypes.func,
  closable: PropTypes.bool
};

WalletRequired.defaultProps = {
  closable: true
};

export default WalletRequired;

import React from 'react';
import PropTypes from 'prop-types';
import { getMobileOperatingSystem } from 'utils/helpers';
import { Modal, Text, Button } from 'components';
import intl from 'react-intl-universal';

const WalletRequired = props => {
  const { visible, onClose, closable } = props;

  const operatingSystem = getMobileOperatingSystem();
  let walletName = 'MetaMask';
  let walletLink = 'https://metamask.io';

  if (operatingSystem === 'iOS') {
    walletName = 'Trust Wallet';
    walletLink =
      'https://apps.apple.com/app/trust-ethereum-wallet/id1288339409';
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
          {intl.get('sections.login.modals.wallet_required.title')}
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          {intl.get('sections.login.modals.wallet_required.description1')}
          <Text weight="fontWeight-bold" inline>
            {' '}
            bounties.network
          </Text>
          {intl.get('sections.login.modals.wallet_required.description2')}
          <Text link src={walletLink}>
            {' '}
            {walletName}.{' '}
          </Text>
          {intl.get('sections.login.modals.wallet_required.description3')}
          <Text link src="https://bounties.network/gettingStarted">
            {intl.get('sections.login.modals.wallet_required.guide')}
          </Text>
        </Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        {closable && (
          <Button margin onClick={onClose}>
            {intl.get('actions.cancel')}
          </Button>
        )}
        <a href={walletLink} target="_blank">
          <Button type="primary">
            {intl.get('sections.login.modals.wallet_required.actions.visit', {
              walletName
            })}
          </Button>
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

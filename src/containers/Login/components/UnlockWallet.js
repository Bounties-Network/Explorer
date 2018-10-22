import React from 'react';
import PropTypes from 'prop-types';
import config from 'public-modules/config';
import { Modal, Text, Button } from 'components';

const UnlockWallet = props => {
  const { visible, onClose, pageLevel, closable } = props;

  return (
    <Modal
      visible={visible}
      size="small"
      dismissable={closable}
      onClose={onClose}
      closable={closable}
      fixed={!pageLevel}
    >
      <Modal.Header closable={closable} icon={['fal', 'unlock']}>
        <Modal.Message>Secure Wallet Access</Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          You&#39;ll need to log in and/or grant access to your secure wallet
          (e.g.
          <Text weight="fontWeight-bold" inline>
            {' '}
            MetaMask
          </Text>
          ) in order to use {pageLevel ? 'parts of ' : ''}
          {config.networkName}
        </Modal.Description>
      </Modal.Body>
      {closable && (
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

UnlockWallet.proptypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  pageLevel: PropTypes.bool,
  closable: PropTypes.bool
};

UnlockWallet.defaultProps = {
  closable: true
};

export default UnlockWallet;

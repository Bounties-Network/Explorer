import React from 'react';
import PropTypes from 'prop-types';
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
    >
      <Modal.Header closable={closable} icon={['fal', 'unlock']}>
        <Modal.Message>Please unlock your secure wallet</Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          You&#39;ll need to log in to your secure wallet account (e.g.
          <Text weight="fontWeight-bold" inline>
            {' '}
            MetaMask
          </Text>
          ) in order to access {pageLevel ? 'parts of the ' : ''}the Bounties
          Network.
        </Modal.Description>
      </Modal.Body>
      {closable ? (
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      ) : null}
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

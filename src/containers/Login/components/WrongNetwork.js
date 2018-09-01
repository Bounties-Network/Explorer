import React from 'react';
import PropTypes from 'prop-types';
import config from 'public-modules/config';
import { Modal, Text, Button } from 'components';

const WrongNetwork = props => {
  const { visible, onClose, pageLevel, closable, currentNetwork } = props;

  return (
    <Modal
      visible={visible}
      size="small"
      dismissable={closable}
      onClose={onClose}
      closable={closable}
    >
      <Modal.Header closable={closable} icon={['fal', 'unlock']}>
        <Modal.Message>
          Update wallet network to{' '}
          {config.requiredNetwork
            ? config.requiredNetwork
            : 'rinkeby or mainnet'}
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          You&#39;ll need to update your wallet network in order to access{' '}
          {pageLevel ? 'parts of the ' : ''}the Bounties Network.
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

WrongNetwork.proptypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  pageLevel: PropTypes.bool,
  closable: PropTypes.bool
};

WrongNetwork.defaultProps = {
  closable: true
};

export default WrongNetwork;

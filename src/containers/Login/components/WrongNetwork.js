import React from 'react';
import PropTypes from 'prop-types';
import config from 'public-modules/config';
import { Modal, Text, Button } from 'components';

const WrongNetwork = props => {
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
      <Modal.Header closable={closable} icon={['fal', 'wifi']}>
        <Modal.Message>Foreign network detected</Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          {config.networkName} is currently operational on
          {config.requiredNetwork ? (
            <Text weight="fontWeight-bold" inline>
              {' '}
              {config.requiredNetwork}.
            </Text>
          ) : (
            <div>
              <Text weight="fontWeight-bold" inline>
                {' '}
                Rinkeby
              </Text>{' '}
              and
              <Text weight="fontWeight-bold" inline>
                {' '}
                Mainnet.
              </Text>
            </div>
          )}
          <br />
          Please switch your active wallet network.
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

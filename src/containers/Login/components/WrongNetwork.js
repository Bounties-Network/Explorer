import React from 'react';
import PropTypes from 'prop-types';
import config from 'public-modules/config';
import { Modal, Text, Button } from 'components';
import intl from 'react-intl-universal';

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
        <Modal.Message>
          {intl.get('sections.login.modals.wrong_network.title')}
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          {intl.get('sections.login.modals.wrong_network.description1', {
            networkName: config.networkName
          })}
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
              {intl.get('common.and')}
              <Text weight="fontWeight-bold" inline>
                {' '}
                Mainnet.
              </Text>
            </div>
          )}
          <br />
          {intl.get('sections.login.modals.wrong_network.description2')}
        </Modal.Description>
      </Modal.Body>
      {closable && (
        <Modal.Footer>
          <Button onClick={onClose}>{intl.get('actions.close')}</Button>
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

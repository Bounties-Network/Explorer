import React from 'react';
import PropTypes from 'prop-types';
import config from 'public-modules/config';
import { Modal, Text, Button } from 'components';
import intl from 'react-intl-universal';

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
        <Modal.Message>
          {intl.get('sections.login.modals.unlock.title')}
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          {intl.getHTML('sections.login.modals.unlock.description1')}
          <Text weight="fontWeight-bold" inline>
            {' '}
            MetaMask
          </Text>
          {intl.get('sections.login.modals.unlock.description2', {
            pageLevel,
            networkName: config.networkName
          })}
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

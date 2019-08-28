import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, Button, Avatar } from 'components';
import { shortenAddress } from 'utils/helpers';
import styles from './baseStyles.module.scss';
import intl from 'react-intl-universal';

const AddressMismatch = props => {
  const {
    visible,
    closable,
    img,
    currentAddress,
    previousAddress,
    onClose,
    logout,
    loggingOut,
    pageLevel
  } = props;

  return (
    <Modal
      visible={visible}
      size="medium"
      dismissable={closable}
      closable={closable}
      onClose={onClose}
      fixed={!pageLevel}
    >
      <Modal.Header closable={closable} icon="address">
        <Modal.Heading>
          {intl.get('sections.login.modals.address_mismatch.title')}
        </Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          <Text inline>
            {intl.get('sections.login.modals.address_mismatch.description1')}
          </Text>
          <Text inline weight="fontWeight-bold">
            {intl.get('sections.login.modals.address_mismatch.description2')}
          </Text>
          <Text inline>
            {intl.get('sections.login.modals.address_mismatch.description3')}
          </Text>
          <div>
            <Avatar
              className={styles.avatar}
              variant="small"
              img={img}
              hash={previousAddress}
              address={previousAddress}
            />
          </div>
          <Text inline>
            {intl.get('sections.login.modals.address_mismatch.description4')}
          </Text>
          <Text inline weight="fontWeight-bold" color="black">
            {' '}
            {shortenAddress(currentAddress)}
          </Text>
          <Text inline>
            {intl.get('sections.login.modals.address_mismatch.description5')}
          </Text>
        </Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        <Button type="primary" onClick={logout} loading={loggingOut}>
          {intl.get('actions.logout')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddressMismatch.propTypes = {
  closable: PropTypes.bool,
  visible: PropTypes.bool,
  img: PropTypes.string,
  currentAddress: PropTypes.string,
  previousAddress: PropTypes.string,
  onClose: PropTypes.func,
  logout: PropTypes.func,
  loggingOut: PropTypes.bool
};

AddressMismatch.defaultProps = {
  closable: true
};

export default AddressMismatch;

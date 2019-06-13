import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Text } from 'components';
import intl from 'react-intl-universal';

const ErrorModal = props => {
  const { visible, onClose } = props;

  return (
    <Modal visible={visible} size="small" dismissable onClose={onClose}>
      <Modal.Header closable icon="error" />
      <Modal.Body>
        <Text
          typeScale="h4"
          color="black"
          weight="fontWeight-medium"
          alignment="align-center"
        >
          {intl.get('sections.login.modals.error.title')}
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>{intl.get('actions.close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

ErrorModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default ErrorModal;

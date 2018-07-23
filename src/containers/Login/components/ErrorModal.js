import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ZeroState, Button } from 'components';

const ErrorModal = props => {
  const { visible, onClose } = props;

  return (
    <Modal visible={visible} size="small" dismissable onClose={onClose}>
      <Modal.Header closable icon={['far', 'exclamation-triangle']}>
        <Modal.Message>Something happened. Try again later.</Modal.Message>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

ErrorModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default ErrorModal;

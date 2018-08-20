import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components';

const SigningIn = props => {
  const { visible } = props;

  return (
    <Modal visible={visible} size="small">
      <Modal.Header loadingIcon>
        <Modal.Message>
          Complete signature request to verify your address and sign in
        </Modal.Message>
      </Modal.Header>
    </Modal>
  );
};

SigningIn.propTypes = {
  visible: PropTypes.bool
};

export default SigningIn;

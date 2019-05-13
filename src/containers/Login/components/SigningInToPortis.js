import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components';

const SigningInToPortis = props => {
  const { visible } = props;

  return (
    <Modal visible={visible} size="small">
      <Modal.Header loadingIcon>
        <Modal.Message>Sign in to your Portis account</Modal.Message>
      </Modal.Header>
    </Modal>
  );
};

SigningInToPortis.propTypes = {
  visible: PropTypes.bool
};

export default SigningInToPortis;

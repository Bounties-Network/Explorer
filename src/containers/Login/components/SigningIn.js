import React from 'react';
import { Modal, Text, Button } from 'components';

const SigningIn = props => {
  return (
    <Modal visible size="small">
      <Modal.Header closable loadingIcon>
        <Modal.Heading>
          Complete signature request to verify your address and sign in.
        </Modal.Heading>
      </Modal.Header>
    </Modal>
  );
};

export default SigningIn;

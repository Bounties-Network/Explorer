import React from 'react';
import { Modal, Text, Button } from 'components';

const SignIn = props => {
  return (
    <Modal visible size="small">
      <Modal.Header closable icon={['fal', 'wallet']}>
        <Modal.Heading>Sign in and verify address</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Text>
          After clicking "Continue", a wallet dialogue will prompt you to verify
          your unique address. Once you verify, you'll be signed in to the
          network.
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button type="primary">Continue</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignIn;

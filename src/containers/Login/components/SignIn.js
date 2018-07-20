import React from 'react';
import { Modal, Text, Button } from 'components';

const SignIn = props => {
  const { visible, onClose, signIn } = props;

  return (
    <Modal visible={visible} size="small" dismissable onClose={onClose}>
      <Modal.Header closable icon={['fal', 'sign-in']}>
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
        <Button type="primary" onClick={signIn}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignIn;

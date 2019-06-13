import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'components';
import intl from 'react-intl-universal';

const SignIn = props => {
  const { visible, onClose, signIn } = props;

  return (
    <Modal visible={visible} size="small" dismissable onClose={onClose}>
      <Modal.Header closable icon="signIn">
        <Modal.Message>
          {intl.get('sections.login.modals.sign_in.title')}
        </Modal.Message>
      </Modal.Header>
      <Modal.Body>
        <Modal.Description>
          {intl.get('sections.login.modals.sign_in.description')}
        </Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        <Button type="primary" onClick={signIn}>
          {intl.get('actions.continue')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SignIn.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  signIn: PropTypes.func
};

export default SignIn;

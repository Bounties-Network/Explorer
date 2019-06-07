import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components';
import intl from 'react-intl-universal';

const SigningIn = props => {
  const { visible } = props;

  return (
    <Modal visible={visible} size="small">
      <Modal.Header loadingIcon>
        <Modal.Message>
          {intl.get('sections.login.modals.signing_in.title')}
        </Modal.Message>
      </Modal.Header>
    </Modal>
  );
};

SigningIn.propTypes = {
  visible: PropTypes.bool
};

export default SigningIn;

import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const KillBountyFormModal = props => {
  const { onClose, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={true}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>
            Are you sure you want to kill your bounty?
          </Modal.Message>
          <Modal.Description>
            If you change your mind, you can always re-activate it.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody} />
        <Modal.Footer>
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="destructive">Kill</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'killBounty' })(KillBountyFormModal);

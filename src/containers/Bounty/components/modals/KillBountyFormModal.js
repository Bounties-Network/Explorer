import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { reduxForm } from 'redux-form';

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
            Are you sure you want to de-activate your bounty?
          </Modal.Message>
          <Modal.Description>
            If you change your mind, you can always re-activate it again later.
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
          <Button type="destructive">De-activate</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'killBounty' })(KillBountyFormModal);

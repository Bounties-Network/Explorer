import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { FormTextInput } from 'form-components';
import validators from 'utils/validators';

const TransferOwnershipFormModal = props => {
  const { onClose, handleSubmit, visible } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={visible}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>Transfer Ownership</Modal.Message>
          <Modal.Description>
            Include the wallet address of who you would like to transfer the
            bounty to.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="newOwner"
            component={FormTextInput}
            validate={[validators.required, validators.isWeb3Address]}
            placeholder="Enter wallet address..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
            buttonType="button"
          >
            Cancel
          </Button>
          <Button type="action">Transfer Ownership</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'transferOwnership' })(
  TransferOwnershipFormModal
);

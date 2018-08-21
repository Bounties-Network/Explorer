import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const ActivateDraftFormModal = props => {
  const { onClose, minimumBalance, handleSubmit } = props;

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
          <Modal.Message>Activate your bounty</Modal.Message>
          <Modal.Description>
            Indicate an amount for your initial deposit to activate the bounty.
            At minimum, your initial deposit must match your payout amount.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="balance"
            component={FormTextInput}
            type="number"
            min="0"
            step=".00001"
            label="Deposit amount (ETH or whole tokens)"
            validate={[
              validators.required,
              balance => {
                if (Number(balance) < Number(minimumBalance)) {
                  return 'Deposit amount must at least match the payout amount.';
                }
              }
            ]}
            placeholder="Enter amount..."
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
          <Button type="action">Activate</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'activateDraft' })(ActivateDraftFormModal);

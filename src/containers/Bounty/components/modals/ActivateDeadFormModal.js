import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { BigNumber } from 'bignumber.js';
import validators from 'utils/validators';
import normalizers from 'utils/normalizers';
import { FormTextInput } from 'form-components';

const ActivateDeadFormModal = props => {
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
          <Modal.Message>Re-Activate your bounty</Modal.Message>
          <Modal.Description>
            Indicate an amount for your deposit to activate the bounty. At
            minimum, your deposit must match the payout amount.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="balance"
            component={FormTextInput}
            label="Deposit amount (ETH or whole tokens)"
            normalize={normalizers.number}
            validate={[
              validators.required,
              balance => {
                if (BigNumber(balance, 10).isLessThan(minimumBalance)) {
                  return 'At minimum, your initial deposit must match your payout amount.';
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
          <Button type="action">Re-Activate</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'activateDead' })(ActivateDeadFormModal);

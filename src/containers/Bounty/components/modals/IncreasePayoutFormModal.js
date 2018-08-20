import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const IncreasePayoutFormModal = props => {
  const { onClose, minimumBalance, minimumPayout, handleSubmit } = props;

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
          <Modal.Message>Increase bounty payout</Modal.Message>
          <Modal.Description>
            Indicate the amount you would like to increase the payout to. You
            may include an additional balance to cover the costs. Your total
            balance must be greater than the new prize amount.
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
              (balance, values) => {
                if (
                  Number(values.fulfillmentAmount || 0) >
                  Number(minimumBalance) + Number(balance || 0)
                ) {
                  return 'The balance of your bounty must be greater than the payout amount.';
                }
              }
            ]}
            placeholder="Enter amount..."
          />
          <div className={styles.inputGroup}>
            <Field
              name="fulfillmentAmount"
              component={FormTextInput}
              type="number"
              min="0"
              step=".00001"
              label="New prize amount (ETH or whole tokens)"
              validate={[
                validators.required,
                (fulfillmentAmount, values) => {
                  if (
                    Number(minimumPayout || 0) >
                    Number(values.fulfillmentAmount || 0)
                  ) {
                    return 'Your payout amount must be greater than the previous payout amount.';
                  }
                }
              ]}
              placeholder="Enter amount..."
            />
          </div>
        </Modal.Body>
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
          <Button type="action">Increase Payout</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'increasePayout' })(IncreasePayoutFormModal);

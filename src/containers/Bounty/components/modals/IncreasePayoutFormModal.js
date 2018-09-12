import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import { BigNumber } from 'bignumber.js';
import { compose } from 'redux';
import { ModalFormReset } from 'hocs';
import normalizers from 'utils/normalizers';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const IncreasePayoutFormModal = props => {
  const {
    onClose,
    minimumBalance,
    minimumPayout,
    handleSubmit,
    tokenSymbol,
    visible
  } = props;

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
          <Modal.Message>Increase bounty payout</Modal.Message>
          <Modal.Description>
            Indicate the amount you would like to increase the payout to. You
            may include an additional balance to cover the costs.
            <br />
            <br />
            <em>
              Your total balance must be greater than the new prize amount ({
                tokenSymbol
              })
            </em>. The current balance is:{' '}
            <span
              className={styles.textHighlight}
            >{`${minimumBalance} ${tokenSymbol}`}</span>. The current payout
            amount is:{' '}
            <span
              className={styles.textHighlight}
            >{`${minimumPayout} ${tokenSymbol}`}</span>.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="balance"
            component={FormTextInput}
            label={`Deposit amount (${tokenSymbol})`}
            normalize={normalizers.number}
            validate={[
              validators.minOrEqualsValue(0),
              (balance, values) => {
                if (
                  BigNumber(values.fulfillmentAmount || 0, 10).isGreaterThan(
                    BigNumber(minimumBalance, 10).plus(
                      BigNumber(balance || 0, 10)
                    )
                  )
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
              label={`New prize amount (${tokenSymbol})`}
              normalize={normalizers.number}
              validate={[
                validators.required,
                validators.minValue(0),
                (fulfillmentAmount, values) => {
                  if (
                    BigNumber(minimumPayout || 0).isGreaterThanOrEqualTo(
                      BigNumber(values.fulfillmentAmount || 0, 10)
                    )
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
            buttonType="button"
          >
            Cancel
          </Button>
          <Button type="action">Increase Payout</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default compose(
  reduxForm({
    form: 'increasePayout',
    destroyOnUnmount: false
  }),
  ModalFormReset
)(IncreasePayoutFormModal);

import React from 'react';
import styles from './Modals.module.scss';
import { Button, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import { BigNumber } from 'bignumber.js';
import { compose } from 'redux';
import { ModalFormReset } from 'hocs';
import normalizers from 'utils/normalizers';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';
import asyncValidators from 'utils/asyncValidators';

class IncreasePayoutFormModal extends React.Component {
  validatorGroups = {
    balance: [
      validators.minOrEqualsValue(0),
      validators.maxDecimals(this.props.tokenDecimals),
      (balance, values) => {
        if (
          BigNumber(values.fulfillment_amount || 0, 10).isGreaterThan(
            BigNumber(this.props.minimumBalance, 10).plus(
              BigNumber(balance || 0, 10)
            )
          )
        ) {
          return 'The balance of your bounty must be greater than the payout amount.';
        }
      }
    ],
    fulfillment_amount: [
      validators.required,
      validators.maxDecimals(this.props.tokenDecimals),
      validators.minValue(0),
      (fulfillment_amount, values) => {
        if (
          BigNumber(this.minimumPayout || 0).isGreaterThanOrEqualTo(
            BigNumber(values.fulfillment_amount || 0, 10)
          )
        ) {
          return 'Your payout amount must be greater than the previous payout amount.';
        }
      }
    ]
  };

  render() {
    const {
      onClose,
      minimumBalance,
      minimumPayout,
      handleSubmit,
      tokenSymbol,
      visible,
      submitFailed,
      invalid,
      asyncValidating,
      contract_version
    } = this.props;
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
              Indicate the amount you would like to increase the payout to.
              {contract_version == 1 &&
                'You may include an additional balance to cover the costs.'}
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
              validate={this.validatorGroups.balance}
              placeholder="Enter amount..."
            />
            <div className={styles.inputGroup}>
              <Field
                name="fulfillment_amount"
                component={FormTextInput}
                label={`New prize amount (${tokenSymbol})`}
                normalize={normalizers.number}
                validate={this.validatorGroups.fulfillment_amount}
                placeholder="Enter amount..."
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            {submitFailed &&
              invalid && (
                <Text inputLabel color="red">
                  Fix errors before submitting.
                </Text>
              )}
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
            <Button
              type="action"
              disabled={submitFailed && invalid}
              loading={asyncValidating && typeof asyncValidating === 'boolean'}
            >
              Increase Payout
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

export default compose(
  reduxForm({
    form: 'increasePayout',
    destroyOnUnmount: false,
    asyncValidate: (values, dispatch, props, field) => {
      return asyncValidators.tokenValidationWrapper(
        { ...values, tokenContract: props.tokenContract },
        'balance',
        'tokenContract',
        props.asyncValidating,
        field,
        dispatch
      );
    },
    asyncChangeFields: ['balance']
  }),
  ModalFormReset
)(IncreasePayoutFormModal);

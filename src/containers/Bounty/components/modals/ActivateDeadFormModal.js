import React from 'react';
import styles from './Modals.module.scss';
import { Button, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { BigNumber } from 'bignumber.js';
import { ModalFormReset } from 'hocs';
import validators from 'utils/validators';
import normalizers from 'utils/normalizers';
import { FormTextInput } from 'form-components';
import asyncValidators from 'utils/asyncValidators';

class ActivateDeadFormModal extends React.Component {
  fieldValidators = [
    validators.required,
    validators.maxDecimals(this.props.tokenDecimals),
    balance => {
      if (BigNumber(balance, 10).isLessThan(this.props.minimumBalance)) {
        return 'At minimum, your initial deposit must match your payout amount.';
      }
    }
  ];

  render() {
    const {
      onClose,
      minimumBalance,
      handleSubmit,
      token_symbol,
      visible,
      submitFailed,
      invalid,
      asyncValidating
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
            <Modal.Message>Re-Activate your bounty</Modal.Message>
            <Modal.Description>
              Indicate an amount for your deposit to activate the bounty. At
              minimum, your deposit must match the payout amount{' '}
              {`(${minimumBalance} ${token_symbol}).`}
            </Modal.Description>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <Field
              name="balance"
              component={FormTextInput}
              label={`Deposit amount in ${token_symbol}`}
              normalize={normalizers.number}
              validate={this.fieldValidators}
              placeholder="Enter amount..."
            />
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
              Re-Activate
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

export default compose(
  reduxForm({
    form: 'activateDead',
    destroyOnUnmount: false,
    asyncValidate: (values, dispatch, props, field) => {
      return asyncValidators.tokenValidationWrapper(
        { ...values, token_contract: props.token_contract },
        'balance',
        'token_contract',
        true,
        props.asyncValidating,
        field,
        dispatch
      );
    },
    asyncChangeFields: ['balance']
  }),
  ModalFormReset
)(ActivateDeadFormModal);

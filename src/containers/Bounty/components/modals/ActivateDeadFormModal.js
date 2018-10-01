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

const ActivateDeadFormModal = props => {
  const {
    onClose,
    minimumBalance,
    handleSubmit,
    tokenSymbol,
    visible,
    submitFailed,
    invalid,
    asyncValidating
  } = props;

  const fieldValidators = [
    validators.required,
    balance => {
      if (BigNumber(balance, 10).isLessThan(minimumBalance)) {
        return 'At minimum, your initial deposit must match your payout amount.';
      }
    }
  ];

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
            {`(${minimumBalance} ${tokenSymbol}).`}
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="balance"
            component={FormTextInput}
            label={`Deposit amount in ${tokenSymbol}`}
            normalize={normalizers.number}
            validate={fieldValidators}
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
};

export default compose(
  reduxForm({
    form: 'activateDead',
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
)(ActivateDeadFormModal);

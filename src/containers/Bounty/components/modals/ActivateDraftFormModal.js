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

class ActivateDraftFormModal extends React.Component {
  fieldValidators = [
    validators.required,
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
      tokenSymbol,
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
            <Modal.Message>Activate your bounty</Modal.Message>
            <Modal.Description>
              Indicate an amount for your initial deposit to activate the
              bounty.
              <em>
                {' '}
                At minimum, your initial deposit must match your payout amount
                of
              </em>{' '}
              <strong
                className={styles.textHighlight}
              >{`${minimumBalance} ${tokenSymbol}.`}</strong>
            </Modal.Description>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <Field
              name="balance"
              component={FormTextInput}
              label={`Deposit amount (${tokenSymbol}).`}
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
              Activate
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

export default compose(
  reduxForm({
    form: 'activateDraft',
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
)(ActivateDraftFormModal);

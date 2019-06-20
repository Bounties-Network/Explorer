import React from 'react';
import styles from './Modals.module.scss';
import { Button, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { ModalFormReset } from 'hocs';
import validators from 'utils/validators';
import normalizers from 'utils/normalizers';
import { FormTextInput } from 'form-components';
import asyncValidators from 'utils/asyncValidators';

const ContributeFormModal = props => {
  const {
    onClose,
    handleSubmit,
    token_symbol,
    tokenDecimals,
    visible,
    submitFailed,
    invalid,
    asyncValidating,
    belongsToLoggedInUser
  } = props;

  const fieldValidators = [
    validators.required,
    validators.minValue(0),
    validators.maxDecimals(tokenDecimals)
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
        {!belongsToLoggedInUser && (
          <Modal.Header closable={true}>
            <Modal.Message>Contribute to the bounty</Modal.Message>
            <Modal.Description>
              Indicate the amount you would like to contribute towards the
              bounty ({token_symbol}).
            </Modal.Description>
          </Modal.Header>
        )}
        {belongsToLoggedInUser && (
          <Modal.Header closable={true}>
            <Modal.Message>Increase the balance</Modal.Message>
            <Modal.Description>
              Indicate the amount you would like to add to the bounty ({
                token_symbol
              }).
            </Modal.Description>
          </Modal.Header>
        )}
        <Modal.Body className={styles.modalBody}>
          <Field
            name="contribution"
            component={FormTextInput}
            normalize={normalizers.number}
            label={`Deposit amount ${token_symbol}`}
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
            Contribute
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default compose(
  reduxForm({
    form: 'bountyContribute',
    destroyOnUnmount: false,
    asyncValidate: (values, dispatch, props, field) => {
      return asyncValidators.tokenValidationWrapper(
        { ...values, token_contract: props.token_contract },
        'contribution',
        'token_contract',
        true,
        props.asyncValidating,
        field,
        dispatch
      );
    },
    shouldAsyncValidate: params => {
      const { pristine, initialized } = params;
      return !pristine || !initialized;
    },
    asyncChangeFields: ['contribution']
  }),
  ModalFormReset
)(ContributeFormModal);

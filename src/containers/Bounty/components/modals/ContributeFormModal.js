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
    tokenSymbol,
    visible,
    submitFailed,
    invalid
  } = props;

  const fieldValidators = [validators.required, validators.minValue(0)];

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
          <Modal.Message>Contribute to the bounty</Modal.Message>
          <Modal.Description>
            Indicate the amount you would like to contribute towards the bounty
            ({tokenSymbol}).
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="contribution"
            component={FormTextInput}
            normalize={normalizers.number}
            label={`Deposit amount ${tokenSymbol}`}
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
          <Button type="action" disabled={invalid}>
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
      console.log(props);
      return asyncValidators.tokenValidationWrapper(
        { ...values, tokenContract: props.tokenContract },
        'contribution',
        'tokenContract',
        props.asyncValidating,
        field,
        dispatch
      );
    },
    asyncChangeFields: ['contribution']
  }),
  ModalFormReset
)(ContributeFormModal);

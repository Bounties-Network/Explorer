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
import intl from 'react-intl-universal';

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
        dismissable={false}
        onClose={onClose}
        visible={visible}
        fixed
        size="small"
      >
        {!belongsToLoggedInUser && (
          <Modal.Header closable={true}>
            <Modal.Message>
              {intl.get('sections.bounty.modals.contribute.title')}
            </Modal.Message>
            <Modal.Description>
              {intl.get('sections.bounty.modals.contribute.description', {
                token_symbol
              })}
            </Modal.Description>
          </Modal.Header>
        )}
        {belongsToLoggedInUser && (
          <Modal.Header closable={true}>
            <Modal.Message>
              {intl.get('sections.bounty.modals.contribute.title_issuer')}
            </Modal.Message>
            <Modal.Description>
              {intl.get(
                'sections.bounty.modals.contribute.description_issuer',
                {
                  token_symbol
                }
              )}
            </Modal.Description>
          </Modal.Header>
        )}
        <Modal.Body className={styles.modalBody}>
          <Field
            name="contribution"
            component={FormTextInput}
            normalize={normalizers.number}
            label={intl.get(
              'sections.bounty.modals.contribute.form.contribution.label',
              { token_symbol }
            )}
            validate={fieldValidators}
            placeholder={intl.get(
              'sections.bounty.modals.contribute.form.contribution.placeholder'
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          {submitFailed &&
            invalid && (
              <Text
                typeScale="Small"
                color="red"
                className={styles.modalSubmitError}
              >
                {intl.get('errors.form_error')}
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
            {intl.get('actions.cancel')}
          </Button>
          <Button
            type="action"
            disabled={submitFailed && invalid}
            loading={asyncValidating && typeof asyncValidating === 'boolean'}
          >
            {intl.get('actions.contribute')}
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

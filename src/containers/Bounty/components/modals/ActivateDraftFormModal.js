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
import intl from 'react-intl-universal';

class ActivateDraftFormModal extends React.Component {
  fieldValidators = [
    validators.required,
    validators.maxDecimals(this.props.tokenDecimals),
    balance => {
      if (BigNumber(balance, 10).isLessThan(this.props.minimumBalance)) {
        return intl.get(
          'sections.bounty.modals.activate_draft_form.min_deposit_warning'
        );
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
            <Modal.Message>Activate your bounty</Modal.Message>
            <Modal.Description>
              {intl.getHTML(
                'sections.bounty.modals.activate_draft_form.description',
                {
                  textHighlightClass: styles.textHighlight,
                  minimumBalance,
                  token_symbol
                }
              )}
            </Modal.Description>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <Field
              name="balance"
              component={FormTextInput}
              label={intl.get(
                'sections.bounty.modals.activate_draft_form.form.balance.label',
                { token_symbol }
              )}
              normalize={normalizers.number}
              validate={this.fieldValidators}
              placeholder={intl.get(
                'sections.bounty.modals.activate_draft_form.form.balance.placeholder'
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            {submitFailed &&
              invalid && (
                <Text inputLabel color="red">
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
              {intl.get('actions.activate')}
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
)(ActivateDraftFormModal);

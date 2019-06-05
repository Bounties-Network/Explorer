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
import intl from 'react-intl-universal';

class ActivateDeadFormModal extends React.Component {
  fieldValidators = [
    validators.required,
    validators.maxDecimals(this.props.tokenDecimals),
    balance => {
      if (BigNumber(balance, 10).isLessThan(this.props.minimumBalance)) {
        return intl.get(
          'sections.bounty.modals.activate_dead_form.min_deposit_warning'
        );
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
            <Modal.Message>
              {intl.get('sections.bounty.modals.activate_dead_form.title')}
            </Modal.Message>
            <Modal.Description>
              {intl.get(
                'sections.bounty.modals.activate_dead_form.description',
                { minimumBalance, tokenSymbol }
              )}
            </Modal.Description>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <Field
              name="balance"
              component={FormTextInput}
              label={intl.get(
                'sections.bounty.modals.activate_dead_form.form.balance.label',
                { tokenSymbol }
              )}
              normalize={normalizers.number}
              validate={this.fieldValidators}
              placeholder={intl.get(
                'sections.bounty.modals.activate_dead_form.form.balance.placeholder'
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            {submitFailed &&
              invalid && (
                <Text inputLabel color="red">
                  {intl.get('actions.errors.form_error')}
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
              {intl.get('actions.re_activate')}
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

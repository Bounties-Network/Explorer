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
          return intl.get(
            'sections.bounty.modals.increase_payout.balance_warning'
          );
        }
      }
    ],
    fulfillment_amount: [
      validators.required,
      validators.maxDecimals(this.props.tokenDecimals),
      validators.minValue(0),
      (fulfillment_amount, values) => {
        if (
          BigNumber(this.props.minimumPayout || 0).isGreaterThanOrEqualTo(
            BigNumber(values.fulfillment_amount || 0, 10)
          )
        ) {
          return intl.get(
            'sections.bounty.modals.increase_payout.payout_warning'
          );
        }
      },
      (fulfillment_amount, values) => {
        if (
          typeof this.props.contract_version === 'string' && 
          this.props.contract_version.split('.')[0] === '2' &&
          BigNumber(values.fulfillment_amount || 0, 10).isGreaterThan(
            BigNumber(this.props.minimumBalance, 10)
          )
        ) {
          return 'The balance of your bounty must be greater than the payout amount.';
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
      token_symbol,
      visible,
      submitFailed,
      invalid,
      asyncValidating,
      contract_version
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Modal
          dismissable={false}
          onClose={onClose}
          visible={visible}
          fixed
          size="small"
        >
          <Modal.Header closable={true}>
            <Modal.Message>
              {intl.get('sections.bounty.modals.increase_payout.title')}
            </Modal.Message>
            <Modal.Description>
              {contract_version === '1' &&
                intl.getHTML(
                  'sections.bounty.modals.increase_payout.description1',
                  {
                    token_symbol,
                    minimumBalance,
                    minimumPayout,
                    textHighlightClass: styles.textHighlight
                  }
                )}
              {typeof contract_version === 'string' && contract_version.split('.')[0] ===
                '2' &&
                intl.getHTML(
                  'sections.bounty.modals.increase_payout.description2',
                  {
                    token_symbol,
                    minimumBalance,
                    minimumPayout,
                    textHighlightClass: styles.textHighlight
                  }
                )}
            </Modal.Description>
          </Modal.Header>

          <Modal.Body className={styles.modalBody}>
            {contract_version === '1' && (
              <Field
                name="balance"
                component={FormTextInput}
                label={intl.get(
                  'sections.bounty.modals.increase_payout.form.balance.label',
                  { token_symbol }
                )}
                normalize={normalizers.number}
                validate={this.validatorGroups.balance}
                placeholder={intl.get(
                  'sections.bounty.modals.increase_payout.form.balance.placeholder'
                )}
              />
            )}
            <div className={styles.inputGroup}>
              <Field
                name="fulfillment_amount"
                component={FormTextInput}
                label={intl.get(
                  'sections.bounty.modals.increase_payout.form.fullfillment_amount.label',
                  { token_symbol }
                )}
                normalize={normalizers.number}
                validate={this.validatorGroups.fulfillment_amount}
                placeholder={intl.get(
                  'sections.bounty.modals.increase_payout.form.fullfillment_amount.placeholder'
                )}
              />
            </div>
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
              {intl.get('actions.increase_payout')}
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
)(IncreasePayoutFormModal);

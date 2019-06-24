import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button, Text } from 'components';
import { Field, reduxForm, Form } from 'redux-form';
import { compose } from 'redux';
import { ModalFormReset } from 'hocs';
import { FormTextInput } from 'form-components';
import validators from 'utils/validators';
import intl from 'react-intl-universal';

const TransferOwnershipFormModal = props => {
  const { onClose, handleSubmit, visible, submitFailed, invalid } = props;

  const fieldValidators = [validators.required, validators.isWeb3Address];

  return (
    <Form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={visible}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>
            {intl.get('sections.bounty.modals.transfer_ownership.title')}
          </Modal.Message>
          <Modal.Description>
            {intl.get('sections.bounty.modals.transfer_ownership.description')}
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="newOwner"
            component={FormTextInput}
            validate={fieldValidators}
            placeholder={intl.get(
              'sections.bounty.modals.transfer_ownership.form.new_owner.placeholder'
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
          <Button type="action">
            {intl.get('actions.transfer_ownership')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default compose(
  reduxForm({
    form: 'transferOwnership',
    destroyOnUnmount: false
  }),
  ModalFormReset
)(TransferOwnershipFormModal);

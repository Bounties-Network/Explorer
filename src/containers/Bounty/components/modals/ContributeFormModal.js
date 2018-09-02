import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { ModalFormReset } from 'hocs';
import validators from 'utils/validators';
import normalizers from 'utils/normalizers';
import { FormTextInput } from 'form-components';

const ContributeFormModal = props => {
  const { onClose, handleSubmit, tokenSymbol, visible } = props;

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
            validate={[validators.required, validators.minValue(0)]}
            placeholder="Enter amount..."
          />
        </Modal.Body>
        <Modal.Footer>
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
          <Button type="action">Contribute</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default compose(
  reduxForm({
    form: 'bountyContribute',
    destroyOnUnmount: false
  }),
  ModalFormReset
)(ContributeFormModal);

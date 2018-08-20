import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const ContributeFormModal = props => {
  const { onClose, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={true}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>Contribute to the bounty</Modal.Message>
          <Modal.Description>
            Indicate the amount you would like to contribute towards the bounty.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="contribution"
            component={FormTextInput}
            type="number"
            min="0"
            step=".00001"
            label="Deposit amount (ETH or whole tokens)"
            validate={[validators.required]}
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
          >
            Cancel
          </Button>
          <Button type="action">Contribute</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'bountyContribute' })(ContributeFormModal);

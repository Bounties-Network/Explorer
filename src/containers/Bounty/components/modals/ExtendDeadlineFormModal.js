import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { FormDatePicker } from 'form-components';

const ExtendDeadlineFormModal = props => {
  const { onClose, handleSubmit, minimumDeadline } = props;

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
          <Modal.Message>Extend Deadline</Modal.Message>
          <Modal.Description>
            Indicate the date in UTC time that you would like to extend the
            bounty deadline until.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="deadline"
            component={FormDatePicker}
            showTimeSelect
            minDate={minimumDeadline}
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
          <Button type="action">Extend Deadline</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'extendDeadline' })(ExtendDeadlineFormModal);

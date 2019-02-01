import React from 'react';
import styles from './Modals.module.scss';
import { Button, Modal, Text } from 'components';
import { FormTextInput } from 'form-components/formik';
import { Form, Field, withFormik } from 'formik';
import { size } from 'lodash';

let FulfillerApplicationModalComponent = props => {
  const {
    onClose,
    onSubmit,
    resetForm,
    isSubmitting,
    errors,

    visible
  } = props;

  const onCloseAndReset = () => {
    resetForm(), onClose();
  };

  return (
    <Form>
      <Modal
        dismissable={true}
        onClose={onCloseAndReset}
        visible={visible}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>Submit Application</Modal.Message>
          <Modal.Description>
            Leave the bounty issuer a short note that explains why you would be
            great person to tackle this task.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            type="text"
            name="message"
            label="Message"
            placeholder="Enter message..."
            component={FormTextInput}
          />
        </Modal.Body>
        <Modal.Footer>
          {!!size(errors) && (
            <Text inputLabel color="red">
              Fix errors before submitting.
            </Text>
          )}
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              onCloseAndReset();
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            buttonType="submit"
            disabled={isSubmitting || !!size(errors)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

const FulfillerApplicationModal = withFormik({
  mapPropsToValues: () => ({ message: '' }),

  validate: values => {
    const errors = {};

    if (!values.message) {
      errors.message = '* Required';
    }

    return errors;
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, () => setSubmitting(false));
  }
})(FulfillerApplicationModalComponent);

export default FulfillerApplicationModal;

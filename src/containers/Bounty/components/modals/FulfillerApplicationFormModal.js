import React from 'react';
import styles from './Modals.module.scss';
import { Button, Modal, Text } from 'components';
import { FormTextbox } from 'form-components/formik';
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
          <Modal.Message>Enter application details</Modal.Message>
          <Modal.Description>
            Describe why you believe you would be a good fit to complete this
            bounty. Feel free to also provide links to relevant work or
            experience.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            type="text"
            name="message"
            label="Application"
            placeholder="Enter message..."
            component={FormTextbox}
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

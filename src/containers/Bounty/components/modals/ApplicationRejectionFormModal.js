import React from 'react';
import styles from './Modals.module.scss';
import { Button, Modal, Text } from 'components';
import { FormTextbox } from 'form-components/formik';
import { Form, Field, withFormik } from 'formik';
import { size } from 'lodash';
import intl from 'react-intl-universal';
import { rejectionModalSelector } from 'containers/Bounty/selectors';

const MAX_MESSAGE_LENGTH = 500;

let ApplicationRejectionModalComponent = props => {
  const {
    onClose,
    resetForm,
    isSubmitting,
    errors,
    status,
    visible,
    modalProps
  } = props;

  const onCloseAndReset = () => {
    resetForm();
    onClose();
  };
  return (
    <Form>
      <Modal
        dismissable={false}
        onClose={onCloseAndReset}
        visible={visible}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>
            {intl.get('sections.bounty.modals.application_rejection.title')}
          </Modal.Message>
          <Modal.Description>
            {intl.get(
              'sections.bounty.modals.application_rejection.description'
            )}
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            type="text"
            name="message"
            label={intl.get(
              'sections.bounty.modals.application_rejection.form.message.label'
            )}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder={intl.get(
              'sections.bounty.modals.application_rejection.form.message.placeholder'
            )}
            component={FormTextbox}
          />
        </Modal.Body>
        <Modal.Footer>
          {!!size(errors) && (
            <Text inputLabel className={styles.modalSubmitError}>
              {intl.get('errors.form_error')}
            </Text>
          )}
          {status === 'api error' && (
            <Text inputLabel className={styles.modalSubmitError}>
              {intl.get('errors.500')}
            </Text>
          )}
          <Button
            margin
            disabled={isSubmitting}
            onClick={e => {
              e.preventDefault();
              onCloseAndReset();
            }}
          >
            {intl.get('actions.cancel')}
          </Button>
          <Button
            type="primary"
            buttonType="submit"
            loading={isSubmitting}
            disabled={isSubmitting || !!size(errors)}
          >
            {intl.get('actions.reject')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

const ApplicationRejectionModal = withFormik({
  mapPropsToValues: () => ({ message: '' }),

  validate: values => {
    const errors = {};

    if (!values.message) {
      errors.message = '* Required';
    }

    if (values.message && values.message.length > MAX_MESSAGE_LENGTH) {
      errors.message = 'Too long';
    }

    return errors;
  },

  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    const callback = error => {
      setSubmitting(false);

      if (error) {
        setStatus('api error');
        return;
      }

      props.onClose();
    };
    props.onSubmit(values, props.modalProps.applicationId, callback);
  }
})(ApplicationRejectionModalComponent);

export default ApplicationRejectionModal;

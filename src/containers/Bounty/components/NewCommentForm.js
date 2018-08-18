import React from 'react';
import styles from './NewCommentForm.module.scss';
import { Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { FormTextInput } from 'form-components';

const NewCommentForm = props => {
  const { disabled, handleSubmit, loading, submitText } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <Field
          disabled={disabled}
          name="text"
          component={FormTextInput}
          type="text"
          placeholder="Write a comment..."
        />
        <Button disabled={disabled} loading={loading}>
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'newComment' })(NewCommentForm);

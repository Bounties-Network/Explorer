import React from 'react';
import styles from './NewCommentForm.module.scss';
import { Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const NewCommentForm = props => {
  const { handleSubmit, loading } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.textbox}>
          <Field
            name="text"
            component={FormTextInput}
            type="text"
            placeholder="Write a comment..."
          />
        </div>
        <Button loading={loading}>Post comment</Button>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'newComment' })(NewCommentForm);

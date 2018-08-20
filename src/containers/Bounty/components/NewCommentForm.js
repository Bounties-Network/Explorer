import React from 'react';
import styles from './NewCommentForm.module.scss';
import { Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { FormTextInput } from 'form-components';

const NewCommentForm = props => {
  const { showLogin, signedIn, handleSubmit, loading, submitText } = props;

  if (signedIn) {
    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <Field
            name="text"
            component={FormTextInput}
            type="text"
            placeholder="Write a comment..."
            validate={[validators.required]}
          />
          <Button disabled={loading} loading={loading}>
            Post comment
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <Button type="action">Sign in to post comment</Button>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'newComment' })(NewCommentForm);

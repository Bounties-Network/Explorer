import React from 'react';
import styles from './NewCommentForm.module.scss';
import { Button } from 'components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import { FormTextInput } from 'form-components';

const formSelector = formValueSelector('newComment');

const NewCommentForm = props => {
  const { signedIn, handleSubmit, loading, text, className } = props;

  if (signedIn) {
    return (
      <form onSubmit={handleSubmit}>
        <div className={`${styles.container} ${className}`}>
          <Field
            name="text"
            component={FormTextInput}
            type="text"
            placeholder="Write a comment..."
          />
          <Button disabled={loading || text.length === 0} loading={loading}>
            Post comment
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles.container} ${className}`}>
        <Button type="action">Sign in to post comment</Button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({ text: formSelector(state, 'text') || '' });

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'newComment' })
)(NewCommentForm);

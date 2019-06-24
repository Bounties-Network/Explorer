import React from 'react';
import styles from './NewCommentForm.module.scss';
import { Button } from 'components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import { FormTextbox } from 'form-components';
import intl from 'react-intl-universal';

const formSelector = formValueSelector('newComment');

const NewCommentForm = props => {
  const { signedIn, handleSubmit, loading, text, className } = props;

  if (signedIn) {
    return (
      <form onSubmit={handleSubmit}>
        <div className={`${styles.container} ${className}`}>
          <Field
            name="text"
            component={FormTextbox}
            type="text"
            placeholder={intl.get(
              'sections.bounty.components.new_comment.placeholder'
            )}
            maxHeight="12.5rem"
            minHeight="2.5rem"
          />
          <Button disabled={loading || text.length === 0} loading={loading}>
            {intl.get('sections.bounty.components.new_comment.action')}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles.container} ${className}`}>
        <Button>
          {intl.get('sections.bounty.components.new_comment.login_action')}
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({ text: formSelector(state, 'text') || '' });

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'newComment' })
)(NewCommentForm);

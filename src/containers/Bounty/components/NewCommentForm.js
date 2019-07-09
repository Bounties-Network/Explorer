import React from 'react';
import styles from './NewCommentForm.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
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
            className={styles.commentFieldInput}
            name="text"
            component={FormTextbox}
            type="text"
            placeholder={intl.get(
              'sections.bounty.components.new_comment.placeholder'
            )}
          />
          <Button
            className={styles.commentFieldButton}
            disabled={loading || text.length === 0}
            loading={loading}
            type="primary"
          >
            <FontAwesomeIcon icon={['far', 'plus']} />
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

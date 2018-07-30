import React from 'react';
import styles from './Settings.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PageCard, FormSection } from 'explorer-components';
import { Field, reduxForm } from 'redux-form';

import validators from 'utils/validators';

import { FormToggle } from './components';
import { Cropper, Button, Text } from 'components';

import { EMAIL_NOTIFICATION_OPTIONS } from './constants';

import { map as fpMap } from 'lodash';

const map = fpMap.convert({ cap: false });

const EmailSettingsFormComponent = props => {
  const {
    error,
    loading,
    submitFailed,
    invalid,
    onSubmit,
    handleSubmit
  } = props;

  const renderToggles = () => {
    return map(
      (value, key) => (
        <div className={`col-xs-12 ${styles.emailToggle}`}>
          <Field
            form={'emailPreferences'}
            disabled={loading}
            name={key}
            component={FormToggle}
            label={value}
          />
        </div>
      ),
      EMAIL_NOTIFICATION_OPTIONS
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageCard.Break />
      <FormSection>
        <FormSection.Section title="EMAIL NOTIFICATIONS">
          <FormSection.Description>
            What notifications would you like to receive via email?
          </FormSection.Description>
          <FormSection.SubText>
            Opt in or out of the notifications you wish to receive via email. We
            recommend sticking with the default settings so that you can be
            informed of important activity relevant to you on the network.
          </FormSection.SubText>
          <FormSection.InputGroup>
            <div className="row">{renderToggles()}</div>
          </FormSection.InputGroup>
        </FormSection.Section>
      </FormSection>
      <PageCard.Break />
      <div className={styles.buttons}>
        <Button
          type="primary"
          disabled={loading || (submitFailed && invalid)}
          loading={loading}
        >
          Save Email Preferences
        </Button>
        {submitFailed && invalid ? (
          <Text inputLabel color="red" className={styles.submitError}>
            Fix errors before submitting.
          </Text>
        ) : null}
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {};
};

const ComponentWithReduxForm = reduxForm({ form: 'emailPreferences' })(
  EmailSettingsFormComponent
);

const EmailPreferences = compose(
  connect(
    mapStateToProps,
    {}
  )
)(ComponentWithReduxForm);

export default EmailPreferences;

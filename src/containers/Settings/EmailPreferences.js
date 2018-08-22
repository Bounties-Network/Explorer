import React from 'react';
import styles from './Settings.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map as fpMap } from 'lodash';
import { PageCard, FormSection } from 'explorer-components';
import { Field, reduxForm } from 'redux-form';
import { PreferencesToggle } from './components';
import { Button, Text } from 'components';
import { actions as settingsActions } from 'public-modules/Settings';
import { emailPreferencesSelector } from 'public-modules/Settings/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { EMAIL_NOTIFICATION_OPTIONS } from './constants';

const map = fpMap.convert({ cap: false });

let EmailPreferencesComponent = props => {
  const {
    saving,
    submitFailed,
    invalid,
    handleSubmit,
    saveEmailPreferences
  } = props;

  const handleSaveEmailPreferences = values => {
    saveEmailPreferences(values);
  };

  const renderToggles = () => {
    return map(
      (value, key) => (
        <Field
          form="emailPreferences"
          disabled={saving}
          name={key}
          component={PreferencesToggle}
          label={value}
        />
      ),
      EMAIL_NOTIFICATION_OPTIONS
    );
  };

  return (
    <form onSubmit={handleSubmit(handleSaveEmailPreferences)}>
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
          <FormSection.InputGroup>{renderToggles()}</FormSection.InputGroup>
        </FormSection.Section>
      </FormSection>
      <div className={styles.buttonContainer}>
        <Button
          type="primary"
          disabled={saving || (submitFailed && invalid)}
          loading={saving}
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
  const preferences = getCurrentUserSelector(state).settings.emails;

  return {
    initialValues: {
      RatingIssued: preferences.both.RatingIssued,
      TransferRecipient: preferences.issuer.TransferRecipient,
      BountyCommentReceived: preferences.issuer.BountyCommentReceived,
      BountyExpired: preferences.issuer.BountyExpired,
      FulfillmentUpdatedIssuer: preferences.issuer.FulfillmentUpdatedIssuer,
      FulfillmentSubmittedIssuer: preferences.issuer.FulfillmentSubmittedIssuer,
      FulfillmentAcceptedFulfiller:
        preferences.fulfiller.FulfillmentAcceptedFulfiller,
      activity: preferences.activity
    },
    saving: emailPreferencesSelector(state).saving,
    error: emailPreferencesSelector(state).error
  };
};

EmailPreferencesComponent = reduxForm({ form: 'emailPreferences' })(
  EmailPreferencesComponent
);

const EmailPreferences = compose(
  connect(
    mapStateToProps,
    {
      saveEmailPreferences: settingsActions.saveEmailPreferences
    }
  )
)(EmailPreferencesComponent);

export default EmailPreferences;

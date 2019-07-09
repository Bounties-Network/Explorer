import React from 'react';
import styles from './Settings.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map as fpMap } from 'lodash';
import { FormSection } from 'explorer-components';
import { Field, reduxForm } from 'redux-form';
import { PreferencesToggle } from './components';
import { Button, Text } from 'components';
import { actions as settingsActions } from 'public-modules/Settings';
import { emailPreferencesSelector } from 'public-modules/Settings/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { EMAIL_NOTIFICATION_OPTIONS } from './constants';
import intl from 'react-intl-universal';

const map = fpMap.convert({ cap: false });

let EmailPreferencesComponent = props => {
  const {
    saving,
    submitFailed,
    invalid,
    handleSubmit,
    saveEmailPreferences,
    handleEmail
  } = props;

  const handleSaveEmailPreferences = values => {
    saveEmailPreferences(values);
  };

  const renderToggles = () => {
    return map(
      (value, key) => (
        <Field
          key={key}
          form="emailPreferences"
          disabled={saving}
          name={key}
          className={key === 'activity' ? styles.hide : ''}
          component={PreferencesToggle}
          label={intl.get(
            'sections.settings.emails.notification_options.' + value
          )}
        />
      ),
      EMAIL_NOTIFICATION_OPTIONS
    );
  };

  return (
    <form onSubmit={handleSubmit(handleSaveEmailPreferences)}>
      <FormSection>
        <FormSection.Section title={intl.get('sections.settings.emails.title')}>
          <FormSection.Description>
            {intl.get('sections.settings.emails.description')}
          </FormSection.Description>
          <FormSection.SubText>
            {intl.get('sections.settings.emails.notice')}
          </FormSection.SubText>
          <FormSection.InputGroup>{renderToggles()}</FormSection.InputGroup>
        </FormSection.Section>
      </FormSection>
      <div className={styles.buttonContainer}>
        <Button
          onClick={handleEmail}
          type="primary"
          disabled={saving || (submitFailed && invalid)}
          loading={saving}
        >
          {intl.get('sections.settings.emails.actions.save')}
        </Button>
        {submitFailed && invalid ? (
          <Text inputLabel color="red" className={styles.submitError}>
            {intl.get('errors.form_error')}
          </Text>
        ) : null}
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  const preferences = getCurrentUserSelector(state).settings.emails;

  // proxy handler to default any unknown key to false
  const handler = {
    get: (target, name) => (target[name] ? target[name] : false)
  };

  const initialValues = {
    RatingReceived: preferences.both.RatingReceived,
    TransferRecipient: preferences.issuer.TransferRecipient,
    BountyCommentReceived: preferences.fulfiller.BountyCommentReceived,
    BountyCommentReceivedIssuer: preferences.issuer.BountyCommentReceivedIssuer,
    BountyCommentReceivedCommenter:
      preferences.both.BountyCommentReceivedCommenter,
    FulfillmentCommentReceived:
      preferences.fulfiller.FulfillmentCommentReceived,
    FulfillmentCommentReceivedIssuer:
      preferences.issuer.FulfillmentCommentReceivedIssuer,
    BountyChanged: preferences.fulfiller.BountyChanged,
    BountyChangedApplicant: preferences.fulfiller.BountyChangedApplicant,
    BountyExpired: preferences.issuer.BountyExpired,
    FulfillmentUpdatedIssuer: preferences.issuer.FulfillmentUpdatedIssuer,
    FulfillmentSubmittedIssuer: preferences.issuer.FulfillmentSubmittedIssuer,
    FulfillmentAcceptedFulfiller:
      preferences.fulfiller.FulfillmentAcceptedFulfiller,
    ContributionReceived: preferences.issuer.ContributionReceived,
    BountyCompleted: preferences.issuer.BountyCompleted,
    ApplicationReceived: preferences.issuer.ApplicationReceived,
    ApplicationAcceptedApplicant:
      preferences.fulfiller.ApplicationAcceptedApplicant,
    ApplicationRejectedApplicant:
      preferences.fulfiller.ApplicationRejectedApplicant,
    activity: preferences.activity
  };

  return {
    initialValues: new Proxy(initialValues, handler),
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

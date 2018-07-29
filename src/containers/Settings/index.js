import React from 'react';
import styles from './Settings.module.scss';
import SettingsForm from './SettingsForm';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { PageCard, FormSection } from 'explorer-components';
import { rootUploadSelector } from 'public-modules/FileUpload/selectors';
import { formValueSelector } from 'redux-form';
import { actions as uploadActions } from 'public-modules/FileUpload';
import { actions as skillActions } from 'public-modules/Skills';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as settingsActions } from 'public-modules/Settings';
import { skillsSelector } from 'public-modules/Skills/selectors';
import {
  settingsSelector,
  emailPreferencesSelector
} from 'public-modules/Settings/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { Field, reduxForm } from 'redux-form';
import {
  createBountyStateSelector,
  createDraftStateSelector
} from 'public-modules/Bounty/selectors';
import validators from 'utils/validators';
import moment from 'moment';
import { Cropper, Button, Text } from 'components';
import { FormToggle } from './components';
import {
  FormTextInput,
  FormMarkdownEditor,
  FormSearchSelect,
  FormRadioGroup,
  FormNumberInput,
  FormDatePicker
} from 'form-components';
import {
  EMAIL_NOTIFICATION_OPTIONS,
  DIFFICULTY_OPTIONS,
  PAYOUT_OPTIONS,
  ACTIVATE_OPTIONS,
  UPLOAD_KEY
} from './constants';

const formSelector = formValueSelector('createBounty');

let SettingsComponent = props => {
  const {
    currentUser,
    uploadFile,
    uploadLoading,
    uploaded,
    activateNow,
    addSkill,
    skills,
    invalid,
    handleSubmit,
    submitFailed,
    createDraft,
    paysTokens,
    saveSettings,
    submittingBounty,
    emailFormInitialValues,
    saveEmailPreferences,
    savingEmailPreferences,
    errorSavingEmailPreferences
  } = props;

  const handleSaveSettings = values => {
    saveSettings(values);
  };

  const handleSaveEmailPreferences = values => {
    saveEmailPreferences(values);
  };

  return (
    <PageCard>
      <PageCard.Header>
        <PageCard.Title>Account Settings</PageCard.Title>
      </PageCard.Header>
      <PageCard.Content className={styles.cardContent}>
        <form onSubmit={handleSubmit(handleSaveSettings)}>
          <FormSection>
            <FormSection.Section title="PROFILE PHOTO">
              <FormSection.InputGroup>
                <Cropper
                  disabled={submittingBounty}
                  onChange={file => uploadFile(UPLOAD_KEY, file)}
                  loading={uploadLoading}
                />
              </FormSection.InputGroup>
            </FormSection.Section>
            <FormSection.Section title="ABOUT">
              <FormSection.Description>
                What would you like people to know about you?
              </FormSection.Description>
              <FormSection.SubText>
                Enter some of your personal details so that the community can
                get to know you.
              </FormSection.SubText>
              <FormSection.InputGroup>
                <div className="row">
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="name"
                      component={FormTextInput}
                      label="Name"
                      placeholder="Enter name..."
                      validate={[
                        validators.required,
                        validators.maxLength(128)
                      ]}
                    />
                  </div>
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="email"
                      component={FormTextInput}
                      label="Contact email"
                      placeholder="Enter email..."
                      form="asdf"
                      validate={[validators.maxLength(128), validators.email]}
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
              <FormSection.InputGroup>
                <div className="row">
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="languages"
                      component={FormTextInput}
                      label="Languages Spoken"
                      placeholder="Enter languages..."
                      validate={[validators.maxLength(128)]}
                    />
                  </div>
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="organization"
                      component={FormTextInput}
                      label="Organization"
                      placeholder="Enter organization..."
                      validate={[validators.maxLength(128)]}
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
            </FormSection.Section>
            <FormSection.Section title="SKILLS">
              <FormSection.Description>
                What are some of your professional or technical skills?
              </FormSection.Description>
              <FormSection.SubText>
                Enter or select the skills for which you are proficient. This
                will help others on the network be confident in your ability to
                fulfill certain types of bounties.
              </FormSection.SubText>
              <FormSection.InputGroup>
                <div className="row">
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="skills"
                      component={FormSearchSelect}
                      label="Skills"
                      placeholder="Create or Select a skill..."
                      onCreateOption={addSkill}
                      options={skills}
                      labelKey="name"
                      valueKey="normalized_name"
                      creatable
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
            </FormSection.Section>
            <FormSection.Section title="SOCIAL">
              <FormSection.Description>
                Do you have any other social profiles you would like displayed?
              </FormSection.Description>
              <FormSection.InputGroup>
                <div className="row">
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="website"
                      component={FormTextInput}
                      label="Personal website"
                      placeholder="https://example.com"
                      validate={[validators.maxLength(128)]}
                    />
                  </div>
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="twitter"
                      component={FormTextInput}
                      label="Twitter"
                      placeholder="@ethBounties"
                      validate={[validators.maxLength(128)]}
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
              <FormSection.InputGroup>
                <div className="row">
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="github"
                      component={FormTextInput}
                      label="Github"
                      placeholder="@vbuterin"
                      validate={[validators.maxLength(128)]}
                    />
                  </div>
                  <div className="col-xs-6">
                    <Field
                      disabled={submittingBounty}
                      name="linkedin"
                      component={FormTextInput}
                      label="LinkedIn"
                      placeholder="https://linkedin.com/in/vbuterin"
                      validate={[validators.maxLength(128)]}
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
            </FormSection.Section>
          </FormSection>
          <div className={styles.submitButton}>
            <Button
              type="primary"
              disabled={uploadLoading || (submitFailed && invalid)}
              loading={submittingBounty}
            >
              Update Profile
            </Button>
            {submitFailed && invalid ? (
              <Text inputLabel color="red" className={styles.submitError}>
                Fix errors before submitting.
              </Text>
            ) : null}
          </div>
        </form>

        <SettingsForm
          initialValues={emailFormInitialValues}
          onSubmit={handleSaveEmailPreferences}
          loading={savingEmailPreferences}
          error={errorSavingEmailPreferences}
        />
      </PageCard.Content>
    </PageCard>
  );
};

const mapStateToProps = state => {
  const rootUpload = rootUploadSelector(state);
  const uploadState = rootUpload[UPLOAD_KEY] || {};
  const currentUser = getCurrentUserSelector(state);
  const currentEmailPreferences = currentUser.settings.emails;

  return {
    initialValues: {
      ...currentUser,
      languages: currentUser.languages.join(', ')
    },
    emailFormInitialValues: {
      RatingIssued: currentEmailPreferences.both.RatingIssued,
      TransferRecipient: currentEmailPreferences.issuer.TransferRecipient,
      BountyComment: currentEmailPreferences.issuer.BountyComment,
      BountyExpired: currentEmailPreferences.issuer.BountyExpired,
      FulfillmentUpdatedIssuer:
        currentEmailPreferences.issuer.FulfillmentUpdatedIssuer,
      FulfillmentSubmittedIssuer:
        currentEmailPreferences.issuer.FulfillmentSubmittedIssuer,
      FulfillmentAcceptedFulfiller:
        currentEmailPreferences.fulfiller.FulfillmentAcceptedFulfiller,
      activity: currentEmailPreferences.activity
    },
    currentUser: getCurrentUserSelector(state),
    uploadLoading: uploadState.uploading || false,
    uploaded: uploadState.uploaded || false,
    skills: skillsSelector(state),
    savingSettings: settingsSelector(state).saving,
    errorSavingSettings: settingsSelector(state).error,
    savingEmailPreferences: emailPreferencesSelector(state).saving,
    errorSavingEmailPreferences: emailPreferencesSelector(state).error
  };
};

SettingsComponent = reduxForm({ form: 'settings' })(SettingsComponent);

const Settings = compose(
  connect(
    mapStateToProps,
    {
      uploadFile: uploadActions.uploadFile,
      addSkill: skillActions.addToSkills,
      saveSettings: settingsActions.saveSettings,
      saveEmailPreferences: settingsActions.saveEmailPreferences
    }
  )
)(SettingsComponent);

export default Settings;

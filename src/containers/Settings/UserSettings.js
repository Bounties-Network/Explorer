import React from 'react';
import styles from './Settings.module.scss';
import EmailPreferences from './EmailPreferences';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { PageCard, FormSection } from 'explorer-components';
import { rootUploadSelector } from 'public-modules/FileUpload/selectors';
import { formValueSelector } from 'redux-form';
import { actions as uploadActions } from 'public-modules/FileUpload';
import { actions as skillActions } from 'public-modules/Skills';
import { actions as settingsActions } from 'public-modules/Settings';
import { skillsSelector } from 'public-modules/Skills/selectors';
import { settingsSelector } from 'public-modules/Settings/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { Field, reduxForm } from 'redux-form';
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

let UserSettingsComponent = props => {
  const {
    uploadFile,
    uploading,
    uploaded,
    addSkill,
    skills,
    invalid,
    handleSubmit,
    submitFailed,
    saveSettings,
    savingSettings,
    ipfsHash,
    fileName,
    userProfilePhoto,
    uploadedProfilePhoto,
    resetUpload
  } = props;

  const handleSaveSettings = values => {
    saveSettings({ ...values, ipfsHash, fileName });
  };

  return (
    <form onSubmit={handleSubmit(handleSaveSettings)}>
      <FormSection>
        <FormSection.Section title="PROFILE PHOTO">
          <FormSection.InputGroup>
            <Cropper
              disabled={savingSettings}
              onChange={file => uploadFile(UPLOAD_KEY, file)}
              onDelete={resetUpload}
              loading={uploading}
              src={uploadedProfilePhoto || userProfilePhoto}
            />
          </FormSection.InputGroup>
        </FormSection.Section>
        <FormSection.Section title="ABOUT">
          <FormSection.Description>
            What would you like people to know about you?
          </FormSection.Description>
          <FormSection.SubText>
            Enter some of your personal details so that the community can get to
            know you.
          </FormSection.SubText>
          <FormSection.InputGroup>
            <div className="row">
              <div className="col-xs-6">
                <Field
                  disabled={savingSettings}
                  name="name"
                  component={FormTextInput}
                  label="Name"
                  placeholder="Enter name..."
                  validate={[validators.required, validators.maxLength(128)]}
                />
              </div>
              <div className="col-xs-6">
                <Field
                  disabled={savingSettings}
                  name="email"
                  component={FormTextInput}
                  label="Contact email"
                  placeholder="Enter email..."
                  validate={[validators.maxLength(128), validators.email]}
                />
              </div>
            </div>
          </FormSection.InputGroup>
          <FormSection.InputGroup>
            <div className="row">
              <div className="col-xs-6">
                <Field
                  disabled={savingSettings}
                  name="languages"
                  component={FormTextInput}
                  label="Languages Spoken"
                  placeholder="Enter languages..."
                  validate={[validators.maxLength(128)]}
                />
              </div>
              <div className="col-xs-6">
                <Field
                  disabled={savingSettings}
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
            Enter or select the skills for which you are proficient. This will
            help others on the network be confident in your ability to fulfill
            certain types of bounties.
          </FormSection.SubText>
          <FormSection.InputGroup>
            <div className="row">
              <div className="col-xs-6">
                <Field
                  disabled={savingSettings}
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
                  disabled={savingSettings}
                  name="website"
                  component={FormTextInput}
                  label="Personal website"
                  placeholder="https://example.com"
                  validate={[validators.maxLength(128)]}
                />
              </div>
              <div className="col-xs-6">
                <Field
                  disabled={savingSettings}
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
                  disabled={savingSettings}
                  name="github"
                  component={FormTextInput}
                  label="Github"
                  placeholder="@vbuterin"
                  validate={[validators.maxLength(128)]}
                />
              </div>
              <div className="col-xs-6">
                <Field
                  disabled={savingSettings}
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
      <PageCard.Break />
      <div className={styles.buttons}>
        <Button
          type="primary"
          disabled={uploading || (submitFailed && invalid)}
          loading={savingSettings}
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
  );
};

const mapStateToProps = state => {
  const rootUpload = rootUploadSelector(state);
  const uploadState = rootUpload[UPLOAD_KEY] || {};
  const currentUser = getCurrentUserSelector(state);

  return {
    initialValues: {
      ...currentUser,
      languages: currentUser.languages.join(', ')
    },
    uploading: uploadState.uploading || false,
    uploaded: uploadState.uploaded || false,
    ipfsHash: uploadState.uploaded ? uploadState.ipfsHash : null,
    fileName: uploadState.uploaded ? uploadState.fileName : null,
    skills: skillsSelector(state),
    savingSettings: settingsSelector(state).saving,
    errorSavingSettings: settingsSelector(state).error,
    uploadedProfilePhoto: uploadState.uploaded
      ? `https://ipfs.infura.io/ipfs/${uploadState.ipfsHash}/${
          uploadState.fileName
        }`
      : '',
    userProfilePhoto: currentUser.profile_image
  };
};

UserSettingsComponent = reduxForm({ form: 'settings' })(UserSettingsComponent);

const UserSettings = compose(
  connect(
    mapStateToProps,
    {
      uploadFile: uploadActions.uploadFile,
      resetUpload: uploadActions.resetUpload,
      addSkill: skillActions.addToSkills,
      saveSettings: settingsActions.saveSettings
    }
  )
)(UserSettingsComponent);

export default UserSettings;

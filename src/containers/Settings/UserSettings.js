import React from 'react';
import styles from './Settings.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormSection } from 'explorer-components';
import { PreferencesToggle } from './components';
import { rootUploadSelector } from 'public-modules/FileUpload/selectors';
import { actions as uploadActions } from 'public-modules/FileUpload';
import { actions as skillActions } from 'public-modules/Skills';
import { actions as settingsActions } from 'public-modules/Settings';
import { skillsSelector } from 'public-modules/Skills/selectors';
import { languagesSelector } from 'public-modules/Languages/selectors';
import { settingsSelector } from 'public-modules/Settings/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { ipfsToHttp } from 'utils/helpers';
import { Cropper, Button, Text } from 'components';
import { FormTextInput, FormSearchSelect } from 'form-components';
import { UPLOAD_KEY } from './constants';

class UserSettingsComponent extends React.Component {
  constructor(props) {
    super(props);

    const { ipfsHash, fileName } = props;
    this.state = {
      profileImage: ipfsHash ? ipfsToHttp(ipfsHash, fileName) : null
    };
  }
  render() {
    const {
      uploadFile,
      uploading,
      addSkill,
      skills,
      languages,
      email_interest,
      invalid,
      handleSubmit,
      submitFailed,
      saveSettings,
      savingSettings,
      ipfsHash,
      fileName,
      resetUpload
    } = this.props;

    const { profileImage } = this.state;

    const handleSaveSettings = values => {
      saveSettings({
        ...values,
        ipfsHash: ipfsHash,
        fileName: fileName
      });
    };

    const handleUpload = file => {
      this.setState({ profileImage: URL.createObjectURL(file) });
      uploadFile(UPLOAD_KEY, file);
    };

    const handleResetUpload = () => {
      this.setState({ profileImage: null });
      resetUpload(UPLOAD_KEY);
    };

    return (
      <form onSubmit={handleSubmit(values => handleSaveSettings(values))}>
        <FormSection>
          <FormSection.Section title="PROFILE PHOTO">
            <FormSection.InputGroup>
              <Cropper
                disabled={savingSettings}
                onChange={file => handleUpload(file)}
                onDelete={handleResetUpload}
                loading={uploading}
                src={profileImage}
              />
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="ALERTS">
            <FormSection.Description>
              Would you like to get relevant bounties and platform updates
              emailed to you?
            </FormSection.Description>
            <FormSection.InputGroup>
              <Field
                disabled={savingSettings}
                name="email_interest"
                component={PreferencesToggle}
                label="Relevant bounties and platform updates"
              />
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="ABOUT">
            <FormSection.Description>
              What would you like people to know about you?
            </FormSection.Description>
            <FormSection.SubText>
              Enter some of your personal details so that the community can get
              to know you.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="name"
                    component={FormTextInput}
                    label="Name"
                    placeholder="Enter name..."
                    validate={[validators.maxLength(128)]}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
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
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="languages"
                    component={FormSearchSelect}
                    label="Languages"
                    placeholder="Choose a languages..."
                    options={languages}
                    labelKey="name"
                    valueKey="normalized_name"
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
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
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
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
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="website"
                    component={FormTextInput}
                    label="Personal website"
                    placeholder="https://example.com"
                    validate={[validators.isURL, validators.maxLength(128)]}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="twitter"
                    component={FormTextInput}
                    label="Twitter"
                    placeholder="@ethBounties"
                    validate={[validators.isTwitterHandle]}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="github"
                    component={FormTextInput}
                    label="Github"
                    placeholder="@vbuterin"
                    validate={[validators.isGithubHandle]}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="linkedin"
                    component={FormTextInput}
                    label="LinkedIn"
                    placeholder="https://linkedin.com/in/vbuterin"
                    validate={[validators.isURL, validators.maxLength(128)]}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
        </FormSection>
        <div className={styles.buttonContainer}>
          <Button
            type="primary"
            disabled={uploading || (submitFailed && invalid)}
            loading={savingSettings}
            buttonType="submit"
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
  }
}

const mapStateToProps = state => {
  const rootUpload = rootUploadSelector(state);
  const uploadState = rootUpload[UPLOAD_KEY] || {};
  const currentUser = getCurrentUserSelector(state);

  return {
    initialValues: {
      ...currentUser,
      languages: currentUser.languages,

      // stored in db w/o @ symbol
      twitter: currentUser.twitter ? '@' + currentUser.twitter : '',
      github: currentUser.github ? '@' + currentUser.github : ''
    },
    uploading: uploadState.uploading || false,
    uploaded: uploadState.uploaded || false,
    ipfsHash: uploadState.ipfsHash || currentUser.profileDirectoryHash,
    fileName: uploadState.fileName || currentUser.profileFileName,
    skills: skillsSelector(state),
    languages: languagesSelector(state),
    savingSettings: settingsSelector(state).saving,
    errorSavingSettings: settingsSelector(state).error
  };
};

UserSettingsComponent = reduxForm({
  form: 'settings',
  enableReinitialize: true,
  destroyOnUnmount: false
})(UserSettingsComponent);

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

import React from 'react';
import styles from './Settings.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormSection } from 'explorer-components';
import { actions as skillActions } from 'public-modules/Skills';
import { actions as settingsActions } from 'public-modules/Settings';
import { actions as settingsUIActions } from './reducer';
import { settingsUISelector } from './selectors';
import { skillsSelector } from 'public-modules/Skills/selectors';
import { languagesSelector } from 'public-modules/Languages/selectors';
import {
  profileImageUploadStateSelector,
  settingsSelector
} from 'public-modules/Settings/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { Cropper, Button, Text } from 'components';
import { FormCheckbox, FormTextInput, FormSearchSelect } from 'form-components';
import intl from 'react-intl-universal';

class UserSettingsComponent extends React.Component {
  constructor(props) {
    super(props);

    const { initialValues, setProfileImageUrls } = props;

    const { smallProfileImageUrl, largeProfileImageUrl } = initialValues;

    setProfileImageUrls(smallProfileImageUrl, largeProfileImageUrl);
  }

  componentWillUnmount() {
    this.props.resetProfileImageUrls();
  }

  render() {
    const {
      uploadProfileImage,
      uploading,
      uploadingError,
      addSkill,
      skills,
      languages,
      invalid,
      handleSubmit,
      submitFailed,
      saveSettings,
      savingSettings,
      onboarding,
      onClose,
      smallProfileImageUrl,
      largeProfileImageUrl,
      resetProfileImageUrls
    } = this.props;

    const handleSaveSettings = values => {
      saveSettings({
        ...values,
        smallProfileImageUrl,
        largeProfileImageUrl
      });
    };

    const handleUpload = (smallImage, largeImage) => {
      uploadProfileImage(smallImage, largeImage);
    };

    const handleResetUpload = () => {
      resetProfileImageUrls();
    };

    const validatorGroups = {
      name: [validators.maxLength(128)],
      email: [validators.maxLength(128), validators.email],
      organization: [validators.maxLength(128)],
      website: [validators.isURL, validators.maxLength(128)],
      twitter: [validators.isTwitterHandle],
      github: [validators.isGithubHandle],
      linkedin: [validators.isURL, validators.maxLength(128)]
    };

    return (
      <form onSubmit={handleSubmit(values => handleSaveSettings(values))}>
        <FormSection>
          <FormSection.Section
            title={intl.get('sections.settings.user.photo.title')}
          >
            <FormSection.InputGroup>
              <Cropper
                disabled={savingSettings}
                onChange={handleUpload}
                onDelete={handleResetUpload}
                loading={uploading}
                src={largeProfileImageUrl}
              />
              {uploadingError && (
                <Text inputLabel color="red">
                  {intl.get('sections.settings.user.photo.label')}
                </Text>
              )}
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section
            title={intl.get('sections.settings.user.about.title')}
          >
            <FormSection.Description>
              {intl.get('sections.settings.user.about.description')}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.get('sections.settings.user.about.notice')}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="name"
                    component={FormTextInput}
                    label={intl.get(
                      'sections.settings.user.about.form.name.label'
                    )}
                    placeholder={intl.get(
                      'sections.settings.user.about.form.name.placeholder'
                    )}
                    validate={validatorGroups.name}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="organization"
                    component={FormTextInput}
                    label={intl.get(
                      'sections.settings.user.about.form.organization.label'
                    )}
                    placeholder={intl.get(
                      'sections.settings.user.about.form.organization.placeholder'
                    )}
                    validate={validatorGroups.organization}
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
                    label={intl.get(
                      'sections.settings.user.about.form.languages.label'
                    )}
                    placeholder={intl.get(
                      'sections.settings.user.about.form.languages.placeholder'
                    )}
                    options={languages}
                    labelKey="name"
                    valueKey="normalized_name"
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section
            title={intl.get('sections.settings.user.skills.title')}
          >
            <FormSection.Description>
              {intl.get('sections.settings.user.skills.description')}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.get('sections.settings.user.skills.notice')}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="skills"
                    component={FormSearchSelect}
                    label={intl.get('sections.settings.user.skills.label')}
                    placeholder={intl.get(
                      'sections.settings.user.skills.placeholder'
                    )}
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
          <FormSection.Section
            title={intl.get('sections.settings.user.social.title')}
          >
            <FormSection.Description>
              {intl.get('sections.settings.user.social.description')}
            </FormSection.Description>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="website"
                    component={FormTextInput}
                    label={intl.get(
                      'sections.settings.user.social.form.web.label'
                    )}
                    placeholder="https://example.com"
                    validate={validatorGroups.website}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="twitter"
                    component={FormTextInput}
                    label="Twitter"
                    placeholder="@ethBounties"
                    validate={validatorGroups.twitter}
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
                    validate={validatorGroups.github}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="linkedin"
                    component={FormTextInput}
                    label="LinkedIn"
                    placeholder="https://linkedin.com/in/vbuterin"
                    validate={validatorGroups.linkedin}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section
            title={intl.get('sections.settings.user.contact.title')}
          >
            <FormSection.Description>
              {intl.get('sections.settings.user.contact.description')}
            </FormSection.Description>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={savingSettings}
                    name="email"
                    component={FormTextInput}
                    label={intl.get(
                      'sections.settings.user.contact.form.email.label'
                    )}
                    placeholder={intl.get(
                      'sections.settings.user.contact.form.email.placeholder'
                    )}
                    validate={validatorGroups.email}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
            <FormSection.InputGroup>
              <Field
                disabled={savingSettings}
                name="wants_marketing_emails"
                component={FormCheckbox}
                label={intl.get(
                  'sections.settings.user.contact.form.marketing.label'
                )}
              />
            </FormSection.InputGroup>
          </FormSection.Section>
        </FormSection>
        <div className={styles.buttonContainer}>
          {onboarding && (
            <Button onClick={onClose} margin>
              {intl.get('actions.cancel')}
            </Button>
          )}
          <Button
            type="primary"
            disabled={uploading || (submitFailed && invalid)}
            loading={savingSettings}
            buttonType="submit"
          >
            {onboarding
              ? intl.get('sections.settings.user.contact.actions.submit')
              : intl.get('sections.settings.user.contact.actions.update')}
          </Button>
          {submitFailed && invalid ? (
            <Text inputLabel color="red" className={styles.submitError}>
              {intl.get('errors.form_error')}

            </Text>
          ) : null}
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const uploadState = profileImageUploadStateSelector(state);
  const currentUser = getCurrentUserSelector(state);

  return {
    initialValues: {
      ...currentUser,
      // stored in db w/o @ symbol
      twitter: currentUser.twitter ? '@' + currentUser.twitter : '',
      github: currentUser.github ? '@' + currentUser.github : '',
      smallProfileImageUrl: currentUser.small_profile_image_url,
      largeProfileImageUrl: currentUser.large_profile_image_url
    },
    uploading: uploadState.uploading,
    uploadingError: uploadState.error,
    smallProfileImageUrl: settingsUISelector(state).smallProfileImageUrl,
    largeProfileImageUrl: settingsUISelector(state).largeProfileImageUrl,
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
      uploadProfileImage: settingsActions.uploadProfileImage,
      addSkill: skillActions.addToSkills,
      saveSettings: settingsActions.saveSettings,
      setProfileImageUrls: settingsUIActions.setProfileImageUrls,
      resetProfileImageUrls: settingsUIActions.resetProfileImageUrls
    }
  )
)(UserSettingsComponent);

export default UserSettings;

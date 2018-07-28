import React from 'react';
import styles from './Settings.module.scss';
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
    submittingBounty
  } = props;

  const handleSaveSettings = values => {
    saveSettings(values);
  };

  return (
    <form onSubmit={handleSubmit(handleSaveSettings)}>
      <PageCard>
        <PageCard.Header>
          <PageCard.Title>Account Settings</PageCard.Title>
        </PageCard.Header>
        <PageCard.Content className={styles.cardContent}>
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
            <FormSection.Section title="EMAIL NOTIFICATIONS">
              <FormSection.Description>
                What notifications would you like to receive via email?
              </FormSection.Description>
              <FormSection.SubText>
                Opt in or out of the notifications you wish to receive via
                email. We recommend sticking with the default settings so that
                you can be informed of important activity relevant to you on the
                network.
              </FormSection.SubText>
              <FormSection.InputGroup>
                <div className="row">
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
                    />
                  </div>
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
                    />
                  </div>
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
                    />
                  </div>
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
                    />
                  </div>
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
                    />
                  </div>
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
                    />
                  </div>
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
                    />
                  </div>
                  <div className={`col-xs-12 ${styles.emailToggle}`}>
                    <FormToggle
                      text={'This is a description of an email notification'}
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
              disabled={uploadLoading || (submitFailed && invalid)}
              loading={submittingBounty}
            >
              Save
            </Button>
            {submitFailed && invalid ? (
              <Text inputLabel color="red" className={styles.submitError}>
                Fix errors before submitting.
              </Text>
            ) : null}
          </div>
        </PageCard.Content>
      </PageCard>
    </form>
  );
};

const mapStateToProps = state => {
  const rootUpload = rootUploadSelector(state);
  const uploadState = rootUpload[UPLOAD_KEY] || {};
  const draftState = createDraftStateSelector(state);
  const bountyState = createBountyStateSelector(state);

  return {
    initialValues: { ...getCurrentUserSelector(state) },
    currentUser: getCurrentUserSelector(state),
    uploadLoading: uploadState.uploading || false,
    uploaded: uploadState.uploaded || false,
    activateNow: formSelector(state, 'activateNow'),
    paysTokens: formSelector(state, 'paysTokens'),
    skills: skillsSelector(state),
    submittingBounty: draftState.creating || bountyState.creating
  };
};

SettingsComponent = reduxForm({ form: 'settings' })(SettingsComponent);

const Settings = compose(
  connect(
    mapStateToProps,
    {
      uploadFile: uploadActions.uploadFile,
      addSkill: skillActions.addToSkills,
      saveSettings: settingsActions.saveSettings
    }
  )
)(SettingsComponent);

export default Settings;

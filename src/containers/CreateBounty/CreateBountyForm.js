import React from 'react';
import styles from './CreateBounty.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormSection } from 'explorer-components';
import { getUploadKeySelector } from 'public-modules/FileUpload/selectors';
import { formValueSelector } from 'redux-form';
import { actions as uploadActions } from 'public-modules/FileUpload';
import { actions as categoryActions } from 'public-modules/Categories';
import { actions as bountyActions } from 'public-modules/Bounty';
import { categoriesSelector } from 'public-modules/Categories/selectors';
import { TransactionWalkthrough } from 'hocs';
import { Field, reduxForm } from 'redux-form';
import { getTimezone, isMobile } from 'utils/helpers';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import {
  stdBountyStateSelector,
  createDraftStateSelector,
  getDraftBountySelector
} from 'public-modules/Bounty/selectors';
import validators from 'utils/validators';
import normalizers from 'utils/normalizers';
import { FileUpload, Button, Text } from 'components';
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

class CreateBountyFormComponent extends React.Component {
  handleCreateBounty = values => {
    const { activateNow, balance, ...bountyValues } = values;
    const {
      filename,
      fileHash,
      createBounty,
      createDraft,
      uid,
      updateDraft,
      bountyId
    } = this.props;

    const fileData = {
      sourceDirectoryHash: fileHash,
      sourceFileName: filename
    };
    if (activateNow) {
      return createBounty({ ...bountyValues, ...fileData }, balance);
    }

    if (uid) {
      return updateDraft(bountyId, { ...bountyValues, ...fileData, uid });
    }

    return createDraft({ ...bountyValues, ...fileData });
  };

  handleSubmit = values => {
    const { initiateWalkthrough } = this.props;
    const { activateNow } = values;
    if (activateNow) {
      return initiateWalkthrough(() => this.handleCreateBounty(values));
    }
    this.handleCreateBounty(values);
  };

  render() {
    const {
      uploadFile,
      uploadLoading,
      activateNow,
      addCategory,
      categories,
      invalid,
      handleSubmit,
      submitFailed,
      paysTokens,
      submittingBounty,
      filename,
      resetUpload,
      deleteUploadKey,
      bountyId,
      minDate
    } = this.props;

    let submitButtonText = 'Create Bounty';
    if (!activateNow) {
      submitButtonText = 'Create Draft';
    }
    if (bountyId && !activateNow) {
      submitButtonText = 'Update Draft';
    }

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <FormSection>
          <FormSection.Section title="ABOUT">
            <FormSection.Description>
              Enter your details about this bounty.
            </FormSection.Description>
            <FormSection.SubText>
              Enter a title and description for your bounty. A markdown preview
              will automatically be generated as you type, which you can view by
              clicking the preview button.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <Field
                name="title"
                disabled={submittingBounty}
                component={FormTextInput}
                label="Title"
                placeholder="Enter title..."
                validate={[
                  validators.required,
                  validators.minLength(2),
                  validators.maxLength(256)
                ]}
              />
            </FormSection.InputGroup>
            <FormSection.InputGroup>
              <Field
                disabled={submittingBounty}
                name="description"
                component={FormMarkdownEditor}
                label="Description"
                textBoxClassName={styles.markdownEditor}
                validate={[
                  validators.required,
                  validators.minLength(2),
                  validators.maxLength(120000)
                ]}
              />
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="CONTACT">
            <FormSection.Description>
              Who will be the primary contact for bounty questions and
              submissions?
            </FormSection.Description>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="issuer_name"
                    component={FormTextInput}
                    label="Contact name"
                    placeholder="Enter name..."
                    validate={[validators.required, validators.maxLength(128)]}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="issuer_email"
                    component={FormTextInput}
                    label="Contact email"
                    placeholder="Enter email..."
                    validate={[
                      validators.required,
                      validators.maxLength(128),
                      validators.email
                    ]}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="DETAILS">
            <FormSection.Description>
              How should this bounty be classified?
            </FormSection.Description>
            <FormSection.SubText>
              Enter the categories and difficulty level for the bounty. Since
              difficulty can be fairly subjective, it is helpful to provide more
              details around required experience within your bounty description.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="categories"
                    component={FormSearchSelect}
                    label="Bounty category"
                    placeholder="Create or Select category..."
                    validate={[validators.required]}
                    onCreateOption={addCategory}
                    options={categories}
                    labelKey="name"
                    valueKey="normalized_name"
                    creatable
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="experienceLevel"
                    component={FormRadioGroup}
                    label="Difficulty"
                    options={DIFFICULTY_OPTIONS}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="REVISIONS">
            <FormSection.Description>
              Will you require revisions?
            </FormSection.Description>
            <FormSection.SubText>
              Enter the maximum number of revisions you may require for this
              task, in order to help set expectations for the contributors.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    name="revisions"
                    component={FormNumberInput}
                    disabled={submittingBounty}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="ATTACHMENTS">
            <FormSection.Description>
              Does this bounty require any external assets for completion?
            </FormSection.Description>
            <FormSection.SubText>
              Attach any files or links that may be helpful as references or
              necessary for a contributor to complete the bounty.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    name="webReferenceURL"
                    disabled={submittingBounty}
                    component={FormTextInput}
                    type="text"
                    label="Web link"
                    validate={[validators.maxLength(256), validators.isURL]}
                    placeholder="Enter URL..."
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Text inputLabel color="defaultGrey">
                    Associated file
                  </Text>
                  <FileUpload
                    disabled={submittingBounty}
                    onChange={file =>
                      file
                        ? uploadFile('createBounty', file)
                        : resetUpload('createBounty')
                    }
                    onUnmount={() => deleteUploadKey('createBounty')}
                    loading={uploadLoading}
                    filename={filename}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="DEADLINE">
            <FormSection.Description>
              When will this bounty be due?
            </FormSection.Description>
            <FormSection.SubText>
              Enter the date and time for this bounty's deadline{getTimezone()
                ? ` (timezone ${getTimezone()}).`
                : '.'}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="deadline"
                    component={FormDatePicker}
                    minDate={minDate}
                    validate={[
                      validators.required,
                      validators.minDate(minDate)
                    ]}
                    showTimeSelect
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section title="PAYOUT">
            <FormSection.Description>
              Select payout method and amount.
            </FormSection.Description>
            <FormSection.SubText>
              Select the token and enter the amount you will award for
              completion of this bounty.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="paysTokens"
                    component={FormRadioGroup}
                    label="Payout Method"
                    options={PAYOUT_OPTIONS}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    name="fulfillmentAmount"
                    disabled={submittingBounty}
                    component={FormTextInput}
                    type="text"
                    normalize={normalizers.number}
                    label="Payout amount (ETH or whole tokens)"
                    validate={[validators.required, validators.minValue(0)]}
                    placeholder="Enter amount..."
                  />
                </div>
              </div>
            </FormSection.InputGroup>
            {paysTokens ? (
              <FormSection.InputGroup>
                <div className="row">
                  <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                    <Field
                      name="tokenContract"
                      disabled={submittingBounty}
                      component={FormTextInput}
                      label="Token Contract Address"
                      validate={[validators.required, validators.isWeb3Address]}
                      placeholder="Enter token contract address..."
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
            ) : null}
          </FormSection.Section>
          <FormSection.Section title="SAVE OR SUBMIT">
            <FormSection.Description>
              When would you like to submit and activate the bounty?
            </FormSection.Description>
            <FormSection.SubText>
              If you wish to activate the bounty later, you can save it as a
              draft. The requirements for a bounty can only be edited while it
              is in the draft stage. At minimum, your deposit amount must match
              your payout amount.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    name="activateNow"
                    disabled={submittingBounty}
                    component={FormRadioGroup}
                    label="When to activate"
                    options={ACTIVATE_OPTIONS}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  {activateNow ? (
                    <Field
                      name="balance"
                      disabled={submittingBounty}
                      component={FormTextInput}
                      label="Deposit amount (ETH or whole tokens)"
                      validate={[
                        validators.required,
                        (balance, allValues) => {
                          const valueField = allValues.fulfillmentAmount;
                          if (
                            valueField &&
                            BigNumber(balance, 10).toString() <
                              BigNumber(valueField, 10).toString()
                          ) {
                            return 'Deposit amount must at least match the payout amount.';
                          }
                        },
                        validators.minValue(0)
                      ]}
                      normalize={normalizers.number}
                      placeholder="Enter amount..."
                    />
                  ) : null}
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
        </FormSection>
        <div className={styles.buttonContainer}>
          <Button
            type="primary"
            disabled={uploadLoading || (submitFailed && invalid)}
            loading={submittingBounty}
          >
            {submitButtonText}
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
  const uploadedFile = getUploadKeySelector(UPLOAD_KEY)(state);
  const draftState = createDraftStateSelector(state);
  const bountyState = stdBountyStateSelector(state);
  const draftBounty = getDraftBountySelector(state) || {};

  return {
    uploadLoading: uploadedFile ? uploadedFile.uploading : false,
    activateNow: formSelector(state, 'activateNow'),
    paysTokens: formSelector(state, 'paysTokens'),
    categories: categoriesSelector(state),
    submittingBounty: draftState.creating || bountyState.pending,
    uid: draftBounty.uid,
    bountyId: draftBounty.id,
    filename: uploadedFile ? uploadedFile.fileName : draftBounty.sourceFileName,
    minDate: moment().add(1, 'days'),
    fileHash: uploadedFile
      ? uploadedFile.ipfsHash
      : draftBounty.sourceDirectoryHash
  };
};

const CreateBountyForm = compose(
  TransactionWalkthrough({
    dismissable: false
  }),
  connect(
    mapStateToProps,
    {
      uploadFile: uploadActions.uploadFile,
      addCategory: categoryActions.addToCategories,
      createDraft: bountyActions.createDraft,
      updateDraft: bountyActions.updateDraft,
      createBounty: bountyActions.createBounty,
      resetUpload: uploadActions.resetUpload,
      deleteUploadKey: uploadActions.deleteUploadKey
    }
  ),
  reduxForm({
    form: 'createBounty'
  })
)(CreateBountyFormComponent);

export default CreateBountyForm;

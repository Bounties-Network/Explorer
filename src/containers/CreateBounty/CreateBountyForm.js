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
import { rootTokensSelector } from 'public-modules/Tokens/selectors';
import { tokensDropdownDataSelector } from './selectors';
import { TransactionWalkthrough } from 'hocs';
import { Field, reduxForm } from 'redux-form';
import { getTimezone } from 'utils/helpers';
import { BigNumber } from 'bignumber.js';
import { Link } from 'react-router-dom';

import moment from 'moment';
import {
  stdBountyStateSelector,
  createDraftStateSelector,
  getDraftBountySelector,
  getBountySelector
} from 'public-modules/Bounty/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import validators from 'utils/validators';
import asyncValidators from 'utils/asyncValidators';
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
  UPLOAD_KEY,
  VISIBILITY_OPTIONS,
  APPROVAL_OPTIONS
} from './constants';
import config from 'public-modules/config';
import defaultShouldAsyncValidate from 'redux-form/es/defaultShouldAsyncValidate';

const formSelector = formValueSelector('createBounty');

class CreateBountyFormComponent extends React.Component {
  handleCreateBounty = values => {
    const { activateNow, balance, ...bountyValues } = values;
    const {
      filename,
      fileHash,
      createBounty,
      editBounty,
      createDraft,
      uid,
      updateDraft,
      isEditing,
      user,
      bounty_id
    } = this.props;

    const fileData = {
      sourceDirectoryHash: fileHash,
      sourceFileName: filename
    };

    if (isEditing) {
      return editBounty({
        ...bountyValues,
        ...fileData,
        uid,
        balance,
        user,
        bounty_id
      });
    }

    if (activateNow) {
      return createBounty({ ...bountyValues, ...fileData }, balance);
    }

    if (uid) {
      return updateDraft(uid, { ...bountyValues, ...fileData, uid });
    }

    return createDraft({ ...bountyValues, ...fileData });
  };

  handleSubmit = values => {
    const { initiateWalkthrough, isEditing } = this.props;
    const { activateNow } = values;
    if (activateNow || isEditing) {
      return initiateWalkthrough(() => this.handleCreateBounty(values));
    }
    this.handleCreateBounty(values);
  };

  // due to how redux-form renders in 7.4.2, all validators must be defined
  // outside the props of the field component
  validatorGroups = {
    title: [
      validators.required,
      validators.minLength(2),
      validators.maxLength(256)
    ],
    description: [
      validators.required,
      validators.minLength(2),
      validators.maxLength(120000)
    ],
    issuer_name: [validators.required, validators.maxLength(128)],
    issuer_email: [
      validators.required,
      validators.maxLength(128),
      validators.email
    ],
    categories: [validators.required],
    webReferenceURL: [validators.maxLength(256), validators.isURL],
    deadline: [validators.required, validators.minDate(this.props.minDate)],
    token_contract: [validators.required, validators.isWeb3Address],
    fulfillment_amount: [
      validators.required,
      validators.minValue(0),
      (fulfillment_amount, allValues) => {
        const valueField = allValues.balance;
        if (
          valueField &&
          BigNumber(valueField, 10).isLessThan(
            BigNumber(fulfillment_amount, 10)
          )
        ) {
          return 'Payout amount may not be larger than the balance.';
        }
      }
    ],
    balance: [
      validators.required,
      validators.minValue(0),
      (balance, allValues) => {
        const valueField = allValues.fulfillment_amount;
        if (
          valueField &&
          BigNumber(balance, 10).isLessThan(BigNumber(valueField, 10))
        ) {
          return 'Deposit amount must at least match the payout amount.';
        }
      }
    ]
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
      id,
      minDate,
      tokens,
      isEditing,
      initialValues
    } = this.props;
    const { validatorGroups } = this;

    let submitButtonText = 'Create Bounty';
    if (!activateNow) {
      submitButtonText = 'Create Draft';
    }
    if (id && !activateNow) {
      submitButtonText = 'Update Draft';
    }
    if (isEditing) {
      submitButtonText = 'Update Bounty';
    }
    const increaseBalanceUrl = `/bounty/${
      this.props.initialValues.id
    }/?contribute=true`;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <FormSection>
          <FormSection.Section title="ABOUT">
            <FormSection.Description>
              Enter your details about this bounty.
            </FormSection.Description>
            <FormSection.SubText>
              Enter a title and description for your bounty. A{' '}
              <Text
                link
                absolute
                src={'http://www.markdownguide.org/cheat-sheet'}
              >
                markdown
              </Text>{' '}
              preview will automatically be generated as you type, which you can
              view by clicking the preview button. Feel free to use the
              description template provided below, or clear the field to create
              your own.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <Field
                name="title"
                disabled={submittingBounty}
                component={FormTextInput}
                label="Title"
                placeholder="Enter title..."
                validate={validatorGroups.title}
              />
            </FormSection.InputGroup>
            <FormSection.InputGroup>
              <Field
                disabled={submittingBounty}
                name="description"
                component={FormMarkdownEditor}
                label="Description"
                textBoxClassName={styles.markdownEditor}
                validate={validatorGroups.description}
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
                    validate={validatorGroups.issuer_name}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="issuer_email"
                    component={FormTextInput}
                    label="Contact email"
                    placeholder="Enter email..."
                    validate={validatorGroups.issuer_email}
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
                    validate={validatorGroups.categories}
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
                    name="experience_level"
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
                    validate={validatorGroups.webReferenceURL}
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
          {!isEditing && (
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
                      validate={validatorGroups.deadline}
                      showTimeSelect
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
            </FormSection.Section>
          )}
          <FormSection.Section title="PRIVACY">
            <FormSection.Description>
              Do you want to approve people before they can fulfill your bounty?
            </FormSection.Description>
            <FormSection.SubText>
              If you require approval, you will be notified when a user
              indicates their intent to submit, and will be required to approve
              them before they are allowed to complete your bounty.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="fulfillers_need_approval"
                    component={FormRadioGroup}
                    label="Pre-approval Required"
                    options={APPROVAL_OPTIONS}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
            <FormSection.Description>
              Will submissions be visible to everyone?
            </FormSection.Description>
            <FormSection.SubText>
              Submissions can be hidden from other users if desired.
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="private_fulfillments"
                    component={FormRadioGroup}
                    label="Visibility"
                    options={VISIBILITY_OPTIONS}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          {!isEditing && (
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
                    {config.defaultToken ? (
                      <Field
                        name="token_contract"
                        disabled={submittingBounty || !!config.defaultToken}
                        component={FormTextInput}
                        label={
                          !config.defaultToken
                            ? 'Token Contract Address'
                            : `${config.defaultToken.symbol} Contract Address`
                        }
                        validate={validatorGroups.token_contract}
                        placeholder="Enter token contract address..."
                      />
                    ) : (
                      <Field
                        disabled={submittingBounty}
                        name="paysTokens"
                        component={FormRadioGroup}
                        label="Payout Method"
                        options={PAYOUT_OPTIONS}
                      />
                    )}
                  </div>
                  <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                    <Field
                      name="fulfillment_amount"
                      disabled={submittingBounty}
                      component={FormTextInput}
                      type="text"
                      normalize={normalizers.number}
                      label={`Payout amount ${
                        !config.defaultToken ? ' (ETH or whole tokens)' : ''
                      }`}
                      validate={validatorGroups.fulfillment_amount}
                      placeholder="Enter amount..."
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
              {paysTokens && !config.defaultToken ? (
                <FormSection.InputGroup>
                  <div className="row">
                    <div className={`col-xs-12 ${styles.input}`}>
                      <Field
                        disabled={submittingBounty || !!config.defaultToken}
                        name="token_contract"
                        component={FormSearchSelect}
                        label="Token"
                        placeholder="Select token or enter token address..."
                        validate={validatorGroups.token_contract}
                        options={tokens}
                        single={true}
                        clearable={true}
                        creatable={true}
                        labelKey="display"
                        valueKey="value"
                        isLoading={true}
                      />
                    </div>
                  </div>
                </FormSection.InputGroup>
              ) : null}
            </FormSection.Section>
          )}
          {isEditing && (
            <FormSection.Section title="PAYOUT">
              <FormSection.Description>
                Indicate the payout amount
              </FormSection.Description>
              <FormSection.SubText>
                Enter the amount you will award for the completion of this
                bounty. The payout may not be larger than your current balance
                of{' '}
                <span className={styles.textHighlight}>
                  {initialValues.balance} {initialValues.token_symbol}
                </span>, and your current payout is{' '}
                <span className={styles.textHighlight}>
                  {initialValues.fulfillment_amount}{' '}
                  {initialValues.token_symbol}
                </span>. If you would like to add more funds to the bounty,
                please{' '}
                <Link to={increaseBalanceUrl}>increase your balance.</Link>
              </FormSection.SubText>
              <FormSection.InputGroup>
                <div className="row">
                  <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                    <Field
                      name="fulfillment_amount"
                      disabled={submittingBounty}
                      component={FormTextInput}
                      type="text"
                      normalize={normalizers.number}
                      label={`Payout amount ${
                        initialValues.token_symbol
                          ? '(' + initialValues.token_symbol + ')'
                          : ''
                      }`}
                      validate={validatorGroups.fulfillment_amount}
                      placeholder="Enter amount..."
                    />
                  </div>
                </div>
              </FormSection.InputGroup>
              {paysTokens && !config.defaultToken ? (
                <FormSection.InputGroup>
                  <div className="row">
                    <div className={`col-xs-12 ${styles.input}`}>
                      <Field
                        disabled={submittingBounty || !!config.defaultToken}
                        name="token_contract"
                        component={FormSearchSelect}
                        label="Token"
                        placeholder="Select token or enter token address..."
                        validate={validatorGroups.token_contract}
                        options={tokens}
                        single={true}
                        clearable={true}
                        creatable={true}
                        labelKey="display"
                        valueKey="value"
                        isLoading={true}
                      />
                    </div>
                  </div>
                </FormSection.InputGroup>
              ) : null}
            </FormSection.Section>
          )}
          {!isEditing && (
            <FormSection.Section title="SAVE OR SUBMIT">
              <FormSection.Description>
                When would you like to submit and activate the bounty?
              </FormSection.Description>
              <FormSection.SubText>
                If you wish to activate the bounty later, you can save it as a
                draft. The requirements for a bounty can only be edited while it
                is in the draft stage. At minimum, your deposit amount must
                match your payout amount.
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
                        validate={validatorGroups.balance}
                        normalize={normalizers.number}
                        placeholder="Enter amount..."
                      />
                    ) : null}
                    {/* this hidden field is added as a duplicate to the above
                    balance field because when a field is unregistered in
                    redux-form it is possible to submit invalid info.
                    https://github.com/erikras/redux-form/issues/4235 */}
                    {activateNow ? (
                      <div className={styles.hidden}>
                        <Field
                          name="balance"
                          disabled={submittingBounty}
                          component={FormTextInput}
                          validate={validatorGroups.balance}
                          normalize={normalizers.number}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </FormSection.InputGroup>
            </FormSection.Section>
          )}
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

const mapStateToProps = (state, router) => {
  let isDraft = false;
  if (router.match.path === '/createBounty/draft/:id/') {
    isDraft = true;
  }
  const uploadedFile = getUploadKeySelector(UPLOAD_KEY)(state);
  const draftState = createDraftStateSelector(state);
  const bountyState = stdBountyStateSelector(state);
  const draftBounty = isDraft ? getDraftBountySelector(state) || {} : {};
  const rootTokens = rootTokensSelector(state);
  const tokens = tokensDropdownDataSelector(state);
  const user = getCurrentUserSelector(state) || {};
  const bounty = getBountySelector(state) || {};

  return {
    uploadLoading: uploadedFile ? uploadedFile.uploading : false,
    activateNow: formSelector(state, 'activateNow'),
    paysTokens: formSelector(state, 'paysTokens'),
    categories: categoriesSelector(state),
    submittingBounty: draftState.creating || bountyState.pending,
    uid: draftBounty.uid,
    id: draftBounty.id,
    bounty_id: bounty.bounty_id,
    user: user,
    filename: uploadedFile ? uploadedFile.fileName : draftBounty.sourceFileName,
    minDate: moment().add(1, 'days'),
    fileHash: uploadedFile
      ? uploadedFile.ipfsHash
      : draftBounty.sourceDirectoryHash,
    loadingTokens: rootTokens.loading,
    errorLoadingTokens: rootTokens.error,
    tokens
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
      editBounty: bountyActions.editBounty,
      updateDraft: bountyActions.updateDraft,
      createBounty: bountyActions.createBounty,
      resetUpload: uploadActions.resetUpload,
      deleteUploadKey: uploadActions.deleteUploadKey
    }
  ),
  reduxForm({
    form: 'createBounty',
    asyncValidate: (values, dispatch, props, field) => {
      return asyncValidators.tokenValidationWrapper(
        {
          ...values,
          ethAddress: '0x0000000000000000000000000000000000000000'
        },
        'balance',
        values.paysTokens ? 'token_contract' : 'ethAddress',
        values.activateNow,
        props.asyncValidating,
        field,
        dispatch
      );
    },
    asyncChangeFields: ['balance', 'token_contract', 'activateNow'],

    // there is a bug in redux-form where shouldAsyncValidate is called before
    // the sync validation errors are remove from the store and therefore the
    // async validator is not called on the first change after a sync error.
    // https://github.com/erikras/redux-form/issues/3944
    shouldAsyncValidate: params => {
      return defaultShouldAsyncValidate({
        ...params,
        syncValidationPasses: true
      });
    }
  })
)(CreateBountyFormComponent);

export default CreateBountyForm;

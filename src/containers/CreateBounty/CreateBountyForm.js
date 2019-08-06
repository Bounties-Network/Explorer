import React from 'react';
import styles from './CreateBounty.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormSection } from 'explorer-components';
import { getUploadKeySelector } from 'public-modules/FileUpload/selectors';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { actions as uploadActions } from 'public-modules/FileUpload';
import { actions as categoryActions } from 'public-modules/Categories';
import { actions as bountyActions } from 'public-modules/Bounty';
import { categoriesSelector } from 'public-modules/Categories/selectors';
import { rootTokensSelector } from 'public-modules/Tokens/selectors';
import { tokensDropdownDataSelector } from './selectors';
import { TransactionWalkthrough } from 'hocs';
import { getTimezone } from 'utils/helpers';
import { BigNumber } from 'bignumber.js';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import moment from 'moment';
import {
  createDraftStateSelector,
  getDraftBountySelector,
  getBountySelector,
  stdBountyStateSelector
} from 'public-modules/Bounty/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import validators from 'utils/validators';
import asyncValidators from 'utils/asyncValidators';
import normalizers from 'utils/normalizers';
import { Button, FileUpload, Text, Select } from 'components';
import {
  FormDatePicker,
  FormMarkdownEditor,
  FormNumberInput,
  FormRadioGroup,
  FormSearchSelect,
  FormTextInput
} from 'form-components';
import {
  ACTIVATE_OPTIONS,
  APPROVAL_OPTIONS,
  DIFFICULTY_OPTIONS,
  PAYOUT_OPTIONS,
  UPLOAD_KEY,
  VISIBILITY_OPTIONS
} from './constants';
import config from 'public-modules/config';
import defaultShouldAsyncValidate from 'redux-form/es/defaultShouldAsyncValidate';
import { translateOption } from '../../utils/i18nHelpers';
import intl from 'react-intl-universal';

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

    <Link />; // silences compiler warnings since Link is actually used
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
          return intl.get('sections.create_bounty.payout_warning');
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
          return intl.get('sections.create_bounty.deposit_warning');
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
      initialValues,
      options,
      handleBounty
    } = this.props;

    const { validatorGroups } = this;

    let submitButtonText = intl.get('sections.create_bounty.actions.create');
    if (!activateNow) {
      submitButtonText = intl.get('sections.create_bounty.actions.draft');
    }
    if (id && !activateNow) {
      submitButtonText = intl.get(
        'sections.create_bounty.actions.update_draft'
      );
    }
    if (isEditing) {
      submitButtonText = intl.get(
        'sections.create_bounty.actions.update_bounty'
      );
    }
    const increaseBalanceUrl = `/bounty/${
      this.props.initialValues.id
    }/?contribute=true`;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <FormSection>
          <FormSection.Section
            title={intl.get('sections.create_bounty.sections.about.title')}
          >
            <FormSection.Description>
              {intl.get('sections.create_bounty.sections.about.description')}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.getHTML('sections.create_bounty.sections.about.notice')}
              <Text
                link
                absolute
                src={'http://www.markdownguide.org/cheat-sheet'}
              >
                markdown
              </Text>
              {intl.getHTML('sections.create_bounty.sections.about.notice2')}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <Field
                name="title"
                disabled={submittingBounty}
                component={FormTextInput}
                label={intl.get(
                  'sections.create_bounty.sections.about.form.title.label'
                )}
                placeholder={intl.get(
                  'sections.create_bounty.sections.about.form.title.placeholder'
                )}
                validate={validatorGroups.title}
              />
            </FormSection.InputGroup>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <Select
                  label="Description template"
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'Proof of action', label: 'Proof of action' },
                    { value: 'Code', label: 'Code' },
                    { value: 'Graphic design', label: 'Graphic design' },
                    { value: 'Translation', label: 'Translation' },
                    { value: 'Idea generation', label: 'Idea generation' },
                    {
                      value: 'Feedback & critique',
                      label: 'Feedback & critique'
                    },
                    { value: 'Survey', label: 'Survey' },
                    { value: 'Recruitment', label: 'Recruitment' }
                  ]}
                />
              </div>
              <div className="col-xs-12">
                <div className={styles.formHelper}>
                  <FontAwesomeIcon
                    icon={['far', 'info-circle']}
                    className={styles.formHelperIcon}
                  />
                  <Text
                    fontStyle="italic"
                    typeScale="Small"
                    color="blue"
                    lineHeight="lineHeight-default"
                  >
                    This is a short description of the template that has been
                    selected above. It provides some insight into how this
                    template might be used, in addition to some potential
                    example use cases.
                  </Text>
                </div>
              </div>
            </div>
            <FormSection.InputGroup>
              <Field
                disabled={submittingBounty}
                name="description"
                component={FormMarkdownEditor}
                textBoxClassName={styles.markdownEditor}
                validate={validatorGroups.description}
              />
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section
            title={intl.get('sections.create_bounty.sections.contact.title')}
          >
            <FormSection.Description>
              {intl.get('sections.create_bounty.sections.contact.description')}
            </FormSection.Description>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="issuer_name"
                    component={FormTextInput}
                    label={intl.get(
                      'sections.create_bounty.sections.contact.form.issuer_name.label'
                    )}
                    placeholder={intl.get(
                      'sections.create_bounty.sections.contact.form.issuer_name.placeholder'
                    )}
                    validate={validatorGroups.issuer_name}
                  />
                </div>
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="issuer_email"
                    component={FormTextInput}
                    label={intl.get(
                      'sections.create_bounty.sections.contact.form.issuer_email.label'
                    )}
                    placeholder={intl.get(
                      'sections.create_bounty.sections.contact.form.issuer_email.placeholder'
                    )}
                    validate={validatorGroups.issuer_email}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section
            title={intl.get('sections.create_bounty.sections.details.title')}
          >
            <FormSection.Description>
              {intl.get('sections.create_bounty.sections.details.description')}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.get('sections.create_bounty.sections.details.notice')}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="categories"
                    component={FormSearchSelect}
                    label={intl.get(
                      'sections.create_bounty.sections.details.form.categories.label'
                    )}
                    placeholder={intl.get(
                      'sections.create_bounty.sections.details.form.categories.placeholder'
                    )}
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
                    label={intl.get(
                      'sections.create_bounty.sections.details.form.experience_level.label'
                    )}
                    options={DIFFICULTY_OPTIONS.map(option =>
                      translateOption(
                        'sections.create_bounty.sections.details.form.experience_level.options',
                        option
                      )
                    )}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          <FormSection.Section
            title={intl.get('sections.create_bounty.sections.revisions.title')}
          >
            <FormSection.Description>
              {intl.get(
                'sections.create_bounty.sections.revisions.description'
              )}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.get('sections.create_bounty.sections.revisions.notice')}
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
          <FormSection.Section
            title={intl.get(
              'sections.create_bounty.sections.attachments.title'
            )}
          >
            <FormSection.Description>
              {intl.get(
                'sections.create_bounty.sections.attachments.description'
              )}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.get('sections.create_bounty.sections.attachments.notice')}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    name="webReferenceURL"
                    disabled={submittingBounty}
                    component={FormTextInput}
                    type="text"
                    label={intl.get(
                      'sections.create_bounty.sections.attachments.form.url.label'
                    )}
                    validate={validatorGroups.webReferenceURL}
                    placeholder={intl.get(
                      'sections.create_bounty.sections.attachments.form.url.placeholder'
                    )}
                  />
                </div>
                <div
                  className={`col-xs-12 col-sm-6 ${styles.input}`}
                  style={{ display: 'none' }}
                >
                  <Text inputLabel color="defaultGrey">
                    {intl.get(
                      'sections.create_bounty.sections.attachments.form.file.label'
                    )}
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
            <FormSection.Section
              title={intl.get('sections.create_bounty.sections.deadline.title')}
            >
              <FormSection.Description>
                {intl.get(
                  'sections.create_bounty.sections.deadline.description'
                )}
              </FormSection.Description>
              <FormSection.SubText>
                {intl.get('sections.create_bounty.sections.deadline.notice', {
                  timezone: getTimezone()
                })}
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
          <FormSection.Section
            title={intl.get('sections.create_bounty.sections.privacy.title')}
          >
            <FormSection.Description>
              {intl.get(
                'sections.create_bounty.sections.privacy.form.private_fullfillments.description'
              )}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.get(
                'sections.create_bounty.sections.privacy.form.private_fullfillments.notice'
              )}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="fulfillers_need_approval"
                    component={FormRadioGroup}
                    label={intl.get(
                      'sections.create_bounty.sections.privacy.form.fulfillers_need_approval.label'
                    )}
                    options={APPROVAL_OPTIONS.map(option =>
                      translateOption(
                        'sections.create_bounty.sections.privacy.form.fulfillers_need_approval.options',
                        option
                      )
                    )}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
            <FormSection.Description>
              {intl.get('sections.create_bounty.sections.privacy.description')}
            </FormSection.Description>
            <FormSection.SubText>
              {intl.get('sections.create_bounty.sections.privacy.notice')}
            </FormSection.SubText>
            <FormSection.InputGroup>
              <div className="row">
                <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                  <Field
                    disabled={submittingBounty}
                    name="private_fulfillments"
                    component={FormRadioGroup}
                    label={intl.get(
                      'sections.create_bounty.sections.privacy.form.private_fullfillments.label'
                    )}
                    options={VISIBILITY_OPTIONS.map(option =>
                      translateOption(
                        'sections.create_bounty.sections.privacy.form.private_fullfillments.options',
                        option
                      )
                    )}
                  />
                </div>
              </div>
            </FormSection.InputGroup>
          </FormSection.Section>
          {!isEditing && (
            <FormSection.Section
              title={intl.get('sections.create_bounty.sections.payout.title')}
            >
              <FormSection.Description>
                {intl.get('sections.create_bounty.sections.payout.description')}
              </FormSection.Description>
              <FormSection.SubText>
                {intl.get('sections.create_bounty.sections.payout.notice')}
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
                            ? intl.get(
                                'sections.create_bounty.sections.payout.form.token_contract.label_default'
                              )
                            : intl.get(
                                'sections.create_bounty.sections.payout.form.token_contract.label_custom',
                                { token: config.defaultToken.symbol }
                              )
                        }
                        validate={validatorGroups.token_contract}
                        placeholder={intl.get(
                          'sections.create_bounty.sections.payout.form.token_contract.placeholder'
                        )}
                      />
                    ) : (
                      <Field
                        disabled={submittingBounty}
                        name="paysTokens"
                        component={FormRadioGroup}
                        label={intl.get(
                          'sections.create_bounty.sections.payout.form.method.label'
                        )}
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
                      label={intl.get(
                        'sections.create_bounty.sections.payout.form.fulfillment_amount.label',
                        { hasDefaultToken: !config.defaultToken }
                      )}
                      validate={validatorGroups.fulfillment_amount}
                      placeholder={intl.get(
                        'sections.create_bounty.sections.payout.form.fulfillment_amount.placeholder'
                      )}
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
            <FormSection.Section
              title={intl.get(
                'sections.create_bounty.sections.payout_editing.title'
              )}
            >
              <FormSection.Description>
                {intl.get(
                  'sections.create_bounty.sections.payout_editing.description'
                )}
              </FormSection.Description>
              <FormSection.SubText>
                {intl.getHTML(
                  'sections.create_bounty.sections.payout_editing.notice',
                  {
                    textHighlight: styles.textHighlight,
                    balance: initialValues.balance,
                    token_symbol: initialValues.token_symbol,
                    increaseBalanceUrl: increaseBalanceUrl
                  }
                )}
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
                      label={intl.get(
                        'sections.create_bounty.sections.payout_editing.form.fulfillment_amount.label',
                        { hasDefaultToken: !config.defaultToken }
                      )}
                      validate={validatorGroups.fulfillment_amount}
                      placeholder={intl.get(
                        'sections.create_bounty.sections.payout_editing.form.fulfillment_amount.placeholder'
                      )}
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
            <FormSection.Section
              title={intl.get('sections.create_bounty.sections.save.title')}
            >
              <FormSection.Description>
                {intl.get('sections.create_bounty.sections.save.description')}
              </FormSection.Description>
              <FormSection.SubText>
                {intl.get('sections.create_bounty.sections.save.notice')}
              </FormSection.SubText>
              <FormSection.InputGroup>
                <div className="row">
                  <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                    <Field
                      name="activateNow"
                      disabled={submittingBounty}
                      component={FormRadioGroup}
                      label={intl.get(
                        'sections.create_bounty.sections.save.form.activate_now.label'
                      )}
                      options={ACTIVATE_OPTIONS.map(option =>
                        translateOption(
                          'sections.create_bounty.sections.save.form.activate_now.options',
                          option
                        )
                      )}
                    />
                  </div>
                  <div className={`col-xs-12 col-sm-6 ${styles.input}`}>
                    {activateNow ? (
                      <Field
                        name="balance"
                        disabled={submittingBounty}
                        component={FormTextInput}
                        label={intl.get(
                          'sections.create_bounty.sections.save.form.balance.label'
                        )}
                        validate={validatorGroups.balance}
                        normalize={normalizers.number}
                        placeholder={intl.get(
                          'sections.create_bounty.sections.save.form.balance.placeholder'
                        )}
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
            onClick={() => handleBounty(submitFailed && invalid)}
            type="primary"
            disabled={uploadLoading || (submitFailed && invalid)}
            loading={submittingBounty}
          >
            {submitButtonText}
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

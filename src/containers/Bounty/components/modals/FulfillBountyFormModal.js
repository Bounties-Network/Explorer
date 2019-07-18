import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Modals.module.scss';
import { getUploadKeySelector } from 'public-modules/FileUpload/selectors';
import { actions as fileUploadActions } from 'public-modules/FileUpload';
import { Button, FileUpload, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import { ModalFormReset } from 'hocs';
import validators from 'utils/validators';
import { FormTextInput, FormMarkdownEditor } from 'form-components';
import intl from 'react-intl-universal';

let FulfillBountyFormModalComponent = props => {
  const {
    handleSubmit,
    onClose,
    onSubmit,
    uploadFile,
    resetUpload,
    private_fulfillments,
    submitFailed,
    invalid,

    // upload state
    uploading,
    ipfsHash,
    fileName,
    visible
  } = props;

  const submitFulfillment = values => {
    onSubmit({ ...values, ipfsHash, fileName });
  };

  const closeAndReset = () => {
    resetUpload('fulfillment');
    onClose();
  };

  const validatorGroups = {
    name: [validators.required, validators.maxLength(128)],
    email: [validators.email],
    url: [validators.maxLength(256), validators.isURL],
    description: [validators.minLength(2), validators.maxLength(120000)]
  };

  return (
    <form onSubmit={handleSubmit(values => submitFulfillment(values))}>
      <Modal
        dismissable={false}
        onClose={closeAndReset}
        visible={visible}
        fixed
        size="medium"
      >
        <Modal.Header closable={true}>
          <Modal.Message>
            {intl.get('sections.bounty.modals.fulfill_bounty.title')}
          </Modal.Message>
          <Modal.Description>
            {intl.getHTML('sections.bounty.modals.fulfill_bounty.description')}
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <div className="row">
            <div className={`col-xs-12 col-sm ${styles.fulfillmentInput}`}>
              <Field
                name="name"
                component={FormTextInput}
                type="text"
                label={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.name.label'
                )}
                validate={validatorGroups.name}
                placeholder={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.name.placeholder'
                )}
              />
            </div>
            <div className={`col-xs-12 col-sm ${styles.fulfillmentInput}`}>
              <Field
                name="email"
                component={FormTextInput}
                type="text"
                label={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.email.label'
                )}
                validate={validatorGroups.email}
                placeholder={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.email.placeholder'
                )}
              />
            </div>
          </div>
          <div className={`row ${styles.fulfillmentInput}`}>
            <div className="col-xs">
              <Field
                name="url"
                component={FormTextInput}
                type="text"
                label={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.url.label'
                )}
                validate={validatorGroups.url}
                placeholder={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.url.placeholder'
                )}
              />
            </div>
          </div>
          <div
            className={`row ${styles.fulfillmentInput}`}
            style={{ display: 'none' }}
          >
            <div className="col-xs">
              <Text inputLabel>Attachment</Text>
              <FileUpload
                disabled={uploading}
                onChange={file =>
                  file
                    ? uploadFile('fulfillment', file)
                    : resetUpload('fulfillment')
                }
                loading={uploading}
                filename={fileName}
              />
            </div>
          </div>
          <div className={`row ${styles.fulfillmentInput}`}>
            <div className="col-xs">
              <Field
                name="description"
                component={FormMarkdownEditor}
                type="text"
                label={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.description.label'
                )}
                validate={validatorGroups.description}
                placeholder={intl.get(
                  'sections.bounty.modals.fulfill_bounty.form.description.placeholder'
                )}
                hidePreview={true}
              />
            </div>
          </div>

          <div className={`row ${styles.fulfillmentInput}`}>
            <div className="col-xs">
              <Text fontStyle="italic" color="defaultGrey">
                {private_fulfillments
                  ? intl.get(
                      'sections.bounty.modals.fulfill_bounty.form.private_notice'
                    )
                  : intl.get(
                      'sections.bounty.modals.fulfill_bounty.form.public_notice'
                    )}
              </Text>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {submitFailed &&
            invalid && (
              <Text inputLabel color="red">
                {intl.get('errors.form_error')}
              </Text>
            )}
          <Button
            margin
            disabled={uploading}
            onClick={e => {
              e.preventDefault();
              closeAndReset();
            }}
          >
            {intl.get('actions.cancel')}
          </Button>
          <Button
            type="primary"
            buttonType="submit"
            disabled={uploading || (submitFailed && invalid)}
          >
            {intl.get('actions.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

FulfillBountyFormModalComponent = compose(
  reduxForm({
    form: 'fulfillBounty',
    destroyOnUnmount: false
  }),
  ModalFormReset
)(FulfillBountyFormModalComponent);

const mapStateToProps = (state, props) => {
  const { name, email } = props;
  const uploadState = getUploadKeySelector('fulfillment')(state);

  return {
    initialValues: { name, email },
    uploading: uploadState ? uploadState.uploading : false,
    error: uploadState ? uploadState.error : false,
    ipfsHash: uploadState ? uploadState.ipfsHash : '',
    fileName: uploadState ? uploadState.fileName : ''
  };
};

const FulfillBountyFormModal = compose(
  connect(
    mapStateToProps,
    {
      uploadFile: fileUploadActions.uploadFile,
      resetUpload: fileUploadActions.resetUpload
    }
  )
)(FulfillBountyFormModalComponent);

export default FulfillBountyFormModal;

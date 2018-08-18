import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Modals.module.scss';
import { getUploadKeySelector } from 'public-modules/FileUpload/selectors';
import { actions as fileUploadActions } from 'public-modules/FileUpload';
import { Button, FileUpload, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextInput, FormTextbox } from 'form-components';

let FulfillBountyFormModalComponent = props => {
  const {
    handleSubmit,
    onClose,
    onSubmit,
    uploadFile,
    resetUpload,

    // upload state
    uploading,
    error,
    ipfsHash,
    fileName
  } = props;

  const submitFulfillment = values => {
    onSubmit({ ...values, ipfsHash, fileName });
  };

  const closeAndReset = () => {
    resetUpload('fulfillment');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(values => submitFulfillment(values))}>
      <Modal
        dismissable={true}
        onClose={closeAndReset}
        visible={true}
        fixed
        size="medium"
      >
        <Modal.Header closable={true}>
          <Modal.Message>Enter submission details</Modal.Message>
          <Modal.Description>
            Enter and submit the details for your bounty submission, including
            any files or links that may be required for fulfillment as indicated
            by the bounty description.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <div className="row">
            <div className="col-xs">
              <Field
                name="name"
                component={FormTextInput}
                type="string"
                label="Contact name"
                validate={[]}
                placeholder="Enter name..."
              />
            </div>
            <div className="col-xs">
              <Field
                name="email"
                component={FormTextInput}
                type="string"
                label="Contact email"
                validate={[validators.email]}
                placeholder="Enter email..."
              />
            </div>
          </div>
          <div className={`row ${styles.fulfillmentInput}`}>
            <div className="col-xs">
              <Field
                name="url"
                component={FormTextInput}
                type="string"
                label="Web link"
                validate={[]}
                placeholder="Enter URL..."
              />
            </div>
          </div>
          <div className={`row ${styles.fulfillmentInput}`}>
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
                component={FormTextbox}
                type="string"
                label="Description"
                validate={[validators.required]}
                placeholder="Enter description..."
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            margin
            disabled={uploading}
            onClick={e => {
              e.preventDefault();
              closeAndReset();
            }}
          >
            Cancel
          </Button>
          <Button disabled={uploading} type="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

FulfillBountyFormModalComponent = reduxForm({ form: 'fulfillBounty' })(
  FulfillBountyFormModalComponent
);

const mapStateToProps = (state, router) => {
  const uploadState = getUploadKeySelector('fulfillment')(state);

  return {
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

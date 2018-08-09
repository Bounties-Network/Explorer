import React from 'react';
import styles from './Modals.module.scss';
import { FileUpload, Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { BigNumber } from 'bignumber.js';
import validators from 'utils/validators';
import { FormTextInput, FormTextbox } from 'form-components';

const FulfillBountyFormModal = props => {
  const {
    onClose,
    onSubmit,
    handleSubmit,
    uploadFile,
    resetUpload,
    uploadState,
    uploadKey
  } = props;
  const uploading = uploadState ? uploadState.uploading : false;
  const uploaded = uploadState ? uploadState.uploaded : false;
  const error = uploadState ? uploadState.error : false;
  const ipfsHash = uploadState ? uploadState.ipfsHash : '';
  const fileName = uploadState ? uploadState.fileName : '';

  const submitFulfillment = values => {
    onSubmit({ ...values, ipfsHash, fileName });
  };

  const closeAndReset = () => {
    resetUpload(uploadKey);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(values => submitFulfillment(values))}>
      <Modal
        dismissable={true}
        onClose={closeAndReset}
        visible={true}
        fixed
        size="small"
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
            <div className="col-xs-6">
              <Field
                name="name"
                component={FormTextInput}
                type="string"
                label="Contact name"
                validate={[]}
                placeholder="Enter name..."
              />
            </div>
            <div className="col-xs-6">
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
            <div className="col-xs-12">
              <Field
                name="link"
                component={FormTextInput}
                type="string"
                label="Web link"
                validate={[]}
                placeholder="Enter URL..."
              />
            </div>
          </div>
          <div className={`row ${styles.fulfillmentInput}`}>
            <div className="col-xs-12">
              <FileUpload
                disabled={uploading}
                onChange={file =>
                  file ? uploadFile(uploadKey, file) : resetUpload(uploadKey)
                }
                loading={uploading}
                filename={fileName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Field
                name="description"
                component={FormTextbox}
                type="string"
                label="Description"
                validate={[]}
                placeholder="Enter description..."
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              closeAndReset();
            }}
          >
            Cancel
          </Button>
          <Button type="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default reduxForm({ form: 'fulfillBounty' })(FulfillBountyFormModal);

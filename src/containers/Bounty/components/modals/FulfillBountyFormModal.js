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
import { FormTextInput, FormTextbox } from 'form-components';

let FulfillBountyFormModalComponent = props => {
  const {
    handleSubmit,
    onClose,
    onSubmit,
    uploadFile,
    resetUpload,
    privateFulfillments,

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

  return (
    <form onSubmit={handleSubmit(values => submitFulfillment(values))}>
      <Modal
        dismissable={true}
        onClose={closeAndReset}
        visible={visible}
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
            <div className={`col-xs-12 col-sm ${styles.fulfillmentInput}`}>
              <Field
                name="name"
                component={FormTextInput}
                type="text"
                label="Contact name"
                validate={[]}
                placeholder="Enter name..."
              />
            </div>
            <div className={`col-xs-12 col-sm ${styles.fulfillmentInput}`}>
              <Field
                name="email"
                component={FormTextInput}
                type="text"
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
                type="text"
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
                type="text"
                label="Description"
                validate={[validators.required]}
                placeholder="Enter description..."
              />
            </div>
          </div>

          <div className={`row ${styles.fulfillmentInput}`}>
            <div className="col-xs">
              <Text fontStyle="italic" color="defaultGrey">
                {privateFulfillments
                  ? 'All information entered here will be stored on the public Ethereum network, but will be hidden on the site.'
                  : 'All information entered here will be stored on the public Ethereum network, and will be publicly displayed on the site.'}
              </Text>
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
          <Button disabled={uploading} type="primary" buttonType="submit">
            Submit
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

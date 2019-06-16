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

let error = false;

class FulfillBountyFormModalComponent extends React.Component {
  submitFulfillment = values => {
    const ipfsHash = this.props.ipfsHash;
    const fileName = this.props.fileName;
    this.props.onSubmit({ ...values, ipfsHash, fileName });
  };

  closeAndReset = () => {
    this.props.resetUpload('fulfillment');
    this.props.onClose();
  };

  validatorGroups = {
    name: [validators.required, validators.maxLength(128)],
    email: [validators.email],
    url: [validators.maxLength(256), validators.isURL],
    description: [
      validators.required,
      validators.minLength(2),
      validators.maxLength(120000)
    ]
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values =>
          this.submitFulfillment(values)
        )}
      >
        <Modal
          dismissable={true}
          onClose={this.closeAndReset}
          visible={this.props.visible}
          fixed
          size="medium"
        >
          <Modal.Header closable={true}>
            <Modal.Message>Enter submission details</Modal.Message>
            <Modal.Description>
              Enter and submit the details for your bounty submission, including
              any files or links that may be required for fulfillment as
              indicated by the bounty description.
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
                  validate={this.validatorGroups.name}
                  placeholder="Enter name..."
                />
              </div>
              <div className={`col-xs-12 col-sm ${styles.fulfillmentInput}`}>
                <Field
                  name="email"
                  component={FormTextInput}
                  type="text"
                  label="Contact email"
                  validate={this.validatorGroups.email}
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
                  validate={this.validatorGroups.url}
                  placeholder="Enter URL..."
                />
              </div>
            </div>
            <div className={`row ${styles.fulfillmentInput}`}>
              <div className="col-xs">
                <Text inputLabel>Attachment</Text>
                <FileUpload
                  disabled={this.props.uploading}
                  onChange={file =>
                    file
                      ? this.props.uploadFile('fulfillment', file)
                      : this.props.resetUpload('fulfillment')
                  }
                  loading={this.props.uploading}
                  filename={this.props.fileName}
                  error={error}
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
                  validate={this.validatorGroups.description}
                  placeholder="Enter description..."
                />
              </div>
            </div>

            <div className={`row ${styles.fulfillmentInput}`}>
              <div className="col-xs">
                <Text fontStyle="italic" color="defaultGrey">
                  {this.props.private_fulfillments
                    ? 'All information entered here will be stored on the public Ethereum network, but will be hidden on the site.'
                    : 'All information entered here will be stored on the public Ethereum network, and will be publicly displayed on the site.'}
                </Text>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {this.props.submitFailed &&
              this.props.invalid && (
                <Text inputLabel color="red">
                  Fix errors before submitting.
                </Text>
              )}
            <Button
              margin
              disabled={this.props.uploading}
              onClick={e => {
                e.preventDefault();
                this.closeAndReset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              buttonType="submit"
              disabled={
                this.props.uploading ||
                (this.props.submitFailed && this.props.invalid)
              }
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

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
  error = uploadState ? uploadState.error : false;
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

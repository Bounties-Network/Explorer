import React from 'react';
import styles from './IssueRatingFormModal.module.scss';
import { Button, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextbox, FormRating } from 'form-components';
import BountyDetails from './BountyDetails';

const messageTemplate = {
  issuer: [
    'Your bounty submission was accepted! If you would like, you can rate your experience with the following bounty issuer:',
    'This will help set expectations for other fulfillers on the platform.'
  ],
  fulfiller: [
    'You accepted a submission to your bounty! If you would like, you can rate your experience with the following fulfiller:',
    'This will help set expectations for other issuers on the platform.'
  ]
};

const IssueRatingFormModal = props => {
  const { onClose, handleSubmit, type, bounty } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={true}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>
            <BountyDetails bounty={bounty} />
            <Text typeScale="h3">Rate {type}</Text>
          </Modal.Message>
          <Modal.Description>
            <div className={`row ${styles.centerColumn}`}>
              <div className="col-xs-8">
                <Text color="defaultGrey">{messageTemplate[type][0]}</Text>
                <Text color="defaultGrey">{messageTemplate[type][1]}</Text>
              </div>
            </div>
            <div className={`row ${styles.review} ${styles.centerColumn}`}>
              <div className="col-xs-10">
                <div className={styles.inputGroup}>
                  <Field
                    name="rating"
                    component={FormRating}
                    type="string"
                    label="Rating"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <Field
                    name="text"
                    component={FormTextbox}
                    type="string"
                    label="Mini review"
                    validate={[]}
                    placeholder="Enter review..."
                  />
                </div>
              </div>
            </div>
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody} />
        <Modal.Footer>
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              onClose();
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

export default reduxForm({ form: 'issueRating' })(IssueRatingFormModal);

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './IssueRatingFormModal.module.scss';
import { Avatar, Button, Modal, Text } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { FormTextbox, FormRating } from 'form-components';
import { actions as reviewActions } from 'public-modules/Review';
import { rootReviewSelector } from 'public-modules/Review/selectors';
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

const IssueRatingFormModalComponent = props => {
  const {
    onClose,
    handleSubmit,
    postReview,
    type,
    bounty,
    fulfillmentId,
    name,
    address,
    img,
    posting
  } = props;

  const handleReview = values => {
    const { rating, review } = values;

    postReview(bounty.id, fulfillmentId, rating, review);
  };

  return (
    <form onSubmit={handleSubmit(handleReview)}>
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
                <div className={styles.avatar}>
                  <Avatar
                    name={name}
                    address={address}
                    hash={address}
                    img={img}
                  />
                </div>
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
                    name="review"
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
            disabled={posting}
          >
            Cancel
          </Button>
          <Button type="primary" loading={posting} disabled={posting}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

const mapStateToProps = state => {
  const reviewState = rootReviewSelector(state);

  return {
    posting: reviewState.posting
  };
};

const IssueRatingFormModal = compose(
  connect(
    mapStateToProps,
    {
      postReview: reviewActions.postReview
    }
  )
)(IssueRatingFormModalComponent);

export default reduxForm({ form: 'issueRating' })(IssueRatingFormModal);

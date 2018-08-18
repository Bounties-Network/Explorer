import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './IssueRatingFormModal.module.scss';
import { Avatar, Button, Modal, Text, Loader } from 'components';
import { LoadComponent } from 'hocs';
import { Field, reduxForm } from 'redux-form';
import { FormTextbox, FormRating } from 'form-components';
import { actions as reviewActions } from 'public-modules/Review';
import { actions as revieweeActions } from './reducer';
import { rootRevieweeSelector } from './selectors';
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
    submitFailed,
    invalid,
    postReview,
    reviewee,
    type,
    bounty,
    fulfillmentId,
    loading,
    error,
    posting,
    postingError
  } = props;

  const { name, address, img } = reviewee;

  const handleReview = values => {
    const { rating, review } = values;

    postReview(bounty.id, fulfillmentId, rating, review);
  };

  let revieweeAvatar = (
    <Avatar name={name} address={address} hash={address} img={img} />
  );

  if (loading) {
    revieweeAvatar = <Loader size="medium" color="blue" />;
  }

  if (error) {
    revieweeAvatar = null;
  }

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
                <div className={styles.avatar}>{revieweeAvatar}</div>
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
                    validate={[validators.required]}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <Field
                    name="review"
                    component={FormTextbox}
                    type="string"
                    label="Mini review"
                    validate={[validators.required]}
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

          {submitFailed &&
            invalid && (
              <Text inputLabel color="red" className={styles.submitError}>
                Fix errors before submitting.
              </Text>
            )}

          {postingError && (
            <Text inputLabel color="red" className={styles.submitError}>
              Something went wrong. Please try again later.
            </Text>
          )}
        </Modal.Footer>
      </Modal>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => {
  const reviewState = rootReviewSelector(state);
  const revieweeState = rootRevieweeSelector(state);
  const { bounty, fulfillmentId, type } = ownProps;

  return {
    reviewee: revieweeState.reviewee,
    loading: revieweeState.loading,
    error: revieweeState.error,
    posting: reviewState.posting,
    postingError: reviewState.postingError,

    identifiers: {
      bountyId: bounty.id,
      fulfillmentId,
      type
    }
  };
};

const IssueRatingFormModal = compose(
  connect(
    mapStateToProps,
    {
      load: revieweeActions.loadReviewee,
      postReview: reviewActions.postReview
    }
  ),
  reduxForm({ form: 'issueRating' }),
  LoadComponent('identifiers')
)(IssueRatingFormModalComponent);

export default IssueRatingFormModal;

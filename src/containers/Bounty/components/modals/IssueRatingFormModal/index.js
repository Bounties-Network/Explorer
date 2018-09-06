import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './IssueRatingFormModal.module.scss';
import { Avatar, Button, Modal, Text, Loader } from 'components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { ModalFormReset } from 'hocs';
import { FormTextbox, FormRating } from 'form-components';
import { actions as reviewActions } from 'public-modules/Review';
import { rootReviewSelector } from 'public-modules/Review/selectors';
import { ratingModalSelector } from 'containers/Bounty/selectors';
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
    postingError,
    visible
  } = props;

  const { name, address, img } = reviewee;

  const handleReview = values => {
    const { rating, review } = values;

    postReview(bounty.id, fulfillmentId, rating, review);
  };

  let revieweeAvatar = (
    <Avatar
      nameTextScale="h4"
      name={name}
      address={address}
      hash={address}
      img={img}
    />
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
        visible={visible}
        fixed
        size="medium"
      >
        <Modal.Header closable={true}>
          <BountyDetails bounty={bounty} />
          <Modal.Heading>Rate {type}</Modal.Heading>
          <Modal.Description>
            {messageTemplate[type][0]}
            <div className={styles.avatar}>{revieweeAvatar}</div>
            {messageTemplate[type][1]}
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <div className={styles.review}>
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
                label="Review"
                validate={[validators.required]}
                placeholder="Enter review..."
              />
            </div>
          </div>
        </Modal.Body>
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
  const ratingModal = ratingModalSelector(state);

  return {
    fulfillmentId: ratingModal.fulfillmentId,
    reviewee: ratingModal.reviewee,
    loading: false,
    error: false,
    posting: reviewState.posting,
    postingError: reviewState.postingError
  };
};

const IssueRatingFormModal = compose(
  connect(
    mapStateToProps,
    {
      postReview: reviewActions.postReview
    }
  ),
  reduxForm({ form: 'issueRating', destroyOnUnmount: false }),
  ModalFormReset
)(IssueRatingFormModalComponent);

export default IssueRatingFormModal;

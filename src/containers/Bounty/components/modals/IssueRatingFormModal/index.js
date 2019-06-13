import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './IssueRatingFormModal.module.scss';
import { Button, Modal, Text, Loader } from 'components';
import { LinkedAvatar } from 'explorer-components';
import { Field, reduxForm } from 'redux-form';
import validators from 'utils/validators';
import { ModalFormReset } from 'hocs';
import { FormTextbox, FormRating } from 'form-components';
import { actions as reviewActions } from 'public-modules/Review';
import { rootReviewSelector } from 'public-modules/Review/selectors';
import { ratingModalSelector } from 'containers/Bounty/selectors';
import BountyDetails from './BountyDetails';
import intl from 'react-intl-universal';

const messageTemplate = {
  issuer: [
    intl.get('sections.bounty.components.issue_rating.issuer1'),
    intl.get('sections.bounty.components.issue_rating.issuer2')
  ],
  fulfiller: [
    intl.get('sections.bounty.components.issue_rating.fulfiller1'),
    intl.get('sections.bounty.components.issue_rating.fulfiller2')
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

  const fieldValidators = [validators.required];

  const handleReview = values => {
    const { rating, review } = values;

    postReview(bounty.id, bounty.platform, fulfillmentId, rating, review);
  };

  let revieweeAvatar = (
    <LinkedAvatar
      nameTextScale="h4"
      name={name}
      address={address}
      hash={address}
      img={img}
      to={`/profile/${address}`}
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
                label={intl.get(
                  'sections.bounty.components.issue_rating.rating'
                )}
                validate={fieldValidators}
              />
            </div>
            <div className={styles.inputGroup}>
              <Field
                name="review"
                component={FormTextbox}
                type="string"
                label={intl.get(
                  'sections.bounty.components.issue_rating.review'
                )}
                validate={fieldValidators}
                placeholder={intl.get(
                  'sections.bounty.components.issue_rating.review_placeholder'
                )}
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
            {intl.get('actions.cancel')}
          </Button>
          <Button type="primary" loading={posting} disabled={posting}>
            {intl.get('actions.submit')}
          </Button>

          {submitFailed &&
            invalid && (
              <Text inputLabel color="red" className={styles.submitError}>
                {intl.get('errors.form_error')}
              </Text>
            )}

          {postingError && (
            <Text inputLabel color="red" className={styles.submitError}>
              {intl.get('errors.500')}
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

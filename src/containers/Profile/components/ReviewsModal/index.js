import React from 'react';
import styles from './ReviewModal.module.scss';
import { map } from 'lodash';
import { Button, ListGroup, Modal, ZeroState } from 'components';
import ReviewItem from './ReviewItem';
import intl from 'react-intl-universal';

let ReviewsModal = props => {
  const {
    visible,
    onClose,
    reviewType,
    loadMore,
    loadingMore,
    reviews,
    count
  } = props;

  const renderReviews = () => {
    return map(review => {
      return (
        <ListGroup.ListItem key={review.id}>
          <ReviewItem
            rating={review.rating}
            review={review.review}
            name={review.reviewer.name}
            address={review.reviewer.public_address}
            img={review.reviewer.small_profile_image_url}
            created={review.created}
          />
        </ListGroup.ListItem>
      );
    }, reviews);
  };

  let body = (
    <ZeroState
      className={styles.reviewsZeroState}
      type="error"
      icon={['fal', 'star']}
      iconColor="red"
      title={intl.get('sections.profile.reviews.zero_state.title')}
      text={intl.get('sections.profile.reviews.zero_state.description')}
    />
  );

  if (reviews.length) {
    body = (
      <div>
        <ListGroup className={styles.reviewsListGroup}>
          {renderReviews()}
        </ListGroup>
        {reviews.length < count && (
          <div className={styles.loadMoreButton}>
            <Button loading={loadingMore} onClick={loadMore}>
              {intl.get('actions.load_more')}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Modal
      dismissable={true}
      onClose={onClose}
      visible={visible}
      fixed
      size="medium"
    >
      <Modal.Header closable={true}>
        <Modal.Heading>{reviewType} ratings received</Modal.Heading>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>{body}</Modal.Body>
    </Modal>
  );
};

export default ReviewsModal;

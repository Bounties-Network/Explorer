import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './ReviewModal.module.scss';
import { map } from 'lodash';
import { Button, ListGroup, Modal, Text } from 'components';
import ReviewItem from './ReviewItem';

let ReviewsModal = props => {
  const {
    visible,
    onClose,
    loadMore,
    loadingMore,
    loadingMoreError,
    reviews,
    count
  } = props;

  const renderReviews = () => {
    return map(review => {
      return (
        <ListGroup.ListItem>
          <ReviewItem
            rating={review.rating}
            review={review.review}
            name={review.reviewer.name}
            address={review.reviewer.public_address}
            img={review.reviewer.profile_image}
            created={review.created}
          />
        </ListGroup.ListItem>
      );
    }, reviews);
  };

  return (
    <Modal
      dismissable={true}
      onClose={onClose}
      visible={visible}
      fixed
      size="medium"
    >
      <Modal.Header closable={true}>
        <Modal.Message>Issuer ratings received</Modal.Message>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className="row">
          <div className="col-xs">
            <ListGroup>{renderReviews()}</ListGroup>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewsModal;

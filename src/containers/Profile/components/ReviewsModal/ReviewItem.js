import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewItem.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Avatar, ListGroup, Card, Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import Pluralize from 'pluralize';
import moment from 'moment';

const ReviewItem = props => {
  const { rating, review, name, address, img, created } = props;
  const color = rating >= 4 ? 'green' : rating >= 3 ? 'orange' : 'red';
  const formattedTime = moment.utc(created, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

  return (
    <div className={`${styles.container}`}>
      <div className={styles.rating}>
        <Text weight="fontWeight-bold" color={color}>
          {rating}/5
        </Text>
      </div>
      <div className={styles.review}>
        <Text>{review}</Text>
        <Avatar
          name={name}
          address={address}
          hash={address}
          img={img}
          nameTextScale={'h4'}
        />
      </div>
      <div className={styles.created}>
        <Text typeScale="Small" color="defaultGrey">
          {formattedTime}
        </Text>
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  rating: PropTypes.number,
  review: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  created: PropTypes.string
};

ReviewItem.defaultProps = {};

export default ReviewItem;

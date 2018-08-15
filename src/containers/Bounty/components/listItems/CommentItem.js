import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentItem.module.scss';
import { Button, Card, ListGroup, Text } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const CommentItem = props => {
  const { name, address, img, text, created } = props;

  const formattedTime = moment(created, 'YYYY-MM-DD').fromNow();

  return (
    <div className="">
      <div className="row">
        <div className={`col-xs-4 ${styles.details}`}>
          <LinkedAvatar
            className={styles.labelGroup}
            name={name}
            address={address}
            img={img}
            hash={address}
          />
        </div>
        <div className="col-xs-8">
          <div className={styles.details}>
            <Text typeScale="body">{text}</Text>
            <Text typeScale="Small" color="defaultGrey">
              {formattedTime}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {};

CommentItem.defaultProps = {};

export default CommentItem;

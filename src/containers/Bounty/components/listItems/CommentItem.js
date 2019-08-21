import React from 'react';
import styles from './CommentItem.module.scss';
import { Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const CommentItem = props => {
  const { name, address, img, text, created } = props;

  const formattedTime = moment.utc(created, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentData}>
        <LinkedAvatar
          textFormat="inline"
          name={name}
          address={address}
          img={img}
          hash={address}
          to={`/profile/${address}`}
        />
        <Text
          className={styles.timeStamp}
          typeScale="Small"
          color="defaultGrey"
        >
          {'﹒ ' + formattedTime}
        </Text>
      </div>

      <div className={styles.commentContent}>
        <Text typeScale="Body" color="darkGrey">
          {text}
        </Text>
      </div>
    </div>
  );
};

CommentItem.propTypes = {};

CommentItem.defaultProps = {};

export default CommentItem;

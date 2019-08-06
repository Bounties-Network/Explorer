import React from 'react';
import styles from './CommentItem.module.scss';
import { Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import moment from 'moment';
import showdown from 'showdown';
const converter = new showdown.Converter({ extensions: ['targetBlank'] });
converter.setFlavor('github');

const CommentItem = props => {
  const { name, address, img, text, created } = props;

  const formattedTime = moment.utc(created, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

  return (
    <div className={styles.commentItem}>
      <div>
        <LinkedAvatar
          className={styles.avatar}
          name={name}
          address={address}
          img={img}
          hash={address}
          nameTextScale={'h4'}
          to={`/profile/${address}`}
        />
      </div>

      <div className={styles.details}>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(text || 'N/A')
          }}
          className="markdownContent"
        />
        <Text
          className={styles.timeStamp}
          typeScale="Small"
          color="defaultGrey"
        >
          {formattedTime}
        </Text>
      </div>
    </div>
  );
};

CommentItem.propTypes = {};

CommentItem.defaultProps = {};

export default CommentItem;

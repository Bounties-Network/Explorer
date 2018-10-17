import React from 'react';
import styles from './CommentItem.module.scss';
import { Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const CommentItem = props => {
  const { name, address, img, text, created, ensDomain } = props;

  const formattedTime = moment.utc(created, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

  return (
    <div className="">
      <div className="row">
        <div className={`col-xs-12 col-sm-4 ${styles.avatar}`}>
          <LinkedAvatar
            className={styles.labelGroup}
            name={name}
            address={address}
            ensDomain={ensDomain}
            img={img}
            hash={address}
            nameTextScale={'h4'}
            to={`/profile/${address}`}
          />
        </div>
        <div className="col-xs-12 col-sm-8">
          <div className={styles.details}>
            <Text typeScale="Body">{text}</Text>
            <Text
              className={styles.timeStamp}
              typeScale="Small"
              color="defaultGrey"
            >
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

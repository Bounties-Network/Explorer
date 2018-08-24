import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationItem.module.scss';
import { notification_template } from 'utils/constants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const NotificationItem = props => {
  const { createdAt, title, type, userAddress, profileImage } = props;
  const { message, icon } = notification_template[type];
  const formattedTime = moment.utc(createdAt, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

  return (
    <div className={styles.container}>
      <div className={styles.notifier}>
        {userAddress ? (
          <LinkedAvatar
            address={userAddress}
            img={profileImage}
            hash={userAddress}
            to={`/profile/${userAddress}`}
          />
        ) : (
          <FontAwesomeIcon icon={icon} className={styles.iconStyles} />
        )}
      </div>
      <div className={styles.text}>
        <Text color="black" typeScale="Small" inline>
          {message}
        </Text>
        <Text color="black" weight="fontWeight-medium" typeScale="Small" inline>
          {' ' + title}
        </Text>
      </div>
      <div className={styles.time}>
        <Text color="defaultGrey" typeScale="Small">
          {formattedTime}
        </Text>
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  title: PropTypes.string
};

NotificationItem.defaultProps = {};

export default NotificationItem;

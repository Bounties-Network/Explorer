import React from 'react';
import styles from './CardNotification.module.scss';
import { shortenAddress } from 'utils/helpers';

import { Circle, Text } from 'components';

const CardNotification = props => {
  const { notificationData } = props;
  const { address = '', action = '', date = '' } = notificationData;

  return (
    <div className={`${styles.cardNotificationContainer}`}>
      <div className={`${styles.leftColumn}`}>
        <div className={`${styles.profilePic}`}>
          <Circle type="blocky" size="small" input={address} />
        </div>
        <div className={`${styles.textArea}`}>
          <div className={`${styles.textCell}`}>
            <Text link color="blue">
              {shortenAddress(address)}
            </Text>
          </div>
          <div className={`${styles.textCell}`}>
            <Text>{action}</Text>
          </div>
        </div>
      </div>

      <div className={`${styles.rightColumn}`}>
        <Text type="H4" color="darkGrey">
          {date}
        </Text>
      </div>
    </div>
  );
};

export default CardNotification;

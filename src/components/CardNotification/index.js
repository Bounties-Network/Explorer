import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardNotification.module.scss';
import { shortenAddress } from '../../utils/utilities';

import { Circle, Text, Payout } from 'components';

const CardNotification = props => {
  const { notificationData } = props;
  const {
    icon = '',
    address = '',
    action = '',
    title = '',
    date = '',
    displayNotification = false
  } = notificationData;

  return (
    <div className={`${styles.cardNotificationContainer}`}>
      <div className={`${styles.leftColumn}`}>
        <div className={`${styles.profilePic}`}>
          <Circle type="image" size="mini" />
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
        <Text type="H4" color="grey">
          {date}
        </Text>
      </div>
    </div>
  );
};

export default CardNotification;

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
      <div className="row middle-xs">
        <div className="col-xs-1">
          <div className={`${styles.profilePic}`}>
            <Circle type="image" size="mini" />
          </div>
        </div>
        <div className="col-xs-8">
          <div className={`${styles.textArea}`}>
            <div className={`${styles.textCell}`}>
              <Text link color="blue">
                {shortenAddress(address)}
              </Text>
              <Text className={`${styles.space}`}>{action}</Text>
            </div>
          </div>
        </div>

        <div className="col-xs-3">
          <div className={`${styles.dateText}`}>
            <Text style="BodySmall" color="grey">
              {date}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNotification;

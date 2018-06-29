import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardBounty.module.scss';
import { shortenAddress } from '../../utils/utilities';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCircle from '@fortawesome/fontawesome-pro-solid/faCircle';

import { Text, Payout } from 'components';

const CardBounty = props => {
  const { bountyData } = props;
  const {
    displayNotification = false,
    title = 'this is some fake text',
    categories = [],
    issuer = '',
    usd_price = 0,
    calculated_fulfillmentAmount = 0,
    tokenSymbol = 'ETH',
    fulfillment_count = 0
  } = bountyData;

  return (
    <div className={`${styles.cardBountyContainer}`}>
      <div className="row middle-xs">
        <div className="col-xs-1">
          <div className={`${styles.notificationDot}`}>
            {displayNotification && <FontAwesomeIcon icon={faCircle} />}
          </div>
        </div>
        <div className="col-xs-8">
          <div className={`${styles.textArea}`}>
            <Text style="H4">{title}</Text>
            <div className={`${styles.submissionsData}`}>
              <Text style="BodySmall" color="grey">
                Created Yesterday - 2 Submissions
              </Text>
            </div>
          </div>
        </div>
        <div className="col-xs-3">
          <Payout
            USD={usd_price}
            amount={calculated_fulfillmentAmount}
            symbol={tokenSymbol}
          />
        </div>
      </div>
    </div>
  );
};

export default CardBounty;

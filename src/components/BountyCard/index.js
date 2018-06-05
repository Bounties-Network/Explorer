import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyCard.module.scss';
import { shortenAddress } from '../../utils/utilities';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSeedling from '@fortawesome/fontawesome-pro-light/faSeedling';
import faClock from '@fortawesome/fontawesome-pro-light/faClock';
import faLevelUp from '@fortawesome/fontawesome-pro-light/faLevelUp';

import { Chip, Text, Payout, Circle } from 'components';

const BountyCard = props => {
  const { bountyData } = props;
  const {
    title = '',
    categories = [],
    issuer = '',
    usd_price = 0,
    calculated_fulfillmentAmount = 0,
    tokenSymbol = 'ETH',
    fulfillment_count = 0
  } = bountyData;

  const renderChips = categories => {
    return categories.map((elem, idx) => (
      <div className={`${styles.chip}`} key={'chip' + idx}>
        <Chip>{elem.name}</Chip>
      </div>
    ));
  };

  return (
    <div className={`${styles.bountyCardContainer}`}>
      <div className={`${styles.leftColumn}`}>
        <Text>{title}</Text>
        <div className={`${styles.chipBar}`}>{renderChips(categories)}</div>
        <div className={`${styles.profileBar}`}>
          <Circle type="image" size="mini" />
          <div className={`${styles.addressText}`}>
            <Text link color="blue" style="BodySmall">
              {issuer}
            </Text>
          </div>
        </div>
      </div>
      <div className={`${styles.midColumn}`}>
        <div className={`${styles.dataCell}`}>
          <div className={`${styles.dataIcon}`}>
            <Text color="grey">
              <FontAwesomeIcon icon={faSeedling} />
            </Text>
          </div>
          <Text color="black">Beginner </Text>
          <div className={`${styles.dataCategory}`}>
            <Text color="grey">Difficulty</Text>
          </div>
        </div>
        <div className={`${styles.dataCell}`}>
          <div className={`${styles.dataIcon}`}>
            <Text color="grey">
              <FontAwesomeIcon icon={faClock} />
            </Text>
          </div>
          <Text color="black">5 Days </Text>
          <div className={`${styles.dataCategory}`}>
            <Text color="grey">Remaining</Text>
          </div>
        </div>
        <div className={`${styles.dataCell}`}>
          <div className={`${styles.dataIcon}`}>
            <Text color="grey">
              <FontAwesomeIcon icon={faLevelUp} />
            </Text>
          </div>
          <Text color="black">0</Text>
          <div className={`${styles.dataCategory}`}>
            <Text color="grey">Submissions</Text>
          </div>
        </div>
      </div>
      <div className={`${styles.rightColumn}`}>
        <Payout
          USD={usd_price}
          amount={calculated_fulfillmentAmount}
          symbol={tokenSymbol}
        />
      </div>
    </div>
  );
};

export default BountyCard;

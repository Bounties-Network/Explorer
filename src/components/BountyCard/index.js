import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyCard.module.scss';
import { shortenAddress } from '../../utils/utilities';

import { Chip, Text, Payout } from 'components';

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

  const renderCategories = categories => {
    return categories.map(elem => <Chip>{elem.name}</Chip>);
  };

  return (
    <span className={`${styles.bountyCardContainer}`}>
      <span className={`${styles.bountyCardLeft}`}>
        <span className={`${styles.bountyCardLeftTop}`}>
          <Text style="CardHeading">{title}</Text>
          <span>{renderCategories(categories)}</span>
        </span>
        <Text style="BodySmall" link>
          {shortenAddress(issuer)}
        </Text>
      </span>
      <span className={`${styles.bountyCardRight}`}>
        <Payout
          USD={Number(usd_price).toFixed(2)}
          amount={Number(calculated_fulfillmentAmount).toFixed(2)}
          symbol={tokenSymbol}
        />
        <Text style="FormLabel">{fulfillment_count} Submissions</Text>
      </span>
    </span>
  );
};

export default BountyCard;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyCard.module.scss';
import { shortenAddress, findETHValue } from '../../utils/utilities';

import { Chip, Text, Payout } from 'components';

const BountyCard = props => {
  const { bountyData } = props;
  const {
    title,
    categories,
    issuer,
    usd_price,
    fulfillment_count
  } = bountyData;
  const eth_amount = findETHValue(bountyData);

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
        <Payout USD={Number(usd_price).toFixed(2)} ETH={eth_amount} />
        <Text style="FormLabel">{fulfillment_count} Submissions</Text>
      </span>
    </span>
  );
};

export default BountyCard;

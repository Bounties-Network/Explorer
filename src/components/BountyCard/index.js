import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyCard.module.scss';
import { shortenAddress } from '../../utils/utilities';

import moment from 'moment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSeedling from '@fortawesome/fontawesome-pro-light/faSeedling';
import faClock from '@fortawesome/fontawesome-pro-light/faClock';
import faLevelUp from '@fortawesome/fontawesome-pro-light/faLevelUp';

import { Chip, Text, Payout, Circle } from 'components';

const BountyCard = props => {
  const { bountyData, onChipClick } = props;
  console.log(bountyData);
  const {
    id = 0,
    title = '',
    categories = [],
    issuer = '',
    usd_price = 0,
    calculated_fulfillmentAmount = 0,
    tokenSymbol = 'ETH',
    fulfillment_count = 0,
    deadline = '',
    experienceLevel = null,
    user = {}
  } = bountyData;
  const { profile_image } = user;

  const renderChips = categories => {
    return categories.map((elem, idx) => (
      <div
        className={`${styles.chip}`}
        key={'chip' + idx}
        onClick={() => returnChipData(elem)}
      >
        <Chip>{elem.name}</Chip>
      </div>
    ));
  };

  const returnChipData = data => {
    onChipClick(data);
  };

  return (
    <div className={`${styles.bountyCardContainer}`}>
      <div className={`${styles.leftColumn}`}>
        <Text
          link
          className={`${styles.bountyTitle}`}
          style="H4"
          weight="font-weight-bold"
          color="black"
          link
          router
          src={`/bounty/${id}`}
        >
          {title}
        </Text>
        <div className={`${styles.chipBar}`}>{renderChips(categories)}</div>
        <div className={`${styles.profileBar}`}>
          <Circle type="image" size="mini" input={profile_image} />
          <div className={`${styles.addressText}`}>
            <Text
              link
              color="blue"
              style="Body"
              link
              router
              src={`/profile/${issuer}`}
            >
              {issuer}
            </Text>
          </div>
        </div>
      </div>
      <div className={`${styles.midColumn}`}>
        {experienceLevel && (
          <div className={`${styles.dataCell}`}>
            <div className={`${styles.dataIcon}`}>
              <Text color="grey">
                <FontAwesomeIcon icon={faSeedling} />
              </Text>
            </div>
            <Text color="black" style="Body" weight="font-weight-bold">
              {`${experienceLevel} `}
            </Text>
            <div className={`${styles.dataCategory}`}>
              <Text color="grey" style="Body">
                Difficulty
              </Text>
            </div>
          </div>
        )}
        <div className={`${styles.dataCell}`}>
          <div className={`${styles.dataIcon}`}>
            <Text color="grey" style="Body">
              <FontAwesomeIcon icon={faClock} />
            </Text>
          </div>
          <Text color="black" style="Body" weight="font-weight-bold">
            {moment(deadline).fromNow(true)}
          </Text>
          <div className={`${styles.dataCategory}`}>
            <Text color="grey" style="Body">
              Remaining
            </Text>
          </div>
        </div>
        <div className={`${styles.dataCell}`}>
          <div className={`${styles.dataIcon}`}>
            <Text color="grey" style="Body">
              <FontAwesomeIcon icon={faLevelUp} />
            </Text>
          </div>
          <Text color="black" style="Body" weight="font-weight-bold">
            {fulfillment_count}
          </Text>
          <div className={`${styles.dataCategory}`}>
            <Text color="grey" style="Body">
              Submissions
            </Text>
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

BountyCard.defaultProps = {
  onChipClick: () => {}
};

export default BountyCard;

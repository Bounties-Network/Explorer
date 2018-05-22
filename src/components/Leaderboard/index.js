import React from 'react';
import PropTypes from 'prop-types';
import styles from './Leaderboard.module.scss';
import { shortenAddress } from '../../utils/utilities';

import { Text, Circle } from 'components';

const LeaderboardItem = props => {
  const { data, index = 0 } = props;
  let {
    address = '0x7056e70a5ca249ba88e9550eb22caec4c985bb8e',
    name = '',
    email = 'cryptomental.com@gmail.com',
    githubusername = 'cryptomental',
    total = '2000870000000000000000',
    total_usd = 2724.0805,
    bounties_fulfilled = 7,
    fulfillments_accepted = 7,
    image = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  } = data;

  if (name === '') {
    name = '--';
  }

  return (
    <span className={`${styles.cardContainer}`}>
      <span className={`${styles.cardLeft}`}>
        <div className={`${styles.index}`}>
          <Text style="H2" color="grey">
            {Number(index) + 1}
          </Text>
        </div>
        <div className={`${styles.profileInfo}`}>
          <Circle type="image" input={image} size="small" />
          <div className={`${styles.nameBox}`}>
            <div className={`${styles.name}`}>
              <Text style="H4">{name}</Text>
            </div>
            <div className={`${styles.address}`}>
              <Text style="Small" link>
                {shortenAddress(address)}
              </Text>
            </div>
          </div>
        </div>
      </span>
      <span className={`${styles.cardRight}`}>
        <Text color="purple">{`$${total_usd.toFixed(2)}`}</Text>
        <div className={`${styles.ethText}`}>
          <Text style="Alt" color="grey">
            0.05 ETH
          </Text>
        </div>
      </span>
    </span>
  );
};

const Leaderboard = props => {
  const { leaderboardData } = props;

  const renderItems = dataArray => {
    return leaderboardData.map((elem, ind) => {
      return <LeaderboardItem data={elem} index={ind} />;
    });
  };

  return (
    <div className={`${styles.leaderboard}`}>
      {renderItems(leaderboardData)}
    </div>
  );
};

export default Leaderboard;

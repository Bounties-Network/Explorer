import React from 'react';
import styles from './Leaderboard.module.scss';
import { shortenAddress } from '../../utils/utilities';

import { Text, Circle } from 'components';

const LeaderboardItem = props => {
  const { data, index = 0 } = props;
  let {
    address = '0x7056e70a5ca249ba88e9550eb22caec4c985bb8e',
    name = '',
    // email = 'cryptomental.com@gmail.com',
    githubusername = 'cryptomental',
    // total = '2000870000000000000000',
    total_usd = 2724.0805,
    // bounties_fulfilled = 7,
    // fulfillments_accepted = 7,
    image = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  } = data;

  if (name === '') {
    name = githubusername;
  }

  return (
    <div className={`${styles.cardContainer}`}>
      <div className="row middle-xs">
        <div className="col-xs-1">
          <div className={`${styles.index}`}>
            <Text style="H2" color="grey">
              {Number(index) + 1}
            </Text>
          </div>
        </div>
        <div className="col-xs-9">
          <div className={`${styles.profileInfo} row middle-xs start-xs`}>
            <div className="col-xs-2">
              <Circle type="image" input={image} size="small" />
            </div>
            <div className="col-xs-10">
              <div className={`${styles.name}`}>
                <Text style="H4">{name}</Text>
              </div>
              <div className={`${styles.address}`}>
                <Text style="Body" link>
                  {shortenAddress(address)}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-2">
          <div className={`${styles.cardRight}`}>
            <div className={`${styles.usd}`}>
              <Text style="H3" color="purple">{`$${total_usd.toFixed(
                2
              )}`}</Text>
            </div>
            <div>
              <Text style="Body" color="grey">
                ? ETH
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = props => {
  const { leaderboardData } = props;
  const renderItems = dataArray => {
    return leaderboardData.map((elem, ind) => {
      return (
        <LeaderboardItem
          key={'leaderboardItem' + ind}
          data={elem}
          index={ind}
        />
      );
    });
  };

  return (
    <div className="row center-xs">
      <div className="col-xs-7">
        <div className={`${styles.leaderboard}`}>
          {renderItems(leaderboardData)}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

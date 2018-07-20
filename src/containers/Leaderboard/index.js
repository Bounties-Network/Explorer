import React from 'react';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardCard from './LeaderboardCard';
import styles from './Leaderboard.module.scss';

const Leaderboard = props => {
  return (
    <div className={`fullHeight ${styles.flexContainer}`}>
      <LeaderboardHeader />
      <div className={`${styles.bodyCard}`}>
        <div className={`col-xs-7`}>
          <LeaderboardCard />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

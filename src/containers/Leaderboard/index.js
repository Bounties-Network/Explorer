import React from 'react';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardCard from './LeaderboardCard';
import styles from './Leaderboard.module.scss';

const Explorer = props => {
  return (
    <div className="container-fluid">
      <div className="row fullHeight">
        <div className={`col-xs-12 fullHeight ${styles.leadboardBody}`}>
          <LeaderboardHeader />
          <LeaderboardCard />
        </div>
      </div>
    </div>
  );
};

export default Explorer;

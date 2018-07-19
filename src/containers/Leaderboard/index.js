import React from 'react';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardBody from './LeaderboardBody';
import styles from './Leaderboard.module.scss';

import { Card } from 'components';

const Explorer = props => {
  return (
    <div className="container-fluid">
      <div className="row fullHeight">
        <div className={`col-xs-12 fullHeight ${styles.explorerBody}`}>
          <LeaderboardHeader />
          <div className={`${styles.leaderbody}`}>
            <Card className={`${styles.leaderboardCard}`}>
              <Card.Body>
                <LeaderboardBody />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;

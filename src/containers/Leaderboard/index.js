import React from 'react';
import Banner from './Banner';
import LeaderboardCard from './LeaderboardCard';
import styles from './Leaderboard.module.scss';

import { PageCard } from 'explorer-components';

const Leaderboard = props => {
  return (
    <PageCard>
      <PageCard.Header>
        <Banner />
      </PageCard.Header>
      <PageCard.Content className={styles.bodyCard}>
        <LeaderboardCard />
      </PageCard.Content>
    </PageCard>
  );
};

export default Leaderboard;

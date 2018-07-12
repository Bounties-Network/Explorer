import React from 'react';
import styles from './ExplorerBody.module.scss';
import { Text, Sort } from 'components';

const ExplorerBody = props => {
  return (
    <div className={styles.explorerBody}>
      <div className={styles.bodyHeading}>
        <div>
          <Text
            inline
            color="purple"
            typeScale="h3"
            className={styles.bountyNumber}
          >
            54
          </Text>
          <Text color="defaultGrey" inline>
            bounties
          </Text>
        </div>
        <div className={styles.sortGroup}>
          <Text
            inline
            weight="fontWeight-bold"
            color="black"
            typeScale="Body"
            className={styles.sortByText}
          >
            Sort By
          </Text>
          <Sort active className={styles.sortBy}>
            Value
          </Sort>
          <Sort className={styles.sortBy}>Creation Date</Sort>
          <Sort className={styles.sortBy}>Expiry</Sort>
        </div>
      </div>
      <div className={styles.bountyList}>Explorer</div>
    </div>
  );
};

export default ExplorerBody;

import React from 'react';
import baseStyles from '../BaseStyles.module.scss';
import styles from './NetworkStats.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Circle, Pill, Switch, Text } from 'components';
import { map } from 'lodash';

// TODO: handle too many skills to display

const NetworkStats = props => {
  const { skills } = props;

  return (
    <React.Fragment>
      <div className={styles.network}>
        <div className={styles.networkStatsHeader}>
          <Text typeScale="h3" color="black">
            Network Stats
          </Text>

          <Switch onValue={'Fulfiller'} offValue={'Issuer'} />
        </div>

        <div className={styles.networkStatsContainer}>
          <div className={styles.networkStatCircle}>
            <Circle
              type="text"
              size="medium"
              input="85%"
              color="green"
              textColor="white"
            />
            <Text
              typeScale="Small"
              alignment="align-center"
              color="defaultGrey"
            >
              Submission acceptance rate
            </Text>
          </div>

          <div className={styles.networkStatCircle}>
            <Circle
              type="text"
              size="medium"
              input="5/5"
              color="green"
              textColor="white"
            />
            <Text
              typeScale="Small"
              alignment="align-center"
              color="defaultGrey"
            >
              Submission acceptance rate
            </Text>
          </div>

          <div className={styles.networkStatCircle}>
            <Circle
              type="text"
              size="medium"
              input="5/5"
              color="orange"
              textColor="white"
            />
            <Text
              typeScale="Small"
              alignment="align-center"
              color="defaultGrey"
            >
              Submission acceptance rate
            </Text>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NetworkStats;

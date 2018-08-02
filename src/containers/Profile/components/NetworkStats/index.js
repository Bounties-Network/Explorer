import React from 'react';
import baseStyles from '../BaseStyles.module.scss';
import styles from './NetworkStats.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Circle, Pill, Switch, Text } from 'components';
import { map as fpMap, capitalize } from 'lodash';
import { descriptionText, displayFormat, statsToShow } from './constants';

const map = fpMap.convert({ cap: false });

function formatInput(value, format) {
  if (format == 'fraction') {
    return `${Number(Math.round(value * 5)).toFixed(0)}/5`;
  } else {
    return `${Number(value * 100).toFixed(0)}%`;
  }
}

const NetworkStats = props => {
  const { stats, switchValue, toggleNetworkSwitch } = props;
  const { issuer, fulfiller } = stats;

  const renderCircle = (input, color, text) => {
    return (
      <div className={styles.networkStatCircle}>
        <Circle
          type="text"
          size="medium"
          input={input}
          color={color}
          textColor="white"
        />
        <Text typeScale="Small" alignment="align-center" color="defaultGrey">
          {text}
        </Text>
      </div>
    );
  };

  const renderCircles = () => {
    return map(key => {
      const text = descriptionText[switchValue][key];
      const value = stats[switchValue][key];

      if (value == null) {
        return renderCircle('N/A', 'lightGrey', text);
      }

      const color = value >= 0.8 ? 'green' : value >= 0.5 ? 'orange' : 'red';
      const input = formatInput(value, displayFormat[key]);

      return renderCircle(input, color, text);
    }, statsToShow);
  };

  return (
    <div className={styles.network}>
      <div className={styles.networkStatsHeader}>
        <Text typeScale="h3" color="black">
          Network Stats
        </Text>

        <Switch
          onValue={'Fulfiller'}
          offValue={'Issuer'}
          value={capitalize(switchValue)}
          onChange={toggleNetworkSwitch}
        />
      </div>

      <div className={styles.networkStatsContainer}>{renderCircles()}</div>
    </div>
  );
};

export default NetworkStats;

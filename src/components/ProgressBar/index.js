import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressBar.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';

const ProgressBar = props => {
  const { displayPercent, percent, color, className } = props;

  return (
    <div
      className={`${className} ${styles.progressBarWrapper} ${styles[color]}`}
    >
      <div className={`${styles.progressBar}`}>
        <div
          className={`${styles.progressBarFillWidth}`}
          style={{ width: `${percent}%` }}
        >
          <div className={`${styles.progressBarFill}`} />
        </div>
      </div>
      <Text className={`${styles.percentage}`} weight="fontWeight-medium">
        {`${percent}%`}
      </Text>
    </div>
  );
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  displayPercent: PropTypes.bool,
  percent: PropTypes.number,
  color: PropTypes.oneOf([
    'purple',
    'blue',
    'orange',
    'green',
    'red',
    'black',
    'white',
    'defaultGrey',
    'lightGrey',
    'darkGrey'
  ]).isRequired
};

ProgressBar.defaultProps = {
  percent: 0
};

export default ProgressBar;

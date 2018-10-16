import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { Text } from 'components';

import styles from './ProgressBar.module.scss';

const ProgressBar = props => {
  const { heading, percentage, showPercent, margin, size, customClass } = props;

  const marginClass =
    margin === 'default' ? '' : 'progressBarMargin' + startCase(margin);
  const sizeClass =
    size === 'default' ? '' : 'progressBarSize' + startCase(size);

  return (
    <div
      className={`
      ${styles.progressBarAll} 
      ${styles[marginClass]} 
      ${styles[sizeClass]}
      ${customClass ? customClass : ''}
    `}
    >
      {heading && <Text typeScale="Small">{heading}</Text>}
      <div
        className={`
         ${styles.progressBar}
         ${heading ? styles.ProgressBarMarginLeft : ''} 
         ${showPercent ? styles.ProgressBarMarginRight : ''} 
      `}
      >
        <Filler percentage={percentage} />
      </div>
      {showPercent && <Text typeScale="Small">{percentage}%</Text>}
    </div>
  );
};

const Filler = ({ percentage }) => {
  return (
    <div
      className={styles.progressBarFiller}
      style={{ width: `${percentage}%` }}
    />
  );
};

ProgressBar.propTypes = {
  heading: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  showPercent: PropTypes.bool,
  margin: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  customClass: PropTypes.string
};

ProgressBar.defaultProps = {
  showPercent: true,
  margin: 'default',
  size: 'default'
};

export default ProgressBar;

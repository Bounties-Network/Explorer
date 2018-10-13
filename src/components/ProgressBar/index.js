import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

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
      {heading && <span className={styles.progressBarHdr}>{heading}</span>}
      <div className={styles.progressBar}>
        <Filler percentage={percentage} />
      </div>
      {showPercent && (
        <span className={styles.progressBarPct}>{percentage}%</span>
      )}
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

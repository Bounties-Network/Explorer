import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';

const ProgressBar = props => {
  const { heading, percentage, showPct, width } = props;

  return (
    <div className="progress-bar-all">
      {heading && <span className="progress-bar-hdr">{heading}</span>}
      <div className="progress-bar" style={{ width: width }}>
        <Filler percentage={percentage} />
      </div>
      {showPct && <span className="progress-bar-pct">{percentage}%</span>}
    </div>
  );
};

const Filler = ({ percentage }) => {
  return (
    <div className="progress-bar-filler" style={{ width: `${percentage}%` }} />
  );
};

ProgressBar.propTypes = {
  heading: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  showPct: PropTypes.bool,
  width: PropTypes.string
};

ProgressBar.defaultProps = {
  showPct: true,
  width: '350px'
};

export default ProgressBar;

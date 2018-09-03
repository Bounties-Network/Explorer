import React from 'react';
import PropTypes from 'prop-types';
import styles from './Network.module.scss';
import { Pill } from 'components';

const Network = props => {
  const { network, className, theme } = props;

  let networkName = 'Unknown Network';
  let circleStyle = styles.unknownCircle;
  if (network === 'rinkeby') {
    circleStyle = styles.rinkebyCircle;
    networkName = 'Rinkeby Network';
  }

  if (network === 'mainNet') {
    networkName = 'Main Ethereum Network';
    circleStyle = styles.mainnetCircle;
  }

  return (
    <Pill
      textColor={theme === 'light' ? 'white' : 'black'}
      className={className}
    >
      <span className={circleStyle}>&#9679;</span>
      {networkName}
    </Pill>
  );
};

Network.propTypes = {
  network: PropTypes.oneOf(['rinkeby', 'mainNet']),
  theme: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string
};

Network.defaultProps = {
  network: 'mainNet',
  theme: 'dark'
};

export default Network;

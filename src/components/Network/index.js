import React from 'react';
import PropTypes from 'prop-types';
import styles from './Network.module.scss';
import { Pill } from 'components';

const Network = props => {
  const { network, className } = props;

  let circleStyle = styles.mainnetCircle;
  let networkName = 'Main Ethereum Network';
  if (network === 'rinkeby') {
    circleStyle = styles.rinkebyCircle;
    networkName = 'Rinkeby Network';
  }

  return (
    <Pill textColor="black" className={className}>
      <span className={circleStyle}>&#9679;</span>
      {networkName}
    </Pill>
  );
};

Network.propTypes = {
  network: PropTypes.oneOf(['rinkeby', 'mainnet']),
  className: PropTypes.string
};

Network.defaultProps = {
  network: 'mainnet'
};

export default Network;

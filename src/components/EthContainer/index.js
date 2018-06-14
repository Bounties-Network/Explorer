import React from 'react';
import PropTypes from 'prop-types';
import styles from './EthContainer.module.scss';

import { Text } from 'components';

const EthContainer = props => {
  const { eth, currency, usd, className } = props;

  return (
    <div className={`${styles.ethContainer} ${className}`}>
      <Text style="H3" color="white">{`$${usd}`}</Text>
      <Text style="Alt" color="white">{`${eth} ${currency}`}</Text>
    </div>
  );
};

EthContainer.propTypes = {};

EthContainer.defaultProps = {
  usd: '100',
  eth: '1.0',
  currency: 'ETH',
  className: ''
};

export default EthContainer;

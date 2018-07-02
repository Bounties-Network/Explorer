import React from 'react';
import PropTypes from 'prop-types';
import styles from './PriceContainer.module.scss';

import { Text } from 'components';

const PriceContainer = props => {
  const { value, currency, usd, className } = props;

  return (
    <div className={`${styles.ethContainer} ${className}`}>
      <Text type="H3" color="white">{`$${usd}`}</Text>
      <Text type="Alt" color="white">{`${value} ${currency}`}</Text>
    </div>
  );
};

PriceContainer.propTypes = {};

PriceContainer.defaultProps = {
  currency: 'ETH'
};

export default PriceContainer;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Payout.module.scss';

import { Text } from 'components';

const Payout = props => {
  const { USD, amount, symbol } = props;

  return (
    <span className={`${styles.payoutContainer}`}>
      <span className={`${styles.usdContainer}`}>
        <Text style="H3" color="grey">
          $
        </Text>
        <Text style="H2" color="blue">
          {USD}
        </Text>
      </span>
      <span className={`${styles.ETHContainer}`}>
        <Text style="Alt" color="blue">
          {amount}{' '}
        </Text>
        <Text style="Alt" color="grey">
          {symbol}
        </Text>
      </span>
    </span>
  );
};

Payout.propTypes = {
  USD: PropTypes.number,
  amount: PropTypes.number,
  symbol: PropTypes.string
};

Payout.defaultProps = {
  USD: 0,
  amount: 0.0,
  symbol: 'ETH'
};

export default Payout;

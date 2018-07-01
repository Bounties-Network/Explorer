import React from 'react';
import PropTypes from 'prop-types';
import styles from './Payout.module.scss';

import { Text } from 'components';

const Payout = props => {
  let { USD, amount, symbol } = props;

  USD = Number(USD).toFixed(2);
  amount = Number(amount).toFixed(2);

  return (
    <span className={`${styles.payoutContainer}`}>
      <span className={`${styles.usdContainer}`}>
        <Text type="H2" color="purple">
          $
        </Text>
        <Text type="H2" color="purple">
          {USD}
        </Text>
      </span>
      <span className={`${styles.ethContainer}`}>
        <Text type="Body" color="grey">
          {amount} {symbol.toUpperCase()}
        </Text>
      </span>
    </span>
  );
};

Payout.propTypes = {
  USD: PropTypes.number,
  symbol: PropTypes.string
};

Payout.defaultProps = {
  USD: 0,
  amount: 0.0,
  symbol: 'ETH'
};

export default Payout;

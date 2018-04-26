import React from 'react';
import PropTypes from 'prop-types';
import styles from './Payout.module.scss';

import { Text } from 'components';

const Payout = props => {
  const { USD, ETH } = props;

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
      <span className={`${styles.ethContainer}`}>
        <Text style="Alt" color="blue">
          {ETH}{' '}
        </Text>
        <Text style="Alt" color="grey">
          ETH
        </Text>
      </span>
    </span>
  );
};

Payout.propTypes = {
  USD: PropTypes.number,
  ETH: PropTypes.number
};

Payout.defaultProps = {
  USD: 0,
  ETH: 0
};

export default Payout;

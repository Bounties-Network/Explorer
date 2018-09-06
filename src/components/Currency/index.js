import React from 'react';
import PropTypes from 'prop-types';
import styles from './Currency.module.scss';

import { Text } from 'components';

const Currency = props => {
  const {
    className,
    primaryClassName,
    secondaryClassName,

    primaryValue,
    primaryCurrency,
    primaryDecimals,
    primaryTypeScale,
    primaryWeight,

    secondaryValue,
    secondaryCurrency,
    secondaryDecimals,
    secondaryTypeScale
  } = props;

  const generateDisplay = (value, currency, decimals) =>
    [
      currency.toLowerCase() == 'usd' ? '$' : null,
      decimals == 'all' ? Number(value) : Number(value).toFixed(decimals),
      ' ',
      currency.toLowerCase() == 'usd' ? null : currency
    ].join('');

  return (
    <div className={[styles.container, className].join(' ')}>
      <Text
        color="purple"
        typeScale={primaryTypeScale}
        weight={primaryWeight}
        className={primaryClassName}
      >
        {generateDisplay(primaryValue, primaryCurrency, primaryDecimals)}
      </Text>
      <Text
        color="defaultGrey"
        typeScale={secondaryTypeScale}
        className={secondaryClassName}
      >
        {generateDisplay(secondaryValue, secondaryCurrency, secondaryDecimals)}
      </Text>
    </div>
  );
};

Currency.propTypes = {
  className: PropTypes.string,
  primaryClassName: PropTypes.string,
  secondaryClassName: PropTypes.string,
  primaryValue: PropTypes.number,
  primaryCurrency: PropTypes.string,
  primaryDecimals: PropTypes.string,
  primaryWeight: PropTypes.oneOf([
    'fontWeight-regular',
    'fontWeight-medium',
    'fontWeight-bold'
  ]),
  secondaryValue: PropTypes.number,
  secondaryCurrency: PropTypes.string,
  secondaryDecimals: PropTypes.string
};

Currency.defaultProps = {
  primaryValue: 0,
  primaryCurrency: 'usd',
  primaryDecimals: '2',
  primaryTypeScale: 'h2',
  primaryWeight: 'fontWeight-regular',
  secondaryCurrency: '',
  secondaryDecimals: 'all',
  secondaryTypeScale: 'Small'
};

export default Currency;

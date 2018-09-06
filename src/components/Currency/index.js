import React from 'react';
import PropTypes from 'prop-types';
import styles from './Currency.module.scss';
import { isNumber } from 'utils/helpers';

import { Text } from 'components';

const Currency = props => {
  const {
    className,
    primaryClassName,
    secondaryClassName,
    alignment,

    primaryValue,
    primaryCurrency,
    primaryDecimals,
    primaryTypeScale,
    primaryWeight,
    primaryColor,

    secondaryValue,
    secondaryCurrency,
    secondaryDecimals,
    secondaryTypeScale,
    secondaryColor
  } = props;

  const generateDisplay = (value, currency, decimals) =>
    [
      currency.toLowerCase() == 'usd' ? '$' : null,
      decimals == 'all' ? Number(value) : Number(value).toFixed(decimals),
      ' ',
      currency.toLowerCase() == 'usd' ? null : currency
    ].join('');

  const containerClass = alignment == 'align-left' ? styles.left : styles.right;

  return (
    <div className={[containerClass, className].join(' ')}>
      <Text
        color={primaryColor}
        typeScale={primaryTypeScale}
        weight={primaryWeight}
        className={primaryClassName}
      >
        {generateDisplay(primaryValue, primaryCurrency, primaryDecimals)}
      </Text>

      {isNumber(secondaryValue) && (
        <Text
          color={secondaryColor}
          typeScale={secondaryTypeScale}
          className={secondaryClassName}
        >
          {generateDisplay(
            secondaryValue,
            secondaryCurrency,
            secondaryDecimals
          )}
        </Text>
      )}
    </div>
  );
};

Currency.propTypes = {
  className: PropTypes.string,
  alignment: PropTypes.oneOf(['align-left', 'align-right']),
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
  primaryColor: PropTypes.string,
  secondaryValue: PropTypes.number,
  secondaryCurrency: PropTypes.string,
  secondaryDecimals: PropTypes.string,
  secondaryColor: PropTypes.string
};

Currency.defaultProps = {
  alignment: 'align-right',
  primaryValue: 0,
  primaryCurrency: 'usd',
  primaryDecimals: '2',
  primaryTypeScale: 'h2',
  primaryWeight: 'fontWeight-regular',
  primaryColor: 'purple',
  secondaryCurrency: '',
  secondaryDecimals: 'all',
  secondaryTypeScale: 'Small',
  secondaryColor: 'defaultGrey'
};

export default Currency;

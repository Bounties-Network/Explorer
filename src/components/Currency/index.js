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
    primaryContainerClass,
    currencyClass,
    alignment,

    primaryValue,
    primaryCurrency,
    primaryDecimals,
    primaryTypeScale,
    primaryWeight,
    primaryColor,

    currencyTypeScale,
    currencyWeight,
    currencyColor,

    secondaryValue,
    secondaryCurrency,
    secondaryDecimals,
    secondaryTypeScale,
    secondaryColor
  } = props;

  const primaryDisplay = [
    primaryCurrency.toLowerCase() == 'usd' ? '$' : null,
    primaryDecimals == 'all'
      ? Number(primaryValue)
      : Number(primaryValue).toFixed(primaryDecimals),
    ' '
  ].join('');

  const secondaryDisplay = [
    secondaryCurrency.toLowerCase() == 'usd' ? '$' : null,
    secondaryDecimals == 'all'
      ? Number(secondaryValue)
      : Number(secondaryValue).toFixed(secondaryDecimals),
    ' ',
    secondaryCurrency.toLowerCase() == 'usd' ? null : secondaryCurrency
  ].join('');

  return (
    <div className={className}>
      <div
        className={[
          isNumber(secondaryValue) && styles.primary,
          primaryContainerClass
        ].join(' ')}
      >
        <Text
          inline
          color={primaryColor}
          typeScale={primaryTypeScale}
          weight={primaryWeight}
          className={primaryClassName}
        >
          {primaryDisplay}

          {primaryCurrency.toLowerCase() !== 'usd' && (
            <Text
              inline
              color={currencyColor}
              typeScale={currencyTypeScale}
              weight={currencyWeight}
              className={currencyClass}
            >
              {primaryCurrency}
            </Text>
          )}
        </Text>
      </div>

      {isNumber(secondaryValue) && (
        <Text
          color={secondaryColor}
          typeScale={secondaryTypeScale}
          className={secondaryClassName}
        >
          {secondaryDisplay}
        </Text>
      )}
    </div>
  );
};

const stringAndNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

Currency.propTypes = {
  className: PropTypes.string,
  primaryClassName: PropTypes.string,
  secondaryClassName: PropTypes.string,
  currencyClass: PropTypes.string,
  primaryValue: stringAndNumber,
  primaryCurrency: PropTypes.string,
  primaryDecimals: stringAndNumber,
  primaryWeight: PropTypes.oneOf([
    'fontWeight-regular',
    'fontWeight-medium',
    'fontWeight-bold'
  ]),
  primaryColor: PropTypes.string,
  secondaryValue: stringAndNumber,
  secondaryCurrency: PropTypes.string,
  secondaryDecimals: stringAndNumber,
  secondaryColor: PropTypes.string
};

Currency.defaultProps = {
  alignment: 'align-right',
  primaryValue: 0,
  primaryCurrency: 'usd',
  primaryDecimals: 2,
  primaryTypeScale: 'h2',
  primaryWeight: 'fontWeight-regular',
  primaryColor: 'purple',
  secondaryCurrency: '',
  secondaryDecimals: 'all',
  secondaryTypeScale: 'Small',
  secondaryColor: 'defaultGrey',
  currencyTypeScale: 'h3',
  currencyWeight: 'fontWeight-regular',
  currencyColor: 'purple'
};

export default Currency;

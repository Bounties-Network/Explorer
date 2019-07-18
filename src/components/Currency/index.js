import React from 'react';
import PropTypes from 'prop-types';
import styles from './Currency.module.scss';
import { isNumber } from 'utils/helpers';
import intl from 'react-intl-universal';

import { Text } from 'components';

const Currency = props => {
  const {
    className,
    primaryClassName,
    secondaryClassName,
    primaryContainerClass,
    currencyClass,

    primaryValue,
    primaryCurrency,
    primaryTypeScale,
    primaryWeight,
    primaryColor,

    currencyTypeScale,
    currencyWeight,
    currencyColor,

    secondaryValue,
    secondaryCurrency,
    secondaryTypeScale,
    secondaryColor
  } = props;

  let primaryDisplay = '';
  if (primaryCurrency.toLowerCase() === 'usd') {
    primaryDisplay = intl.get('formats.usd', { value: primaryValue });
  } else {
    primaryDisplay = intl.get('formats.amount', { value: primaryValue });
  }
  let secondaryDisplay = '';
  if (secondaryCurrency.toLowerCase() === 'usd') {
    secondaryDisplay = intl.get('formats.usd', { value: secondaryValue });
  } else {
    secondaryDisplay = intl.get('formats.amount', { value: secondaryValue });
  }
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
          {primaryCurrency.toLowerCase() !== 'usd' && ' '}
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
          {secondaryDisplay.toLowerCase() !== 'usd' && ' '}
          {secondaryCurrency.toLowerCase() !== 'usd' && (
            <Text
              inline
              color={secondaryColor}
              typeScale={secondaryTypeScale}
              className={secondaryClassName}
            >
              {secondaryCurrency}
            </Text>
          )}
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

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

  const containerClass = alignment == 'align-left' ? styles.left : styles.right;

  return (
    <div className={[containerClass, className].join(' ')}>
      <div className={styles.primary}>
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

Currency.propTypes = {
  className: PropTypes.string,
  alignment: PropTypes.oneOf(['align-left', 'align-right']),
  primaryClassName: PropTypes.string,
  secondaryClassName: PropTypes.string,
  currencyClass: PropTypes.string,
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
  secondaryColor: 'defaultGrey',
  currencyTypeScale: 'h3',
  currencyWeight: 'fontWeight-regular',
  currencyColor: 'purple'
};

export default Currency;

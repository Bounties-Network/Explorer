import React from 'react';
import config from 'public-modules/config';
import { isNumber } from 'utils/helpers';
import { assign } from 'lodash';
import { Currency } from 'components';

function CurrencyModifierHOC(WrappedComponent) {
  return props => {
    let updatedProps = assign(Currency.defaultProps, props);

    if (config.defaultToken) {
      const { primaryValue, secondaryValue } = updatedProps;

      if (isNumber(primaryValue) && isNumber(secondaryValue)) {
        const {
          primaryCurrency,
          primaryDecimals,
          secondaryCurrency,
          secondaryDecimals
        } = updatedProps;

        updatedProps = assign(updatedProps, {
          primaryValue: secondaryValue,
          primaryCurrency: secondaryCurrency,
          primaryDecimals: secondaryDecimals,
          secondaryValue: primaryValue,
          secondaryCurrency: primaryCurrency,
          secondaryDecimals: primaryDecimals
        });
      }
    }

    return <WrappedComponent {...updatedProps} />;
  };
}

export default CurrencyModifierHOC;

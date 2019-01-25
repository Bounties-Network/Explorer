import React from 'react';
import styles from './BountyPayoutData.module.scss';
import { Currency } from 'explorer-components';
import { Text } from 'components';

const BountyPayoutData = props => {
  const {
    className,
    containerClass,
    payoutPrimaryClassName,
    payoutSecondaryClassName,
    payoutPrimaryValue,
    payoutPrimaryCurrency,
    payoutSecondaryValue,
    payoutSecondaryCurrency,
    balancePrimaryClassName,
    balanceSecondaryClassName,
    balancePrimaryValue,
    balancePrimaryCurrency,
    balanceSecondaryValue,
    balanceSecondaryCurrency
  } = props;

  return (
    <div className={className}>

      <div className={styles.payoutEthBox}>
        <Text
          className={styles.currencyTypeHeaderText}
          inline
          color="white"
        >
          Payout
        </Text>

        <Currency
          className={styles.ethBoxPayout}
          primaryClassName={payoutPrimaryClassName}
          secondaryClassName={payoutSecondaryClassName}
          primaryContainerClass={containerClass}

          primaryValue={payoutPrimaryValue}
          primaryDecimals={4}
          primaryCurrency={payoutPrimaryCurrency}
          primaryColor="white"
          currencyColor="white"

          secondaryValue={payoutSecondaryValue}
          secondaryDecimals={2}
          secondaryCurrency={payoutSecondaryCurrency}
          secondaryTypeScale="h4"
          secondaryColor="white"
        />
      </div>

      <div className={styles.balanceEthBox}>
        <Text
          className={styles.currencyTypeHeaderText}
          inline
          color="white"
        >
          Remaining Balance
        </Text>

        <Currency
          className={styles.ethBoxBalance}
          primaryClassName={balancePrimaryClassName}
          secondaryClassName={balanceSecondaryClassName}
          primaryContainerClass={containerClass}

          primaryValue={balancePrimaryValue}
          primaryDecimals={4}
          primaryCurrency={balancePrimaryCurrency}
          primaryColor="white"
          currencyColor="white"

          secondaryValue={balanceSecondaryValue}
          secondaryDecimals={2}
          secondaryCurrency={balanceSecondaryCurrency}
          secondaryTypeScale="h4"
          secondaryColor="white"
        />

      </div>

    </div>
  );
};

export default BountyPayoutData;

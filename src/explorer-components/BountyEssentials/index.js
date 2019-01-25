import React from 'react';
import styles from './BountyEssentials.module.scss';
import { Currency, StagePill } from 'explorer-components';
import { Text } from 'components';
import { DRAFT } from 'public-modules/Bounty/constants';

const BountyEssentials = props => {
  const {
    payoutPrimaryValue,
    payoutPrimaryCurrency,
    payoutSecondaryValue,
    payoutSecondaryCurrency,
    balancePrimaryValue,
    balancePrimaryCurrency,
    balanceSecondaryValue,
    balanceSecondaryCurrency,
    isDraft,
    bountyStage
  } = props;

  return (

    <div className={styles.bountyEssentials}>

      <div className={styles.stage}>
        <StagePill stage={isDraft ? DRAFT : bountyStage} />
      </div>

      <div className={styles.currencyContainer}>
        <div className={styles.payoutEthBox}>
          <Text
            className={styles.currencyTypeHeaderText}
            inline
            color="white"
          >
            Payout
          </Text>

          <Currency
            className={styles.payoutCurrency}
            primaryClassName={styles.primary}
            secondaryClassName={styles.currency}
            primaryContainerClass={styles.primaryContainerClass}

            primaryValue={payoutPrimaryValue}
            primaryDecimals="all"
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
            className={styles.balanceCurrency}
            primaryClassName={styles.primary}
            secondaryClassName={styles.currency}
            primaryContainerClass={styles.primaryContainerClass}

            primaryValue={balancePrimaryValue}
            primaryDecimals="all"
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
    </div>
  );
};

export default BountyEssentials;

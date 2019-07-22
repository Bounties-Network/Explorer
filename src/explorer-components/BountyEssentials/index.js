import React from 'react';
import styles from './BountyEssentials.module.scss';
import { Currency, StagePill } from 'explorer-components';
import { Text } from 'components';
import { DRAFT } from 'public-modules/Bounty/constants';
import intl from 'react-intl-universal';

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
    bounty_stage
  } = props;

  return (
    <div className={styles.bountyEssentials}>
      <div className={styles.stage}>
        <StagePill stage={isDraft ? DRAFT : bounty_stage} />
      </div>

      <div className={styles.currencyContainer}>
        <div className={styles.payoutEthBox}>
          <Text className={styles.currencyTypeHeaderText} inline color="white">
            {intl.get('common.payout')}
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
          <Text className={styles.currencyTypeHeaderText} inline color="white">
            {intl.get('components.essentials.balance')}
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

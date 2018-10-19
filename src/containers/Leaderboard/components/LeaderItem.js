import React from 'react';
import PropTypes from 'prop-types';
import styles from './LeaderItem.module.scss';
import { Currency, Text } from 'components';
import { LinkedAvatar } from 'explorer-components';

const LeaderItem = props => {
  const { place, img, name, address, value, valueLabel, ensDomain } = props;

  return (
    <div className={styles.leaderboardItem}>
      <Text className={styles.place} color="defaultGrey" typeScale="h4">
        {place}
      </Text>

      <div className={styles.avatar}>
        <LinkedAvatar
          img={img}
          name={name}
          nameTextScale="h4"
          nameTextWeight="fontWeight-medium"
          address={address}
          ensDomain={ensDomain}
          hash={address}
          to={`profile/${address}`}
          size="small"
        />
      </div>

      <Currency
        className={styles.price}
        primaryValue={value}
        primaryCurrency={valueLabel ? valueLabel : 'usd'}
        primaryTypeScale="h3"
        primaryClassName={styles.value}
        currencyTypeScale="h4"
      />
    </div>
  );
};

LeaderItem.propTypes = {
  place: PropTypes.number,
  img: PropTypes.string,
  address: PropTypes.string,
  usd: PropTypes.string
};

LeaderItem.defaultProps = {};

export default LeaderItem;

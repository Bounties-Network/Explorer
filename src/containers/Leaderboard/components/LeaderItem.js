import React from 'react';
import PropTypes from 'prop-types';
import styles from './LeaderItem.module.scss';
import { Text } from 'components';
import { LinkedAvatar } from 'explorer-components';

const LeaderItem = props => {
  const { place, img, name, address, value, valueLabel } = props;

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
          hash={address}
          to={`profile/${address}`}
          size="small"
        />
      </div>

      <div className={styles.price}>
        <Text inline color="purple" typeScale="h4" className={styles.value}>
          {value}
        </Text>
        {valueLabel && (
          <Text inline color="defaultGrey" className={styles.label}>
            {valueLabel}
          </Text>
        )}
      </div>
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

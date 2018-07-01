import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';
import { shortenAddress } from 'utils/helpers';
import { Text, Circle } from 'components';

const Avatar = props => {
  const {
    size,
    name,
    address,
    nameTextType,
    nameTextColor,
    addressTextType,
    addressTextColor,
    border
  } = props;

  const renderName = () => {
    if (!name) {
      return null;
    }

    return (
      <div className={styles.nameText}>
        <Text type={nameTextType} color={nameTextColor}>
          {name}
        </Text>
      </div>
    );
  };

  const renderAddress = () => {
    if (!address) {
      return null;
    }

    return (
      <div className={styles.addressText}>
        <Text type={addressTextType} color={addressTextColor} link>
          {shortenAddress(address)}
        </Text>
      </div>
    );
  };

  return (
    <div className={styles.avatar}>
      <Circle
        border={border}
        size={size}
        color="white"
        input="https://i.imgur.com/lhTwRZY.png"
        type="img"
      />
      {name || address ? (
        <div className={styles.textWrapper}>
          {renderName()}
          {renderAddress()}
        </div>
      ) : null}
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  border: PropTypes.bool,
  name: PropTypes.string,
  address: PropTypes.string,
  nameTextType: PropTypes.string,
  nameTextColor: PropTypes.string,
  addressTextType: PropTypes.string,
  addressTextColor: PropTypes.string
};

Avatar.defaultProps = {
  size: 'medium',
  border: false,
  nameTextType: 'H3',
  addressTextType: 'BodySmall'
};

export default Avatar;

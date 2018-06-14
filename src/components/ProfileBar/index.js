import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileBar.module.scss';
import { shortenAddress } from './../../utils/utilities';

import { Circle, Text } from 'components';

const ProfileBar = props => {
  const { public_address, icon, className } = props;

  return (
    <div className={`${styles.profileBar} ${className}`}>
      <Circle type="image" input={icon} size="mini" />
      <Text className={`${styles.text}`} link color="white">
        {shortenAddress(public_address)}
      </Text>
    </div>
  );
};

ProfileBar.propTypes = {};

ProfileBar.defaultProps = {
  public_address: '0x0000000000000000000000000',
  icon:
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  className: ''
};

export default ProfileBar;

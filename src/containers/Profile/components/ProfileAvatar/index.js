import React from 'react';
import styles from './ProfileAvatar.module.scss';
import { Avatar, FullAddressBar, Text } from 'components';

const ProfileAvatar = props => {
  const { address, img, name, className } = props;

  return (
    <div className={`${styles.centerAvatar} ${className}`}>
      <Avatar size="large" border hash={address} img={img} />
      <Text typeScale="h1" color="black" weight="fontWeight-bold">
        {name}
      </Text>
      <FullAddressBar address={address} copyButton />
    </div>
  );
};

export default ProfileAvatar;

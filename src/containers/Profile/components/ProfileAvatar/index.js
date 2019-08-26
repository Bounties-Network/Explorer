import React from 'react';
import styles from './ProfileAvatar.module.scss';
import { Avatar, FullAddressBar, Text } from 'components';

const ProfileAvatar = props => {
  const { address, img, name, className } = props;

  return (
    <div className={`${styles.centerAvatar} ${className}`}>
      <Avatar
        className={styles.profileAvatar}
        variant="large"
        hash={address}
        img={img}
      />
      <Text
        className={styles.profileName}
        typeScale="h2"
        color="black"
        weight="fontWeight-bold"
      >
        {name}
      </Text>
      <FullAddressBar
        className={styles.profileAddress}
        address={address}
        copyButton
      />
    </div>
  );
};

export default ProfileAvatar;

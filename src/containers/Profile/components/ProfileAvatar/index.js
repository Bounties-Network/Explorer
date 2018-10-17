import React from 'react';
import styles from './ProfileAvatar.module.scss';
import { Avatar, FullAddressBar, Text } from 'components';

const ProfileAvatar = props => {
  const { address, img, name, className, ensDomain } = props;

  return (
    <div className={`${styles.centerAvatar} ${className}`}>
      <Avatar
        className={styles.profileAvatar}
        size="large"
        border
        hash={address}
        img={img}
        ensDomain={ensDomain}
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

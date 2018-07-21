import React from 'react';
import { Avatar, FullAddressBar, Text } from 'components';

const ProfileAvatar = props => {
  const { address, img, name } = props;

  return (
    <React.Fragment>
      <Avatar size="large" border hash={address} img={img} />

      <Text typeScale="h1" color="black" weight="fontWeight-bold">
        {name}
      </Text>

      <FullAddressBar address={address} copyButton />
    </React.Fragment>
  );
};

export default ProfileAvatar;

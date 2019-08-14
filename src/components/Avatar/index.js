/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

const AvatarImage = props => {
  const { img, hash, variant, size } = props;

  let avatarSize = () => {
    switch (size) {
      case 'small':
        return 5;
      case 'medium':
        return 6;
      case 'large':
        return 7;
      default:
        return '';
    }
  };

  return (
    <Image
      {...props}
      bg="white"
      src={img ? img : hash}
      type={img ? 'img' : 'blocky'}
      sx={{
        border: 1,
        boxShadow: 1,
        height: avatarSize(size),
        width: avatarSize(size)
      }}
      variant={variant}
    />
  );
};

const Name = props => {
  if (!props.name) {
    return (
      <Text variant="bodyStrong" color="black" lineHeight="reset">
        --
      </Text>
    );
  } else {
    return (
      <Text variant="bodyStrong" color="black" lineHeight="reset">
        {props.name}
      </Text>
    );
  }
};

const Address = props => {
  if (!props.address) {
    return null;
  } else {
    return (
      <Text variant="body" color="brandSecondary" lineHeight="reset">
        {shortenAddress(props.address)}
      </Text>
    );
  }
};

const Avatar = props => {
  const { src, onClick, address, name } = props;

  return (
    <Link
      {...props}
      src={src ? src : '/profile/' + address}
      onClick={onClick}
      css={{ '&:hover': { textDecoration: 'none' } }}
    >
      <Flex alignItems="center">
        <AvatarImage {...props} />
        {name || address ? (
          <Flex ml={2} flexDirection="column" justifyContent="center">
            <Name {...props} />
            <Address {...props} />
          </Flex>
        ) : null}
      </Flex>
    </Link>
  );
};

export default Avatar;

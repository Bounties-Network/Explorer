import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, Flex, Box, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

const AvatarLink = props => (
  <Link
    {...props}
    sx={{
      ':hover': {
        textDecoration: 'none'
      }
    }}
  />
);

const Avatar = props => {
  const { name, address, img, hash, src, onClick } = props;

  const renderName = () => {
    if (!name) {
      return null;
    }

    return (
      <Text fontSize={1} sx={{ color: 'brandPrimary' }}>
        {name}
      </Text>
    );
  };

  const renderAddress = () => {
    if (!address) {
      return null;
    }

    return (
      <Text
        fontSize={1}
        sx={{ lineHeight: 'reset', color: 'brandDestructive' }}
      >
        {shortenAddress(address)}
      </Text>
    );
  };

  return (
    <AvatarLink src={src ? src : '/profile/' + address} onClick={onClick}>
      <Flex alignItems="center">
        <Image
          width={5}
          height={5}
          src={img ? img : hash}
          type={img ? 'img' : 'blocky'}
          sx={{
            borderRadius: '50%'
          }}
        />
        {name || address ? (
          <Box ml={2}>
            {renderName()}
            {renderAddress()}
          </Box>
        ) : null}
      </Flex>
    </AvatarLink>
  );
};

export default Avatar;

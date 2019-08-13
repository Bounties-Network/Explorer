/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

const LinkWrapper = props => {
  return (
    <Link
      {...props}
      css={css({
        '&:hover': {
          textDecoration: 'none'
        }
      })}
    />
  );
};

const Avatar = props => {
  const { name, address, img, hash, src, onClick } = props;

  const renderName = () => {
    if (!name) {
      return null;
    }

    return (
      <Text variant="h5" color="black">
        {name}
      </Text>
    );
  };

  const renderAddress = () => {
    if (!address) {
      return null;
    }

    return (
      <Text variant="body" color="brandSecondary">
        {shortenAddress(address)}
      </Text>
    );
  };

  return (
    <LinkWrapper src={src ? src : '/profile/' + address} onClick={onClick}>
      <Flex alignItems="center">
        <Image
          width={5}
          height={5}
          src={img ? img : hash}
          type={img ? 'img' : 'blocky'}
          sx={{
            borderRadius: 3
          }}
        />
        {name || address ? (
          <Flex ml={2} flexDirection="column" justifyContent="space-between">
            {renderName()}
            {renderAddress()}
          </Flex>
        ) : null}
      </Flex>
    </LinkWrapper>
  );
};

export default Avatar;

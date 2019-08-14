/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

const Avatar = props => {
  const { name, address, img, hash, src, onClick } = props;

  const renderImage = props => {
    return (
      <Image
        {...props}
        bg="white"
        src={img ? img : hash}
        type={img ? 'img' : 'blocky'}
        css={css({
          border: 1,
          borderRadius: 3,
          boxShadow: 1,
          height: 5,
          width: 5
        })}
      />
    );
  };

  const renderName = () => {
    if (!name) {
      return (
        <Text variant="h5" color="black">
          --
        </Text>
      );
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
    <Link
      src={src ? src : '/profile/' + address}
      onClick={onClick}
      css={css({
        '&:hover': {
          textDecoration: 'none'
        }
      })}
    >
      <Flex alignItems="center">
        {renderImage()}
        {name || address ? (
          <Flex ml={2} flexDirection="column" justifyContent="space-between">
            {renderName()}
            {renderAddress()}
          </Flex>
        ) : null}
      </Flex>
    </Link>
  );
};

export default Avatar;

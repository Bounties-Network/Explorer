/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { css } from '@styled-system/css';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

const AvatarImage = props => {
  const { type, size } = props;

  let avatarSize = () => {
    switch (size) {
      case 'small':
        return 5;
      case 'medium':
        return 6;
      case 'large':
        return 7;
      default:
        return 5;
    }
  };

  return (
    <Image
      src={props.img ? props.img : props.hash}
      type={props.img ? 'img' : 'blocky'}
      css={css({
        bg: 'white',
        border: 1,
        boxSizing: 'content-box',
        boxShadow: 1,
        height: avatarSize(),
        width: avatarSize(),
        variant: 'avatarTypes.' + type
      })}
    />
  );
};

const AvatarText = props => {
  const { size, onDark } = props;

  let nameSize = () => {
    switch (size) {
      case 'small':
        return 'bodyStrong';
      case 'medium':
        return 'h4';
      case 'large':
        return 'h2';
      default:
        return 'bodyStrong';
    }
  };

  let addressSize = () => {
    switch (size) {
      case 'small':
        return 'body';
      case 'medium':
        return 'bodyLarge';
      case 'large':
        return 'h4';
      default:
        return 'body';
    }
  };

  let nameContrast = () => {
    if (onDark === true) {
      return 'white';
    } else {
      return 'black';
    }
  };

  let addressContrast = () => {
    if (onDark === true) {
      return 'rgba(255, 255, 255, 0.5);';
    } else {
      return 'brandSecondary';
    }
  };

  const Name = () => {
    if (!props.name) {
      return (
        <Text
          variant={nameSize()}
          fontWeight="medium"
          color={nameContrast()}
          lineHeight="reset"
        >
          --
        </Text>
      );
    } else {
      return (
        <Text
          variant={nameSize()}
          fontWeight="medium"
          color={nameContrast()}
          lineHeight="reset"
          css={css({
            '&:not(:last-child)': {
              mb: 1
            }
          })}
        >
          {props.name}
        </Text>
      );
    }
  };

  const Address = () => {
    if (!props.address) {
      return null;
    } else {
      return (
        <Text
          variant={addressSize()}
          color={addressContrast()}
          lineHeight="reset"
        >
          {shortenAddress(props.address)}
        </Text>
      );
    }
  };

  return (
    <Flex ml={2} flexDirection="column" justifyContent="center">
      <Name />
      <Address />
    </Flex>
  );
};

const Avatar = props => {
  const { src, onClick, address, name } = props;

  return (
    <Link
      src={src ? src : '/profile/' + address}
      onClick={onClick}
      css={{ '&:hover': { textDecoration: 'none' } }}
    >
      <Flex alignItems="center">
        <AvatarImage bg="black" {...props} />
        {name || address ? <AvatarText {...props} /> : null}
      </Flex>
    </Link>
  );
};

Avatar.propTypes = {
  type: PropTypes.oneOf(['user', 'community']),
  onClick: PropTypes.func,
  src: PropTypes.string,
  address: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  hash: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onDark: PropTypes.bool
};

Avatar.defaultProps = {
  type: 'user',
  size: 'small'
};

export default Avatar;

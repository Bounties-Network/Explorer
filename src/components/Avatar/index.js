import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@styled-system/css';
import Blockies from 'react-blockies';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

const ImageContainer = props => {
  const { type, size, img } = props;

  let avatarSize = () => {
    switch (size) {
      case 'small':
        return 4;
      case 'medium':
        return 5;
      case 'large':
        return 7;
      default:
        return 4;
    }
  };

  let blockySize = () => {
    switch (size) {
      case 'small':
        return { size: '8', scale: '4' };
      case 'medium':
        return { size: '8', scale: '5' };
      case 'large':
        return { size: '8', scale: '10' };
      default:
        return { size: '8', scale: '4' };
    }
  };

  const AvatarImage = () => {
    if (!img) {
      return <Blockies seed={props.hash} {...blockySize()} />;
    } else {
      return <Image src={img ? img : props.hash} height="100%" width="auto" />;
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      css={css({
        bg: 'white',
        border: size === 'small' ? 'none' : 1,
        boxShadow: size === 'small' ? 'none' : 1,
        overflow: 'hidden',
        height: avatarSize(),
        width: avatarSize(),
        variant: 'avatarTypes.' + type
      })}
    >
      <AvatarImage {...props} />
    </Flex>
  );
};

const TextContainer = props => {
  const { size, onDark } = props;

  let nameSize = () => {
    switch (size) {
      case 'small' || 'medium':
        return 'bodyStrong';
      case 'large':
        return 'h2';
      default:
        return 'bodyStrong';
    }
  };

  let addressSize = () => {
    switch (size) {
      case 'small' || 'medium':
        return 'body';
      case 'large':
        return 'h4';
      default:
        return 'body';
    }
  };

  const Name = () => {
    if (!props.name) {
      return (
        <Text
          variant={nameSize()}
          fontWeight="medium"
          color={onDark ? 'white' : 'black'}
          lineHeight="reset"
          mt={-1}
        >
          --
        </Text>
      );
    } else {
      return (
        <Text
          className="nameText"
          variant={nameSize()}
          fontWeight="medium"
          color={onDark ? 'white' : 'black'}
          lineHeight="reset"
          mr={props.textFormat === 'inline' ? 2 : ''}
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
          className="address"
          variant={addressSize()}
          color={onDark ? 'white' : 'brandSecondary'}
          lineHeight="reset"
        >
          {shortenAddress(props.address)}
        </Text>
      );
    }
  };

  return (
    <Flex
      ml={size === 'large' ? 3 : 2}
      css={css({
        variant: 'textFormat.' + props.textFormat
      })}
    >
      <Name />
      <Address />
    </Flex>
  );
};

const Avatar = props => {
  const { src, onClick, address, name, textFormat } = props;

  return (
    <Link
      src={src ? src : '/profile/' + address}
      onClick={onClick}
      css={{
        display: 'inline-block',
        '&:hover': { textDecoration: 'none' },
        '&:hover .address': { textDecoration: 'underline' }
      }}
    >
      <Flex alignItems={textFormat === 'inline' ? 'flex-start' : 'center'}>
        <ImageContainer {...props} />
        {name || address ? <TextContainer {...props} /> : null}
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
  textFormat: PropTypes.oneOf(['block', 'inline']),
  img: PropTypes.string,
  hash: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onDark: PropTypes.bool
};

Avatar.defaultProps = {
  type: 'user',
  size: 'small',
  textFormat: 'block'
};

export default Avatar;

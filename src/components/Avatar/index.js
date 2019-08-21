import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@styled-system/css';
import Blockies from 'react-blockies';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

const AvatarContainer = props => {
  const { src, onClick } = props;
  return (
    <Link
      src={src ? src : '/profile/' + props.address}
      onClick={onClick}
      css={{
        display: 'inline-block',
        '&:hover': { textDecoration: 'none' },
        '&:hover .address': { textDecoration: 'underline' }
      }}
    >
      {props.children}
    </Link>
  );
};

const ImageContainer = props => {
  const { type, size } = props;

  let containerSize = () => {
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

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      css={css({
        bg: 'white',
        border: size === 'small' ? 'none' : 1,
        boxShadow: size === 'small' ? 'none' : 1,
        overflow: 'hidden',
        height: containerSize(),
        width: containerSize(),
        variant: 'avatarTypes.' + type
      })}
    >
      {props.children}
    </Flex>
  );
};

const AvatarImage = props => {
  const { img } = props;

  let blockySize = () => {
    switch (props.size) {
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

  if (!img) {
    return <Blockies seed={props.hash} {...blockySize()} />;
  } else {
    return <Image src={img ? img : props.hash} height="100%" width="auto" />;
  }
};

const AvatarText = props => {
  const { size } = props;

  return (
    <Flex
      pl={(size === 'large' ? 3 : 2, props.textFormat === 'inline' ? 3 : 2)}
      css={css({
        variant: 'textFormat.' + props.textFormat
      })}
    >
      {props.children}
    </Flex>
  );
};

const Name = props => {
  const { onDark } = props;
  let nameSize = () => {
    switch (props.size) {
      case 'small' || 'medium':
        return 'bodyStrong';
      case 'large':
        return 'h2';
      default:
        return 'bodyStrong';
    }
  };
  if (!props.name) {
    return (
      <Text
        display={props.size === 'small' ? 'none' : null}
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

const Address = props => {
  let addressSize = () => {
    switch (props.size) {
      case 'small' || 'medium':
        return 'body';
      case 'large':
        return 'bodyLarge';
      default:
        return 'body';
    }
  };
  if (!props.address) {
    return null;
  } else {
    return (
      <Text
        className="address"
        variant={addressSize()}
        color={props.onDark ? 'transparentWhite' : 'brandSecondary'}
        lineHeight="reset"
      >
        {shortenAddress(props.address)}
      </Text>
    );
  }
};

const Avatar = props => {
  const { address, name, textFormat } = props;

  return (
    <AvatarContainer {...props}>
      <Flex alignItems={textFormat === 'inline' ? 'flex-start' : 'center'}>
        <ImageContainer {...props}>
          <AvatarImage {...props} />
        </ImageContainer>

        {name || address ? (
          <AvatarText {...props}>
            <Name {...props} />
            <Address {...props} />
          </AvatarText>
        ) : null}
      </Flex>
    </AvatarContainer>
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
  size: 'medium',
  textFormat: 'block'
};

export default Avatar;

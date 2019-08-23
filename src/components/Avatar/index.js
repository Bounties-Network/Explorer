import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@styled-system/css';
import styled from '@emotion/styled';
import Blockies from 'react-blockies';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';

let imageContainerSize = props => {
  switch (props.size) {
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

const AvatarWrapper = styled(Link)(
  css({
    display: 'inline-block',
    '&:hover': { textDecoration: 'none' },
    '&:hover .address': { textDecoration: 'underline' }
  })
);

const ImageContainer = styled(Flex)(props =>
  css({
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'white',
    border: props.size === 'small' ? 'none' : 1,
    boxShadow: props.size === 'small' ? 'none' : 1,
    overflow: 'hidden',
    size: imageContainerSize({ ...props }),
    variant: 'avatarTypes.' + props.type
  })
);

const TextContainer = styled(Flex)(props =>
  css({
    pl: props.size === 'large' || props.textFormat === 'inline' ? 3 : 2,
    variant: 'textFormat.' + props.textFormat
  })
);

const AvatarImage = props => {
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

  if (!props.img) {
    return <Blockies seed={props.hash} {...blockySize()} />;
  } else {
    return (
      <Image
        src={props.img ? props.img : props.hash}
        height="100%"
        width="auto"
      />
    );
  }
};

const Name = props => {
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
        color={props.onDark ? 'white' : 'black'}
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
        color={props.onDark ? 'white' : 'black'}
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
  const { address, name, textFormat, src, onClick } = props;

  return (
    <AvatarWrapper
      src={src ? src : '/profile/' + props.address}
      onClick={onClick}
      {...props}
    >
      <Flex alignItems={textFormat === 'inline' ? 'flex-start' : 'center'}>
        <ImageContainer {...props}>
          <AvatarImage {...props} />
        </ImageContainer>

        {name || address ? (
          <TextContainer {...props}>
            <Name {...props} />
            <Address {...props} />
          </TextContainer>
        ) : null}
      </Flex>
    </AvatarWrapper>
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

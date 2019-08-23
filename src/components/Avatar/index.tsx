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

let nameSize = props => {
  switch (props.size) {
    case 'small' || 'medium':
      return 'bodyStrong';
    case 'large':
      return 'h2';
    default:
      return 'bodyStrong';
  }
};

let addressSize = props => {
  switch (props.size) {
    case 'small' || 'medium':
      return 'body';
    case 'large':
      return 'bodyLarge';
    default:
      return 'body';
  }
};

const AvatarWrapper = styled(Link)<any>(props =>
  css({
    display: 'flex',
    alignItems: props.textFormat === 'inline' ? 'flex-start' : 'center',
    '&:hover': { textDecoration: 'none' }
  })
);

const ImageContainer = styled(Flex)<any>(props =>
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
    return <Image src={props.img ? props.img : props.hash} height="100%" width="auto" />;
  }
};

const TextContainer = styled(Flex)<any>(props =>
  css({
    pl: props.size === 'large' || props.textFormat === 'inline' ? 3 : 2,
    variant: 'textFormat.' + props.textFormat
  })
);

const AvatarName = styled(Text)<any>(props =>
  css({
    display: props.size === 'small' ? 'none' : '',
    color: props.onDark ? 'white' : 'black',
    mt: !props.name ? -1 : '',
    mr: props.textFormat === 'inline' ? 2 : '',
    variant: 'text.' + nameSize({ ...props }),
    lineHeight: 'reset',
    '&:not(:last-child)': {
      mb: 1
    }
  })
);

const AvatarAddress = styled(Text)<any>(props =>
  css({
    color: props.onDark ? 'transparentWhite' : 'brandSecondary',
    variant: 'text.' + addressSize({ ...props }),
    lineHeight: 'reset',
    'a:hover &': { textDecoration: 'underline' }
  })
);

const Avatar = props => {
  const { address, name, src, onClick } = props;

  return (
    <AvatarWrapper src={src ? src : '/profile/' + props.address} onClick={onClick} {...props}>
      <ImageContainer {...props}>
        <AvatarImage {...props} />
      </ImageContainer>

      {name || address ? (
        <TextContainer {...props}>
          <AvatarName {...props}>{name ? name : '--'}</AvatarName>
          <AvatarAddress {...props}>{address ? shortenAddress(props.address) : null}</AvatarAddress>
        </TextContainer>
      ) : null}
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

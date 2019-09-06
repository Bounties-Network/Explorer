import React from 'react';
import { css } from '@styled-system/css';
import styled from 'lib/emotion-styled';
import Blockies from 'react-blockies';
import { Text, Image, Flex, Link, Box } from 'rebass';
import { shortenAddress } from 'utils/helpers';

let imageContainerVariantSize = variant => {
  switch (variant) {
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

let nameSize = variant => {
  switch (variant) {
    case 'small' || 'medium':
      return 'bodyStrong';
    case 'large':
      return 'h2';
    default:
      return 'bodyStrong';
  }
};

let addressSize = variant => {
  switch (variant) {
    case 'small' || 'medium':
      return 'link';
    case 'large':
      return 'linkStrong';
    default:
      return 'link';
  }
};

type AvatarWrapperProps = Pick<AvatarProps, 'textFormat'>;
const AvatarWrapper = styled(Link)<AvatarWrapperProps>(props =>
  css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: props.textFormat === 'inline' ? 'flex-start' : 'center',
    '&:hover': { textDecoration: 'none' }
  })
);

type ImageContainerProps = Pick<AvatarProps, 'variant' | 'resourceType'>;
const ImageContainer = styled(Flex)<ImageContainerProps>(
  props =>
    css({
      alignItems: 'center',
      flexShrink: 0,
      justifyContent: 'center',
      bg: 'white',
      border: props.variant === 'small' ? 'none' : 1,
      boxShadow: props.variant === 'small' ? 'none' : 1,
      overflow: 'hidden',
      size: imageContainerVariantSize(props.variant),
      variant: `avatarResourceTypes.${props.resourceType}`
    })
  // props => props.theme.avatarResourceTypes[props.resourceType] or use this instead of the variant key above
);

type AvatarImageProps = Pick<AvatarProps, 'variant' | 'hash' | 'img'>;
const AvatarImage: React.FC<AvatarImageProps> = ({ variant, hash, img }) => {
  let blockySize = () => {
    switch (variant) {
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
    return <Blockies seed={hash} {...blockySize()} />;
  } else {
    return <Image src={img} height="100%" width="auto" />;
  }
};

type TextContainerProps = Pick<AvatarProps, 'variant' | 'textFormat'>;
const TextContainer = styled(Flex)<TextContainerProps>(props =>
  css({
    flexShrink: 0,
    pl: props.variant === 'large' || props.textFormat === 'inline' ? 3 : 2,
    variant: 'textFormat.' + props.textFormat
  })
);

type AvatarNameProps = Pick<
  AvatarProps,
  'variant' | 'textFormat' | 'onDark' | 'name'
>;
const AvatarName = styled(Text)<AvatarNameProps>(props =>
  css({
    display: props.variant === 'small' ? 'none' : '',
    color: props.onDark ? 'white' : 'black',
    mt: !props.name ? -1 : '',
    mr: props.textFormat === 'inline' ? 2 : '',
    textAlign: 'left',
    variant: 'text.' + nameSize(props.variant),
    fontFamily: 'secondary',
    lineHeight: 'reset',
    '&:not(:last-child):not(:only-child)': {
      mb: 1
    }
  })
);

type AvatarAddressProps = Pick<AvatarProps, 'onDark' | 'variant'>;
const AvatarAddress = styled(Text)<AvatarAddressProps>(props =>
  css({
    color: props.onDark ? 'transparentWhite' : 'seaGlass300',
    variant: 'text.' + addressSize(props.variant),
    fontFamily: 'secondary',
    lineHeight: 'reset',
    'a:hover &': { textDecoration: 'underline' }
  })
);

type AvatarProps = {
  variant: 'small' | 'medium' | 'large';
  name: string | undefined;
  resourceType: 'user' | 'community';
  textFormat?: 'block' | 'inline';
  onDark: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>
  ) => void;
  src?: string;
  img?: string;
  address?: string;
  hash?: string;
};
const Avatar: React.FC<AvatarProps> = props => {
  const {
    resourceType = 'user',
    variant = 'medium',
    textFormat = 'block',
    onDark = false,
    address,
    name,
    src,
    onClick,
    hash,
    img
  } = props;

  return (
    <Box display="inline-block">
      <AvatarWrapper
        src={src ? src : '/profile/' + address}
        onClick={onClick}
        textFormat={textFormat}
      >
        <ImageContainer variant={variant} resourceType={resourceType}>
          <AvatarImage variant={variant} img={img} hash={hash} />
        </ImageContainer>

        {name || address ? (
          <TextContainer textFormat={textFormat} variant={variant}>
            <AvatarName
              variant={variant}
              name={name}
              onDark={onDark}
              textFormat={textFormat}
            >
              {name || '--'}
            </AvatarName>
            {address && (
              <AvatarAddress variant={variant} onDark={onDark}>
                {shortenAddress(address)}
              </AvatarAddress>
            )}
          </TextContainer>
        ) : null}
      </AvatarWrapper>
    </Box>
  );
};

export default Avatar;

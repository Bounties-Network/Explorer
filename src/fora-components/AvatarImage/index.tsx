import React from 'react';
import styled from 'lib/emotion-styled';
import { Image, Flex } from 'rebass';
import css from '@styled-system/css';
import Blockies from 'react-blockies';

let blockBySize = variant => {
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

let imageContainerVariantSize = variant => {
  switch (variant) {
    case 'small':
      return 4;
    case 'medium':
      return 5;
    case 'large':
      return 8;
  }
};

type ImageContainerProps = { variant: string; resourceType: string };
const ImageContainer = styled(Flex)<ImageContainerProps>(
  props =>
    css({
      cursor: 'pointer',
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

export type AvatarImageProps = {
  variant?: string;
  resourceType?: string;
  src: string | undefined;
  address?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ variant = 'medium', resourceType = 'user', src, address }) => (
  <ImageContainer variant={variant} resourceType={resourceType}>
    {src ? (
      <Image src={src} height="100%" width="auto" />
    ) : (
      <Blockies seed={address} {...blockBySize(variant)} />
    )}
  </ImageContainer>
);

export default AvatarImage;

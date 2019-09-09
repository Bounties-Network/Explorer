import styled from 'lib/emotion-styled';
import { Image } from 'rebass';
import css from '@styled-system/css';

const borderRadiusVariant = (variant: string) => {
  switch (variant) {
    case 'circle':
      return 3;
    default:
      return 2;
  }
};

const AvatarImage = styled(Image)<{ variant?: string }>(
  ({ variant = 'roundedSquare' }) =>
    css({
      boxShadow: 0,
      border: 'avatar',
      boxSizing: 'border-box',
      borderRadius: borderRadiusVariant(variant),
      width: 40,
      height: 40
    })
);

export default AvatarImage;

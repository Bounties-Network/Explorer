import React from 'react';
import Blockies from 'react-blockies';
import { Text, Image, Flex, Link } from 'rebass';
import { shortenAddress } from 'utils/helpers';
import css from '@styled-system/css';

interface IAvatarContainer {
  address: string;
  src: string;
  onClick: any;
}

const AvatarContainer: React.FC<IAvatarContainer> = props => {
  const { src, onClick, address, children } = props;
  return (
    <Link
      src={src ? src : '/profile/' + address}
      onClick={onClick}
      css={css({
        display: 'inline-block',
        '&:hover': { textDecoration: 'none' },
        '&:hover .address': { textDecoration: 'underline' }
      })}
    >
      {children}
    </Link>
  );
};

interface IImageContainer {
  type: string;
  size: string;
}

const ImageContainer: React.FC<IImageContainer> = props => {
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
        boxShadow: size === 'small' ? 'none' : '1px',
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

interface IAvatarImage {
  img: string;
  size: string;
  hash: string;
}

const AvatarImage: React.FunctionComponent<IAvatarImage> = props => {
  const { img, size, hash } = props;

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

  if (!img) {
    return <Blockies seed={hash} {...blockySize()} />;
  } else {
    return <Image src={img ? img : hash} height="100%" width="auto" />;
  }
};

interface IAvatarText {
  textFormat: string;
}

const AvatarText: React.FunctionComponent<IAvatarText> = props => {
  const { textFormat, children } = props;

  return (
    <Flex pl={textFormat === 'inline' ? 3 : 2} variant={'textFormat.' + textFormat}>
      {children}
    </Flex>
  );
};

type IAvatarName = Pick<IAvatar, 'onDark' | 'size' | 'name' | 'textFormat'>;

const AvatarName: React.FunctionComponent<IAvatarName> = props => {
  const { onDark, name, size, textFormat } = props;
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
  if (!name) {
    return (
      <Text
        variant={nameSize()}
        fontWeight="normal"
        color={onDark ? 'white' : 'black'}
        lineHeight="reset"
        mt={-1}
        css={css({ display: size === 'small' ? 'none' : '' })}
      >
        --
      </Text>
    );
  } else {
    return (
      <Text
        className="nameText"
        variant={nameSize()}
        fontWeight="normal"
        color={onDark ? 'white' : 'black'}
        lineHeight="reset"
        mr={textFormat === 'inline' ? 2 : ''}
        css={css({
          '&:not(:last-child)': {
            mb: 1
          }
        })}
      >
        {name}
      </Text>
    );
  }
};

type IAvatarAddress = Pick<IAvatar, 'size' | 'address' | 'onDark'>;

class AvatarAddress extends React.Component<IAvatarAddress> {
  render() {
    const { size, address, onDark } = this.props;

    let addressSize = () => {
      switch (size) {
        case 'small' || 'medium':
          return 'body';
        case 'large':
          return 'bodyLarge';
        default:
          return 'body';
      }
    };
    if (!address) {
      return null;
    } else {
      return (
        <Text
          className="address"
          variant={addressSize()}
          color={onDark ? 'transparentWhite' : 'brandSecondary'}
          lineHeight="reset"
        >
          {shortenAddress(address)}
        </Text>
      );
    }
  }
}

interface IAvatar {
  address: string;
  name: string;
  textFormat: 'block' | 'inline';
  src: string;
  size: 'small' | 'medium' | 'large';
  img: string;
  hash: string;
  onDark: boolean;
  type: 'user' | 'community';
  onClick: Function;
}

const Avatar: React.FunctionComponent<IAvatar> = ({
  src,
  onClick,
  address,
  name,
  img,
  hash,
  onDark,
  textFormat = 'block',
  size = 'medium',
  type = 'user'
}) => {
  return (
    <AvatarContainer src={src} address={address} onClick={onClick}>
      <Flex alignItems={textFormat === 'inline' ? 'flex-start' : 'center'}>
        <ImageContainer type={type} size={size}>
          <AvatarImage img={img} size={size} hash={hash} />
        </ImageContainer>
        {name || address ? (
          <AvatarText textFormat={textFormat}>
            <AvatarName textFormat={textFormat} onDark={onDark} size={size} name={name} />
            <AvatarAddress size={size} address={address} onDark={onDark} />
          </AvatarText>
        ) : null}
      </Flex>
    </AvatarContainer>
  );
};

export default Avatar;

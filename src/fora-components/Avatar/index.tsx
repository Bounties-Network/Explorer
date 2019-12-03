/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text, Flex, Link } from "@theme-ui/components";
import { shortenAddress } from "utils/helpers";
import AvatarImage from "fora-components/AvatarImage";

const AvatarWrapper = props => (
  <Link
    {...props}
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      "&:hover": { textDecoration: "none" }
    }}
  />
);

const TextContainer = props => (
  <Flex
    {...props}
    sx={{
      fontSize: "base",
      flexShrink: 0,
      flexDirection: "column",
      ml: "0.75rem"
    }}
  />
);

type AvatarNameProps = Pick<AvatarProps, "onDark" | "name">;
const AvatarName: React.FC<AvatarNameProps> = props => (
  <Text
    {...props}
    sx={{
      color: props.onDark ? "white" : "black",
      mt: props.name ? "" : -1,
      mb: props.name ? 2 : 1,
      fontWeight: "medium"
    }}
  />
);

type AvatarAddressProps = Pick<AvatarProps, "onDark">;
const AvatarAddress: React.FC<AvatarAddressProps> = props => (
  <Link
    {...props}
    sx={{
      color: props.onDark ? "transparentWhite" : "seaGlass.300",
      "a:hover &": { textDecoration: "underline" }
    }}
  />
);

export type AvatarProps = {
  name?: string | undefined;
  onDark?: boolean;
  hasShadow?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>
  ) => void;
  src?: string;
  size?: string; // "small", "medium", "large"
  img?: string;
  address?: string;
};
const Avatar: React.FC<AvatarProps> = props => {
  const {
    onDark = false,
    address,
    name,
    size = "medium",
    hasShadow = true,
    src,
    onClick,
    img
  } = props;

  return (
    <AvatarWrapper src={src ? src : "/profile/" + address} onClick={onClick}>
      <AvatarImage
        hasShadow={hasShadow}
        src={img}
        size={size}
        address={address}
      />
      <TextContainer>
        <AvatarName name={name} onDark={onDark}>
          {name || "--"}
        </AvatarName>
        <AvatarAddress onDark={onDark}>{shortenAddress(address)}</AvatarAddress>
      </TextContainer>
    </AvatarWrapper>
  );
};

export default Avatar;

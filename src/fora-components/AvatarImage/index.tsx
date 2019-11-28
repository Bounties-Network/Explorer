import React from "react";
import styled from "lib/emotion-styled";
import { Image, Flex } from "rebass";
import css from "@styled-system/css";
import Blockies from "react-blockies";

let blockBySize = variant => {
  switch (variant) {
    case "small":
      return { size: "9", scale: "4" };
    case "medium":
      return { size: "9", scale: "6" };
    case "large":
      return { size: "9", scale: "11" };
    default:
      return { size: "9", scale: "6" };
  }
};

let imageContainerVariantSize = variant => {
  switch (variant) {
    case "small":
      return "avatarImage.sm";
    case "medium":
      return "avatarImage.md";
    case "large":
      return "avatarImage.lg";
  }
};

let getBoxShadow = (variant, resourceType) => {
  if (variant === "small") {
    return "none";
  } else {
    if (resourceType === "community") {
      return 0;
    }
    return 0;
  }
};

let getBorder = (variant, resourceType) => {
  if (variant === "small") {
    return "none";
  } else {
    if (variant === "large") {
      return "avatar.large";
    }
    if (resourceType === "community") {
      return "avatar.default";
    }
    return "avatar.default";
  }
};

type ImageContainerProps = { variant: string; resourceType: string };
const ImageContainer = styled(Flex)<ImageContainerProps>(
  props =>
    css({
      boxSizing: "content-box",
      alignItems: "center",
      flexShrink: 0,
      justifyContent: "center",
      bg: "white",
      border: getBorder(props.variant, props.resourceType),
      boxShadow: getBoxShadow(props.variant, props.resourceType),
      overflow: "hidden",
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
};

const AvatarImage: React.FC<AvatarImageProps> = ({
  variant = "medium",
  resourceType = "user",
  src,
  address
}) => (
  <ImageContainer variant={variant} resourceType={resourceType}>
    {typeof src === "string" ? (
      <Image src={src} height="100%" width="auto" />
    ) : (
      <Blockies seed={address} {...blockBySize(variant)} />
    )}
  </ImageContainer>
);

export default AvatarImage;

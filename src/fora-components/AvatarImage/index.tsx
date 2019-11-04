import React from "react";
import styled from "lib/emotion-styled";
import { Image, Flex } from "rebass";
import css from "@styled-system/css";
import Blockies from "react-blockies";

let blockBySize = variant => {
  switch (variant) {
    case "small":
      return { size: "8", scale: "4" };
    case "medium":
      return { size: "8", scale: "5" };
    case "large":
      return { size: "8", scale: "10" };
    default:
      return { size: "8", scale: "4" };
  }
};

let imageContainerVariantSize = variant => {
  switch (variant) {
    case "small":
      return 4;
    case "medium":
      return 5;
    case "large":
      return 8;
  }
};

let getBoxShadow = (variant, resourceType) => {
  if (variant === "small") {
    return "none";
  } else {
    if (resourceType === "community") {
      return 1;
    }
    return 1;
  }
};

let getBorder = (variant, resourceType) => {
  if (variant === "small") {
    return "none";
  } else {
    if (resourceType === "community") {
      return "avatar";
    }
    return "avatar";
  }
};

type ImageContainerProps = { variant: string; resourceType: string };
const ImageContainer = styled(Flex)<ImageContainerProps>(
  props =>
    css({
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

const AvatarImage: React.FC<AvatarImageProps> = ({ variant = "medium", resourceType = "user", src, address }) => (
  <ImageContainer variant={variant} resourceType={resourceType}>
    {typeof src === "string" ? (
      <Image src={src} height="100%" width="auto" />
    ) : (
      <Blockies seed={address} {...blockBySize(variant)} />
    )}
  </ImageContainer>
);

export default AvatarImage;

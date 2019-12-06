/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, Image } from "@theme-ui/components";
import Blockies from "react-blockies";

let getBlockieSize = size => {
  switch (size) {
    case "small":
      return { size: "9", scale: "4" };
    case "medium":
      return { size: "9", scale: "5" };
    case "large":
      return { size: "9", scale: "11" };
    default:
      return { size: "9", scale: "6" };
  }
};

let getAvatarContainerSize = size => {
  switch (size) {
    case "small":
      return "avatarImage.sm";
    case "medium":
      return "avatarImage.md";
    case "large":
      return "avatarImage.lg";
  }
};

let getAvatarBorder = size => {
  switch (size) {
    case "small":
      return "";
    case "medium":
      return "avatar.default";
    case "large":
      return "avatar.large";
  }
};

const ImageContainer = props => (
  <Link
    {...props}
    sx={{
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
      justifyContent: "center",
      border: getAvatarBorder(props.size),
      bg: "white",
      boxShadow: props.size === "small" || props.hasShadow === false ? null : 6,
      overflow: "hidden",
      size: getAvatarContainerSize(props.size),
      variant: `avatars.${props.variant}`
    }}
  />
);

export type AvatarImageProps = {
  variant?: string;
  size?: string;
  hasShadow?: boolean;
  src: string | undefined;
  address?: string;
  linkToProfile?: boolean;
};

const AvatarImage: React.FC<AvatarImageProps> = ({
  variant = "user",
  size = "medium",
  hasShadow = true,
  src = undefined,
  address,
  linkToProfile = true,
  ...props
}) => (
  <ImageContainer
    {...props}
    href={linkToProfile ? "/profile/" + address : null}
    variant={variant}
    size={size}
    hasShadow={hasShadow}
  >
    {typeof src === "string" ? (
      <Image src={src} sx={{ height: "100%", width: "auto" }} />
    ) : (
      <Blockies seed={address} {...getBlockieSize(size)} />
    )}
  </ImageContainer>
);

export default AvatarImage;

import React from "react";
import { css } from "@styled-system/css";
import styled from "lib/emotion-styled";
import { Text, Image, Flex, Link, Box } from "rebass";
import { shortenAddress } from "utils/helpers";
import AvatarImage from "fora-components/AvatarImage";

let imageContainerVariantSize = variant => {
  switch (variant) {
    case "small":
      return 0;
    case "medium":
      return 1;
    case "large":
      return 3;
    default:
      return 1;
  }
};

let nameSize = variant => {
  switch (variant) {
    case "small" || "medium":
      return "body";
    case "large":
      return "h2";
    default:
      return "body";
  }
};

let addressSize = variant => {
  switch (variant) {
    case "small" || "medium":
      return "link";
    case "large":
      return "link";
    default:
      return "link";
  }
};

type AvatarWrapperProps = Pick<AvatarProps, "textFormat">;
const AvatarWrapper = styled(Link)<AvatarWrapperProps>(props =>
  css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: props.textFormat === "inline" ? "flex-start" : "center",
    "&:hover": { textDecoration: "none" }
  })
);

type TextContainerProps = Pick<AvatarProps, "variant" | "textFormat">;
const TextContainer = styled(Flex)<TextContainerProps>(props =>
  css({
    flexShrink: 0,
    pl: props.variant === "large" || props.textFormat === "inline" ? 3 : 2,
    variant: "textFormat." + props.textFormat
  })
);

type AvatarNameProps = Pick<
  AvatarProps,
  "variant" | "textFormat" | "onDark" | "name"
>;
const AvatarName = styled(Text)<AvatarNameProps>(props =>
  css({
    color: props.onDark ? "white" : "black",
    mt: !props.name ? -1 : "",
    mr: props.textFormat === "inline" ? 2 : "",
    textAlign: "left",
    variant: "text." + nameSize(props.variant),
    fontWeight: "medium",
    lineHeight: "reset",
    "&:not(:last-child):not(:only-child)": {
      mb: 1
    }
  })
);

type AvatarScreenNameProps = Pick<AvatarProps, "onDark" | "variant">;
const AvatarScreenName = styled(Text)<AvatarScreenNameProps>(props =>
  css({
    color: props.onDark ? "transparentWhite" : "seaGlass.300",
    variant: "text." + addressSize(props.variant),
    fontWeight: "medium",
    lineHeight: "reset",
    "a:hover &": { textDecoration: "underline" }
  })
);

type AvatarAddressProps = Pick<AvatarProps, "onDark" | "variant">;
const AvatarAddress = styled(Text)<AvatarAddressProps>(props =>
  css({
    color: props.onDark ? "transparentWhite" : "seaGlass.300",
    variant: "text." + addressSize(props.variant),
    fontWeight: "medium",
    lineHeight: "reset",
    "a:hover &": { textDecoration: "underline" }
  })
);

export type AvatarProps = {
  variant: string; //"small" | "medium" | "large";
  name: string | undefined;
  screenName: string | undefined;
  resourceType: string; // "user" | "community";
  textFormat?: "block" | "inline";
  onDark: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>
  ) => void;
  src?: string;
  img?: string;
  address?: string;
};
const Avatar: React.FC<AvatarProps> = props => {
  const {
    resourceType = "user",
    variant = "medium",
    textFormat = "block",
    onDark = false,
    address,
    name,
    screenName,
    src,
    onClick,
    img
  } = props;

  return (
    <Box css={{ display: "inline-block" }}>
      <AvatarWrapper
        src={src ? src : "/profile/" + address}
        onClick={onClick}
        textFormat={textFormat}
      >
        <AvatarImage
          resourceType={resourceType}
          variant={variant}
          src={img}
          address={address}
        />
        <TextContainer textFormat={textFormat} variant={variant}>
          <AvatarName
            variant={variant}
            name={name}
            onDark={onDark}
            textFormat={textFormat}
          >
            {name || "--"}
          </AvatarName>
          {screenName ? (
            <AvatarScreenName variant={variant} onDark={onDark}>
              {`@${screenName}`}
            </AvatarScreenName>
          ) : (
            address && (
              <AvatarAddress variant={variant} onDark={onDark}>
                {shortenAddress(address)}
              </AvatarAddress>
            )
          )}
        </TextContainer>
      </AvatarWrapper>
    </Box>
  );
};

export default Avatar;

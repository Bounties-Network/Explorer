import React from "react";
import ssCSS from "@styled-system/css";
import { Flex, Text } from "rebass";
import emotionStyled from "lib/emotion-styled";

const Container = emotionStyled(Flex)(props =>
  ssCSS({
    borderRadius: 100,
    height: 20,
    py: 2,
    px: 3,
    variant: props.variant
  })
);

interface IProps {
  variant: string;
  resourceType?: string;
  css?: any;
}
const Pill: React.FC<IProps> = ({ resourceType, variant, css, children }) => {
  return (
    <Container
      justifyContent={"center"}
      alignItems={"center"}
      variant={variant}
      css={css}
    >
      {children || <Text variant={variant}>{resourceType}</Text>}
    </Container>
  );
};

export default Pill;

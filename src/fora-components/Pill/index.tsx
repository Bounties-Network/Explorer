/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import ssCSS from "@styled-system/css";
import { Flex, Text } from "rebass";
import emotionStyled from "lib/emotion-styled";

const Container = emotionStyled(Flex)(props =>
  ssCSS({
    borderRadius: 100,
    height: '20px',
    py: 1,
    px: 3,
  })
);

interface IProps {
  variant: string;
  resourceType?: string;
  styles?: any;
}
const Pill: React.FC<IProps> = ({ resourceType, variant, styles, children }) => {
  return (
    <Container
      justifyContent={"center"}
      alignItems={"center"}
      variant={variant}
      sx={styles}
    >
      {children || <Text variant='body'>{resourceType}</Text>}
    </Container>
  );
};

export default Pill;

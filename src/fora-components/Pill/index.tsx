import React from 'react';
import ssCSS from '@styled-system/css';
import { Flex, Text } from 'rebass';
import emotionStyled from 'lib/emotion-styled';

const Container = emotionStyled(Flex)(props =>
  ssCSS({
    borderRadius: 100,
    backgroundColor: props.theme.colors.seaGlass100,
    height: 20,
    py: 2,
    px: 3
  })
);

const Pill = ({ resourceType, variant, css }) => {
  return (
    <Container justifyContent={'center'} alignItems={'center'} css={css}>
      <Text variant={variant}>{resourceType}</Text>
    </Container>
  );
};

export default Pill;

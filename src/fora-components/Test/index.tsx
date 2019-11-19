/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text } from "rebass";
import { Stack } from "@chakra-ui/core";

const Content: React.FC = props => (
  <Flex {...props} sx={{ backgroundColor: "transparent" }} />
);

const Test: React.FC = () => (
  <Content>
    <Text sx={{ variant: "body", color: "seaGlass.400" }}>Wut</Text>

    <Stack
      direction="column"
      spacing={2}
      sx={{ "> :first-of-type": { backgroundColor: "gray.200" } }}
    >
      <Text sx={{ variant: "body", color: "seaGlass.400" }}>Wut</Text>
      <Text sx={{ variant: "body", color: "seaGlass.400" }}>Wut</Text>
      <Text sx={{ variant: "body", color: "seaGlass.400" }}>Wut</Text>
    </Stack>
  </Content>
);

export default Test;

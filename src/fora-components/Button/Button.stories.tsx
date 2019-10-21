import React from "react";
import centered from "@storybook/addon-centered/react";
import { storiesOf, addDecorator } from "@storybook/react";
import { Button, Text, Flex } from "rebass";
import LoadingIcon from "assets/loading";
import css from "@styled-system/css";
import emotionStyled from "lib/emotion-styled";

addDecorator(centered);

const Container = emotionStyled(Flex)(() => css({
  '> :first-child': { mb: 3 },
}));
const ButtonContainer = emotionStyled(Flex)(() => css({ 
  '> :not(:last-child)': { mr: 3 }
}));

storiesOf("Button", module).add("PrimaryButton", () => (
  <Container flexDirection="column">
    <Text variant="h4">Buttons</Text>
    <ButtonContainer flexDirection="row">
      <div>
        <Text variant="h5">Primary</Text>
        <Button width={"100%"} variant="primary">
          Accept
        </Button>
      </div>

      <div>
        <Text variant="h5">Primary Disabled</Text>
        <Button disabled={true} width={"100%"} variant="primary">
          Accept
        </Button>
      </div>

      <div>
        <Text variant="h5">Loading</Text>
        <Button width={"100%"} variant="primary">
          <LoadingIcon />
        </Button>
      </div>
    </ButtonContainer>
  </Container>
));

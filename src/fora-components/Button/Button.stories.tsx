import React from "react";
import centered from "@storybook/addon-centered/react";
import { storiesOf, addDecorator } from "@storybook/react";
import { Button, Text, Flex, Link } from "rebass";
import LoadingIcon from "assets/loading";
import css from "@styled-system/css";
import emotionStyled from "lib/emotion-styled";

addDecorator(centered);

const Container = emotionStyled(Flex)(() =>
  css({
    "> :first-child": { mb: 3 }
  })
);
const ButtonContainer = emotionStyled(Flex)(() =>
  css({
    "> :not(:last-child)": { mr: 3 }
  })
);

storiesOf("Button", module)
  .add("PrimaryButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Primary Buttons</Text>
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
  ))
  .add("PrimaryLinkButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Primary Link Buttons</Text>
      <ButtonContainer flexDirection="row">
        <div>
          <Text variant="h5">Primary Link component</Text>
          <Link width={"100%"} variant="link">
            Cancel
          </Link>
        </div>

        <div>
          <Text variant="h5">Disabled Primary Link component</Text>
          <Link disabled={true} width={"100%"} variant="link">
            Cancel
          </Link>
        </div>

      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Secondary Buttons</Text>
      <ButtonContainer flexDirection="row">
        <div>
          <Text variant="h5">Secondary</Text>
          <Button width={"100%"} variant="secondary">
            Explore
          </Button>
        </div>

        <div>
          <Text variant="h5">Secondary Disabled</Text>
          <Button disabled={true} width={"100%"} variant="secondary">
            Explore
          </Button>
        </div>

        <div>
          <Text variant="h5">Secondary Loading</Text>
          <Button width={"100%"} variant="secondary">
            <LoadingIcon variant="secondary" />
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryLinkButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Secondary Link Buttons</Text>
      <ButtonContainer flexDirection="row">

        <div>
          <Text variant="h5">Secondary Link component</Text>
          <Link width={"100%"} variant="secondaryLink">
            Cancel
          </Link>
        </div>

        <div>
          <Text variant="h5">Disabled Secondary Link component</Text>
          <Link disabled={true} width={"100%"} variant="secondaryLink">
            Cancel
          </Link>
        </div>

      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryAffirmativeButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Secondary Affirmative Buttons</Text>
      <ButtonContainer flexDirection="row">

        <div>
          <Text variant="h5">Secondary Affirmative Button component</Text>
          <Button width={"100%"} variant="secondaryAffirmative">
            Activate
          </Button>
        </div>

        <div>
          <Text variant="h5">Disabled Secondary Affirmative Button component</Text>
          <Button disabled={true} width={"100%"} variant="secondaryAffirmative">
            Activate
          </Button>
        </div>

      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryDestructiveButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Secondary Destructive Buttons</Text>
      <ButtonContainer flexDirection="row">

        <div>
          <Text variant="h5">Secondary Destructive Button component</Text>
          <Button width={"100%"} variant="secondaryDestructive">
          Delete
          </Button>
        </div>

        <div>
          <Text variant="h5">Disabled Secondary Destructive Button component</Text>
          <Button disabled={true} width={"100%"} variant="secondaryDestructive">
            Delete
          </Button>
        </div>

      </ButtonContainer>
    </Container>
  ))
  .add("SpecialButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Special Buttons</Text>
      <ButtonContainer flexDirection="row">

        <div>
          <Text variant="h5">Special Button component</Text>
          <Button width={"100%"} variant="special">
          Create Bounty
          </Button>
        </div>

        <div>
          <Text variant="h5">Disabled Special Button component</Text>
          <Button disabled={true} width={"100%"} variant="special">
            Create Bounty
          </Button>
        </div>

        <div>
          <Text variant="h5">Loading Special Button component</Text>
          <Button width={"100%"} variant="special">
            <LoadingIcon variant="special"></LoadingIcon>
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
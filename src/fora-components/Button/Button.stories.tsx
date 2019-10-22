import React from "react";
import centered from "@storybook/addon-centered/react";
import { storiesOf, addDecorator } from "@storybook/react";
import { Button, Text, Flex, Link } from "rebass";
import LoadingIcon from "assets/loading";
import css from "@styled-system/css";
import emotionStyled from "lib/emotion-styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faReply } from "@fortawesome/pro-regular-svg-icons";

addDecorator(centered);

const Container = emotionStyled(Flex)(() =>
  css({
    "> :first-of-type": { mb: 3 }
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

        <div>
          <Text variant="h5">Primary with Icon</Text>
          <Button width={"100%"} variant="primaryIcon">
            <FontAwesomeIcon icon={faPencil} />
            <Text>Edit bounty</Text>
          </Button>
        </div>

        <div>
          <Text variant="h5">Primary with icon only</Text>
          <Button variant="primaryIconOnly">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </div>

        <div>
          <Text variant="h5">Primary small</Text>
          <Button variant="primarySmall">Join</Button>
        </div>

        <div>
          <Text variant="h5">Disabled Primary small</Text>
          <Button disabled={true} variant="primarySmall">
            Join
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

        <div>
          <Text variant="h5">Primary Link Icon component</Text>
          <Link width={"100%"} variant="linkIcon">
            <FontAwesomeIcon icon={faReply} />
            <Text>Reply</Text>
          </Link>
        </div>

        <div>
          <Text variant="h5">Disabled Primary Link Icon component</Text>
          <Link disabled={true} width={"100%"} variant="linkIcon">
            <FontAwesomeIcon icon={faReply} />
            <Text>Reply</Text>
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

        <div>
          <Text variant="h5">Secondary with icon</Text>
          <Button variant="secondaryIcon">
            <FontAwesomeIcon icon={faPencil} />
            <Text>Explore</Text>
          </Button>
        </div>

        <div>
          <Text variant="h5">Secondary icon only</Text>
          <Button variant="secondaryIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
        </div>

        <div>
          <Text variant="h5">Secondary small</Text>
          <Button variant="secondarySmall">Explore</Button>
        </div>

        <div>
          <Text variant="h5">Disabled Secondary small</Text>
          <Button disabled={true} variant="secondarySmall">
            Explore
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

        <div>
          <Text variant="h5">Secondary Affirimative with icon</Text>
          <Button variant="secondaryAffirmativeIcon">
            <FontAwesomeIcon icon={faPencil} />
            <Text>Explore</Text>
          </Button>
        </div>

        <div>
          <Text variant="h5">Secondary Affirmative icon only</Text>
          <Button variant="secondaryAffirmativeIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
        </div>

        <div>
          <Text variant="h5">Secondary Affirmative small</Text>
          <Button variant="secondaryAffirmativeSmall">Activate</Button>
        </div>

        <div>
          <Text variant="h5">Disabled Secondary Affirmative small</Text>
          <Button disabled={true} variant="secondaryAffirmativeSmall">
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

        <div>
          <Text variant="h5">Secondary Destructive with icon</Text>
          <Button variant="secondaryDestructiveIcon">
            <FontAwesomeIcon icon={faPencil} />
            <Text>Explore</Text>
          </Button>
        </div>

        <div>
          <Text variant="h5">Secondary Destructive icon only</Text>
          <Button variant="secondaryDestructiveIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
        </div>


        <div>
          <Text variant="h5">Secondary Destructive small</Text>
          <Button variant="secondaryDestructiveSmall">Deactivate</Button>
        </div>

        <div>
          <Text variant="h5">Disabled Secondary Destructive small</Text>
          <Button disabled={true} variant="secondaryDestructiveSmall">
            Deactivate
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

        <div>
          <Text variant="h5">Special Button with icon</Text>
          <Button width={"100%"} variant="specialIcon">
            <FontAwesomeIcon icon={faPlus} />
            <Text>Create new bounty</Text>
          </Button>
        </div>

        <div>
          <Text variant="h5">Special Button with icon only</Text>
          <Button variant="specialIconOnly">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Text variant="h5">Special small</Text>
          <Button variant="specialSmall">Create</Button>
        </div>

        <div>
          <Text variant="h5">Disabled Special small</Text>
          <Button disabled={true} variant="specialSmall">
            Create
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("DestructiveButton", () => (
    <Container flexDirection="column">
      <Text variant="h4">Destructive Buttons</Text>
      <ButtonContainer flexDirection="row">
        <div>
          <Text variant="h5">Destructive Button component</Text>
          <Button width={"100%"} variant="destructive">
            Delete
          </Button>
        </div>

        <div>
          <Text variant="h5">Disabled Destructive Button component</Text>
          <Button disabled={true} width={"100%"} variant="destructive">
            Delete
          </Button>
        </div>

        <div>
          <Text variant="h5">Loading Destructive Button component</Text>
          <Button width={"100%"} variant="destructive">
            <LoadingIcon variant="destructive"></LoadingIcon>
          </Button>
        </div>

        <div>
          <Text variant="h5">Destructive Button with icon</Text>
          <Button width={"100%"} variant="destructiveIcon">
            <FontAwesomeIcon icon={faPlus} />
            <Text>Create new bounty</Text>
          </Button>
        </div>

        <div>
          <Text variant="h5">Destructive Button with icon only</Text>
          <Button variant="destructiveIconOnly">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Text variant="h5">Destructive small</Text>
          <Button variant="destructiveSmall">Leave</Button>
        </div>

        <div>
          <Text variant="h5">Disabled Destructive small</Text>
          <Button disabled={true} variant="destructiveSmall">
            Leave
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("DestructiveLink", () => (
    <Container flexDirection="column">
      <Text variant="h4">Destructive Links</Text>
      <ButtonContainer flexDirection="row">
        <div>
          <Text variant="h5">Destructive Link component</Text>
          <Link width={"100%"} variant="destructiveLink">
            Delete
          </Link>
        </div>

        <div>
          <Text variant="h5">Disabled Destructive Link component</Text>
          <Link disabled={true} width={"100%"} variant="destructiveLink">
            Delete
          </Link>
        </div>
      </ButtonContainer>
    </Container>
  ));

import React from "react";
import centered from "@storybook/addon-centered/react";
import { storiesOf, addDecorator } from "@storybook/react";
import { Text, Flex, Link } from "rebass";
import Button from ".";
import LoadingIcon from "assets/loading";
import css from "@styled-system/css";
import emotionStyled from "lib/emotion-styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faReply } from "@fortawesome/pro-regular-svg-icons";
import { colors } from "theme/colors";

addDecorator(centered);

const Container = emotionStyled(Flex)(() =>
  css({
    "> :first-of-type": { mb: 3 }
  })
);

const Label = emotionStyled(Text)(() =>
  css({
    mb: 2,
    color: colors.gray["400"]
  })
);

const ButtonContainer = emotionStyled(Flex)(() =>
  css({
    mt: 5,
    "> :not(:last-child)": { mb: 5 }
  })
);

storiesOf("Button", module)
  .add("PrimaryButton", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Primary Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="primary" label="Button" />
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="primary" label="Button" />
        </div>

        <div>
          <Label variant="label">Loading</Label>
          <Button variant="primary">
            <LoadingIcon />
          </Button>
        </div>

        <div>
          <Label variant="label">hasIcon</Label>
          <Button variant="primary" label="Button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">iconOnly</Label>
          <Button variant="primary">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </div>

        <div>
          <Label variant="label">Small</Label>
          <Button variant="primary" size="small" label="Button" />
        </div>

        <div>
          <Label variant="label">Small/Disabled</Label>
          <Button disabled variant="primary" size="small" label="Button" />
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("PrimaryLinkButton", () => (
    <Container flexDirection="column">
      <Label variant="h4">Primary Link Buttons</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Primary Link component</Label>
          <Link variant="link">Cancel</Link>
        </div>

        <div>
          <Label variant="label">Disabled Primary Link component</Label>
          <Link disabled variant="link">
            Cancel
          </Link>
        </div>

        <div>
          <Label variant="label">Primary Link Icon component</Label>
          <Link variant="linkIcon">
            <FontAwesomeIcon icon={faReply} />
            <Label>Reply</Label>
          </Link>
        </div>

        <div>
          <Label variant="label">Disabled Primary Link Icon component</Label>
          <Link disabled variant="linkIcon">
            <FontAwesomeIcon icon={faReply} />
            <Label>Reply</Label>
          </Link>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryButton", () => (
    <Container flexDirection="column">
      <Label variant="h4">Secondary Buttons</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Secondary</Label>
          <Button variant="secondary">Explore</Button>
        </div>

        <div>
          <Label variant="label">Secondary Disabled</Label>
          <Button disabled variant="secondary">
            Explore
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary Loading</Label>
          <Button variant="secondary">
            <LoadingIcon variant="secondary" />
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary with icon</Label>
          <Button variant="secondaryIcon">
            <FontAwesomeIcon icon={faPencil} />
            <Label>Explore</Label>
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary icon only</Label>
          <Button variant="secondaryIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary small</Label>
          <Button variant="secondarySmall">Explore</Button>
        </div>

        <div>
          <Label variant="label">Secondary small icon only</Label>
          <Button variant="secondarySmallIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
        </div>

        <div>
          <Label variant="label">Disabled Secondary small</Label>
          <Button disabled variant="secondarySmall">
            Explore
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryLinkButton", () => (
    <Container flexDirection="column">
      <Label variant="h4">Secondary Link Buttons</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Secondary Link component</Label>
          <Link variant="secondaryLink">Cancel</Link>
        </div>

        <div>
          <Label variant="label">Disabled Secondary Link component</Label>
          <Link disabled variant="secondaryLink">
            Cancel
          </Link>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryAffirmativeButton", () => (
    <Container flexDirection="column">
      <Label variant="h4">Secondary Affirmative Buttons</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Secondary Affirmative Button component</Label>
          <Button variant="secondaryAffirmative">Activate</Button>
        </div>

        <div>
          <Label variant="label">
            Disabled Secondary Affirmative Button component
          </Label>
          <Button disabled variant="secondaryAffirmative">
            Activate
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary Affirimative with icon</Label>
          <Button variant="secondaryAffirmativeIcon">
            <FontAwesomeIcon icon={faPencil} />
            <Label>Explore</Label>
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary Affirmative icon only</Label>
          <Button variant="secondaryAffirmativeIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary Affirmative small</Label>
          <Button variant="secondaryAffirmativeSmall">Activate</Button>
        </div>

        <div>
          <Label variant="label">Disabled Secondary Affirmative small</Label>
          <Button disabled variant="secondaryAffirmativeSmall">
            Activate
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("SecondaryDestructiveButton", () => (
    <Container flexDirection="column">
      <Label variant="h4">Secondary Destructive Buttons</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Secondary Destructive Button component</Label>
          <Button variant="secondaryDestructive">Delete</Button>
        </div>

        <div>
          <Label variant="label">
            Disabled Secondary Destructive Button component
          </Label>
          <Button disabled variant="secondaryDestructive">
            Delete
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary Destructive with icon</Label>
          <Button variant="secondaryDestructiveIcon">
            <FontAwesomeIcon icon={faPencil} />
            <Label>Explore</Label>
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary Destructive icon only</Label>
          <Button variant="secondaryDestructiveIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
        </div>

        <div>
          <Label variant="label">Secondary Destructive small</Label>
          <Button variant="secondaryDestructiveSmall">Deactivate</Button>
        </div>

        <div>
          <Label variant="label">Disabled Secondary Destructive small</Label>
          <Button disabled variant="secondaryDestructiveSmall">
            Deactivate
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("SpecialButton", () => (
    <Container flexDirection="column">
      <Label variant="h4">Special Buttons</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Special Button component</Label>
          <Button variant="special">Create Bounty</Button>
        </div>

        <div>
          <Label variant="label">Disabled Special Button component</Label>
          <Button disabled variant="special">
            Create Bounty
          </Button>
        </div>

        <div>
          <Label variant="label">Loading Special Button component</Label>
          <Button variant="special">
            <LoadingIcon variant="special"></LoadingIcon>
          </Button>
        </div>

        <div>
          <Label variant="label">Special Button with icon</Label>
          <Button variant="specialIcon">
            <FontAwesomeIcon icon={faPlus} />
            <Label>Create new bounty</Label>
          </Button>
        </div>

        <div>
          <Label variant="label">Special Button with icon only</Label>
          <Button variant="specialIconOnly">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">Special small</Label>
          <Button variant="specialSmall">Create</Button>
        </div>

        <div>
          <Label variant="label">Disabled Special small</Label>
          <Button disabled variant="specialSmall">
            Create
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("DestructiveButton", () => (
    <Container flexDirection="column">
      <Label variant="h4">Destructive Buttons</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Destructive Button component</Label>
          <Button variant="destructive">Delete</Button>
        </div>

        <div>
          <Label variant="label">Disabled Destructive Button component</Label>
          <Button disabled variant="destructive">
            Delete
          </Button>
        </div>

        <div>
          <Label variant="label">Loading Destructive Button component</Label>
          <Button variant="destructive">
            <LoadingIcon variant="destructive"></LoadingIcon>
          </Button>
        </div>

        <div>
          <Label variant="label">Destructive Button with icon</Label>
          <Button variant="destructiveIcon">
            <FontAwesomeIcon icon={faPlus} />
            <Label>Create new bounty</Label>
          </Button>
        </div>

        <div>
          <Label variant="label">Destructive Button with icon only</Label>
          <Button variant="destructiveIconOnly">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">Destructive small</Label>
          <Button variant="destructiveSmall">Leave</Button>
        </div>

        <div>
          <Label variant="label">Disabled Destructive small</Label>
          <Button disabled variant="destructiveSmall">
            Leave
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))
  .add("DestructiveLink", () => (
    <Container flexDirection="column">
      <Label variant="h4">Destructive Links</Label>
      <ButtonContainer flexDirection="row">
        <div>
          <Label variant="label">Destructive Link component</Label>
          <Link variant="destructiveLink">Delete</Link>
        </div>

        <div>
          <Label variant="label">Disabled Destructive Link component</Label>
          <Link disabled variant="destructiveLink">
            Delete
          </Link>
        </div>
      </ButtonContainer>
    </Container>
  ));

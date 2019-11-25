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
    color: colors.brandGray["400"]
  })
);

const ButtonContainer = emotionStyled(Flex)(() =>
  css({
    mt: 5,
    "> :not(:last-child)": { mb: 5 }
  })
);

storiesOf("Button", module)
  .add("Primary", () => (
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
          <Button variant="primary" size="small" label="Join" />
        </div>

        <div>
          <Label variant="label">Small/Disabled</Label>
          <Button disabled variant="primary" size="small" label="Join" />
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Secondary", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Secondary Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="secondary" label="Button" />
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="secondary" label="Button" />
        </div>

        <div>
          <Label variant="label">Loading</Label>
          <Button variant="secondary">
            <LoadingIcon variant="secondary" />
          </Button>
        </div>

        <div>
          <Label variant="label">hasIcon</Label>
          <Button variant="secondary" label="Button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">iconOnly</Label>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </div>

        <div>
          <Label variant="label">Small</Label>
          <Button variant="secondary" size="small" label="Button" />
        </div>

        <div>
          <Label variant="label">Small/Disabled</Label>
          <Button disabled variant="secondary" size="small" label="Button" />
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Secondary Affirmative", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Secondary Affirmative Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="secondary.affirmative" label="Button" />
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="secondary.affirmative" label="Button" />
        </div>

        <div>
          <Label variant="label">Loading</Label>
          <Button variant="secondary.affirmative">
            <LoadingIcon variant="secondary" />
          </Button>
        </div>

        <div>
          <Label variant="label">hasIcon</Label>
          <Button variant="secondary.affirmative" label="Button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">iconOnly</Label>
          <Button variant="secondary.affirmative">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </div>

        <div>
          <Label variant="label">Small</Label>
          <Button variant="secondary.affirmative" size="small" label="Button" />
        </div>

        <div>
          <Label variant="label">Small/Disabled</Label>
          <Button
            disabled
            variant="secondary.affirmative"
            size="small"
            label="Button"
          />
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Secondary Destructive", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Secondary Destructive Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="secondary.destructive" label="Button" />
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="secondary.destructive" label="Button" />
        </div>

        <div>
          <Label variant="label">Loading</Label>
          <Button variant="secondary.destructive">
            <LoadingIcon variant="secondary" />
          </Button>
        </div>

        <div>
          <Label variant="label">hasIcon</Label>
          <Button variant="secondary.destructive" label="Button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">iconOnly</Label>
          <Button variant="secondary.destructive">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </div>

        <div>
          <Label variant="label">Small</Label>
          <Button variant="secondary.destructive" size="small" label="Button" />
        </div>

        <div>
          <Label variant="label">Small/Disabled</Label>
          <Button
            disabled
            variant="secondary.destructive"
            size="small"
            label="Button"
          />
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Tertiary", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Tertiary Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="tertiary" label="Button" />
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="tertiary" label="Button" />
        </div>

        <div>
          <Label variant="label">Loading</Label>
          <Button variant="tertiary">
            <LoadingIcon />
          </Button>
        </div>

        <div>
          <Label variant="label">hasIcon</Label>
          <Button variant="tertiary" label="Button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">iconOnly</Label>
          <Button variant="tertiary">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </div>

        <div>
          <Label variant="label">Small</Label>
          <Button variant="tertiary" size="small" label="Button" />
        </div>

        <div>
          <Label variant="label">Small/Disabled</Label>
          <Button disabled variant="tertiary" size="small" label="Button" />
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Destructive", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Destructive Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="destructive" label="Button" />
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="destructive" label="Button" />
        </div>

        <div>
          <Label variant="label">Loading</Label>
          <Button variant="destructive">
            <LoadingIcon variant="destructive" />
          </Button>
        </div>

        <div>
          <Label variant="label">hasIcon</Label>
          <Button variant="destructive" label="Button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div>
          <Label variant="label">iconOnly</Label>
          <Button variant="destructive">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </div>

        <div>
          <Label variant="label">Small</Label>
          <Button variant="destructive" size="small" label="Button" />
        </div>

        <div>
          <Label variant="label">Small/Disabled</Label>
          <Button disabled variant="destructive" size="small" label="Button" />
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Secondary Link Button", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Secondary Link Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Secondary Link component</Label>
          <Button variant="link">Cancel</Button>
        </div>

        <div>
          <Label variant="label">Disabled Secondary Link component</Label>
          <Button disabled variant="link">
            Cancel
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Affirmative Link Button", () => (
    <Container flexDirection="column">
      <Text variant="headingSans">Primary Link Buttons</Text>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="link.affirmative">Cancel</Button>
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="link.affirmative" label="Button" />
        </div>

        <div>
          <Label variant="label">hasIcon</Label>
          <Button variant="link.affirmative" label="Reply">
            <FontAwesomeIcon icon={faReply} />
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  ))

  .add("Destructive Link Button", () => (
    <Container flexDirection="column">
      <Label variant="h4">Destructive Links</Label>
      <ButtonContainer flexDirection="column">
        <div>
          <Label variant="label">Default</Label>
          <Button variant="link.destructive" label="Delete" />
        </div>

        <div>
          <Label variant="label">Disabled</Label>
          <Button disabled variant="link.destructive" label="Delete" />
        </div>
      </ButtonContainer>
    </Container>
  ));

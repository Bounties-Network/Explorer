import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import PreviewCard from "./index";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";
import { Flex } from "rebass";
import moment from "moment";

const tags = [
  {
    tag: "React",
    href: "https://www.google.co.uk"
  },
  {
    tag: "Javascript",
    href: "https://www.google.co.uk"
  },
  {
    tag: "CSS",
    href: "https://www.google.co.uk"
  }
];

const Container = emotionStyled(Flex)(() =>
  css({
    minWidth: "70vw"
  })
);

addDecorator(centered);

storiesOf("PreviewCard", module)
  .add("Mi Fora", () => (
  <Container>
    <PreviewCard
      ethInUSD={435}
      ethAmount={0.56}
      submissionCount={6}
      expirationTimestamp={moment().add('5', 'days')}
      href={"https://www.google.co.uk"}
      title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
      status={"active"}
    />
  </Container>
  ))
  .add("Expired", () => (
    <Container>
      <PreviewCard
        ethInUSD={435}
        ethAmount={0.56}
        submissionCount={6}
        expirationTimestamp={moment().subtract('5', 'days')}
        href={"https://www.google.co.uk"}
        title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
        status={"expired"}
      />
    </Container>
  ));
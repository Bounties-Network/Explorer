import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import ExplorerCard from ".";
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

storiesOf("ExplorerCard", module)
  .add("Mi Fora", () => (
  <Container>
    <ExplorerCard
      token={'ETH'}
      tokenInUSD={26}
      tokenValue={0.05}
      submissionCount={6}
      community={{
        name: "frontendDev",
        href: "https://www.google.co.uk"
      }}
      avatar={{
        resourceType: 'user',
        name: "firstName LastName",
        screenName: "screenName",
        variant: "small",
        onDark: false
      }}
      deadline={moment().add('5', 'days')}
      difficulty={'Beginner'}
      tags={tags}
      href={"https://www.google.co.uk"}
      title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
      status={"active"}
    />
  </Container>
  ))
  .add("Expired", () => (
    <Container>
      <ExplorerCard
        token={'ETH'}
        tokenInUSD={26}
        tokenValue={0.05}
        submissionCount={6}
        community={{
          name: "frontendDev",
          href: "https://www.google.co.uk"
        }}
        avatar={{
          resourceType: 'user',
          name: "firstName LastName",
          screenName: "screenName",
          variant: "small",
          onDark: false
        }}
        deadline={moment().subtract('5', 'days')}
        difficulty={'Beginner'}
        tags={tags}
        href={"https://www.google.co.uk"}
        title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
        status={"expired"}
      />
    </Container>
  ));
  
  ;

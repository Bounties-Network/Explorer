import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import PreviewCard from "./index";
import moment from 'moment'

addDecorator(centered);

storiesOf("PreviewCard", module)
  .add("Mi Fora", () => (
    <PreviewCard
      ethInUSD={435}
      ethAmount={0.56}
      submissionCount={6}
      expirationTimestamp={moment().add('5', 'days')}
      href={"https://www.google.co.uk"}
      title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
      status={"active"}
    />
  ))
  .add("Expired", () => (
      <PreviewCard
        ethInUSD={435}
        ethAmount={0.56}
        submissionCount={6}
        expirationTimestamp={moment().subtract('5', 'days')}
        href={"https://www.google.co.uk"}
        title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
        status={"expired"}
      />
  ))
  .add("Dead", () => (
      <PreviewCard
        ethInUSD={435}
        ethAmount={0.56}
        submissionCount={6}
        expirationTimestamp={moment().subtract('5', 'days')}
        href={"https://www.google.co.uk"}
        title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
        status={"dead"}
        community={{ href: 'https://www.google.co.uk', name: 'frontend' }}
      />
  ))
  .add("Completed", () => (
      <PreviewCard
        ethInUSD={435}
        ethAmount={0.56}
        submissionCount={6}
        expirationTimestamp={moment().subtract('5', 'days')}
        href={"https://www.google.co.uk"}
        title={"🗺 ️BOOST Bounty - Mentorship Reward 🗺️"}
        status={"completed"}
        community={{ href: 'https://www.google.co.uk', name: 'socialImpact' }}
      />
  ))
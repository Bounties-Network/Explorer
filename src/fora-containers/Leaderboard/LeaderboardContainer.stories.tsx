import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import LeaderboardContainer from ".";

addDecorator(centered);

storiesOf("fora-app/LeaderboardContainer", module)
  .add("Feed", () => (
    <LeaderboardContainer />
  ))
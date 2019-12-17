/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf } from "@storybook/react";
import UserProfileContainer from ".";

storiesOf("fora-app/UserProfileContainer", module)
  .add("Mi Fora", () => {
    return (
        <UserProfileContainer />
    );
  })
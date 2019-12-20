/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf } from "@storybook/react";
import UserProfileContainer from ".";

storiesOf("fora-app/UserProfileContainer", module)
  .add("Corwin", () => {
    return (
        <UserProfileContainer address={'0xd8d74e3f4707784dd9de7e631026d3be9ac49ef2'} />
    );
  })
  .add("Simona", () => {
    return (
        <UserProfileContainer address={'0x54becc7560a7be76d72ed76a1f5fee6c5a2a7ab6'} />
    );
  })
  .add("Eric", () =>     (
    <UserProfileContainer address={'0x1322dd1fa43891086c90424c1a919f008e390bd2'} />
))
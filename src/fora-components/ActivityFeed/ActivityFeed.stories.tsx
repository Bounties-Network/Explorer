/** @jsx jsx */
import { jsx } from "theme-ui";
import { Box } from "@theme-ui/components";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import ActivityFeed from ".";

addDecorator(centered);

storiesOf("ActivityFeed", module).add("v0", () => (
  <Box sx={{ width: "570px" }}>
    <ActivityFeed />
  </Box>
));

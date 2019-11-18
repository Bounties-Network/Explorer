/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import YourBounties from ".";
import { mockYourBountiesDraftData, mockYourBountiesActiveData } from "./mock-your-bounties-data";

addDecorator(centered);

storiesOf("YourBounties", module).add("Mi Fora", () => {
  return (
    <div sx={{ minWidth: "70vw" }}>
      <YourBounties
        drafts={mockYourBountiesDraftData}
        active={mockYourBountiesActiveData}
        totalActiveCount={5}
        totalDraftsCount={4}
        activeNotificationCount={4}
        draftsNotificationCount={4}
      />
    </div>
  );
});

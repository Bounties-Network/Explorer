/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import YourSubmissions from ".";
import { mockYourSubmissionsReceivedData, mockYourSubmissionsSubmittedData } from "./mock-your-submissions-data";

addDecorator(centered);

storiesOf("YourSubmissions", module).add("Mi Fora", () => {
  return (
    <div sx={{ minWidth: "70vw" }}>
      <YourSubmissions
        received={mockYourSubmissionsReceivedData}
        submitted={mockYourSubmissionsSubmittedData}
        totalReceivedCount={5}
        totalSubmittedCount={5}
        receivedNotificationCount={4}
        submittedNotificationCount={4}
      />
    </div>
  );
});

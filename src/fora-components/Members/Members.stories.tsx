import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Members from "./View";
import { mockMembersData } from "./mock-members-data";

addDecorator(centered);

storiesOf("Members", module).add("Mi Fora", () => (
  <Members loadMore={() => {}} data={mockMembersData} />
));

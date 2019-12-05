/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { storiesOf } from "@storybook/react";
import ExplorerDropdown from ".";

storiesOf("fora-app/ExplorerDropdownContainer", module)
  .add("Mi Fora", () => {
    return (
      <div sx={{ width: "60vw" }}>
        <ExplorerDropdown
          placeholder="Placeholder.."
        />
      </div>
    );
  })
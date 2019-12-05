/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf } from "@storybook/react";
import ExplorerDropdownContainer from ".";

storiesOf("fora-app/ExplorerDropdownContainer", module)
  .add("Mi Fora", () => {
    return (
      <div sx={{ width: "60vw" }}>
        <ExplorerDropdownContainer
          placeholder="Placeholder.."
        />
      </div>
    );
  })
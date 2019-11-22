/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Tooltip from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/pro-regular-svg-icons";

addDecorator(centered);

interface IContentProps {}
const Content: React.FC<IContentProps> = () => (
  <div>
    This is some helper text that you find inside of a tooltip. It might attempt
    to explain something to a user in unique instances where something may be
    unclear, or needs to be defined beyond how it is displayed in the UI.
  </div>
);

storiesOf("Tooltip", module).add("Mi Fora", () => (
  <Tooltip content={<Content />}>
    <div sx={{ cursor: "pointer" }}>
      <FontAwesomeIcon
        sx={{ color: "seaGlass.300" }}
        icon={faQuestionCircle}
      ></FontAwesomeIcon>
    </div>
  </Tooltip>
));

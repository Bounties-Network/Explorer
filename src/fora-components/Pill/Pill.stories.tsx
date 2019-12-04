import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";
import Pill from "./index";

addDecorator(centered);
addDecorator(withKnobs);

// Storybook Knobs Options
// Variant
const variantLabel = "variant";
const variantOptions = {
  affirmative: "status.affirmative",
  negative: "status.negative",
  neutral: "status.neutral",
  pending: "status.pending",
  draft: "status.draft",
  tag: "tag.explorer",
  "networkIndicator.rinkeby": "networkIndicator.rinkeby",
  "networkIndicator.mainnet": "networkIndicator.mainnet",
  notificationCounter: "notificationCounter",
  "tabCounter.deselected": "tabCounter.deselected",
  "tabCounter.selected": "tabCounter.selected"
};
const variantDefaultValue = "status.affirmative";

// Size
const sizeLabel = "size";
const sizeOptions = {
  small: "small",
  large: "large"
};
const sizeDefaultValue = "small";

// Shape
const shapeLabel = "shape";
const shapeOptions = {
  rounded: "rounded",
  square: "square"
};
const shapeDefaultValue = "rounded";

storiesOf("Pill", module).add("Pill", () => (
  <Pill
    variant={select(variantLabel, variantOptions, variantDefaultValue)}
    size={radios(sizeLabel, sizeOptions, sizeDefaultValue)}
    shape={radios(shapeLabel, shapeOptions, shapeDefaultValue)}
  >
    {text("{children}", "Active")}
  </Pill>
));

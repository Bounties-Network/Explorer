import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import SegmentedControl from ".";

addDecorator(centered);

storiesOf("SegmentedControl", module).add("Mi Fora", () => (
  <SegmentedControl
    firstOption={"First"}
    firstOptionHandleClick={() => console.log("firstOptionHandleClick")}
    secondOption={"Second"}
    secondOptionHandleClick={() => console.log("secondOptionHandleClick")}
  />
));

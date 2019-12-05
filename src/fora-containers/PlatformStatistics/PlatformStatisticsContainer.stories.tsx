import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import PlatformStatisticsContainer from '.'

addDecorator(centered);

storiesOf("fora-app/PlatformStatisticsContainer", module)
  .add("Platform", () => (
    <PlatformStatisticsContainer resourceType={'platform'} />
  )
)
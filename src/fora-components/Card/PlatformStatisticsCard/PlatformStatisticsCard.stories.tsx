import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import PlatformStatisticsCard from ".";

addDecorator(centered);

storiesOf("PlatformStatisticsCard", module)
  .add("Platform", () => (
    <PlatformStatisticsCard
      resourceType={"platform"}
      activePlatformBounties={999}
      platformBountiesIssued={9999}
      totalBountyIssuedValueInUSD={9999999}
    />
  ))
  .add("Communities", () => (
    <PlatformStatisticsCard
      resourceType={"communities"}
      activePlatformBounties={35}
      platformBountiesIssued={235}
      totalBountyIssuedValueInUSD={3456}
    />
  ));

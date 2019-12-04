import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import BountyDetailsCard from "./index";

addDecorator(centered);

storiesOf("BountyDetailsCard", module).add("Mi Fora", () => (
  <BountyDetailsCard
    status={"active"}
    ethPayoutValue={0.005}
    usdPayoutValue={26}
    ethRemainingBalanceValue={0.005}
    usdRemainingBalanceValue={26}
  />
));

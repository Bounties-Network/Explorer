import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import IssuerFulfillerStatisticsCard from ".";

addDecorator(centered);

storiesOf("IssuerFulfillerStatisticsCard", module)
  .add("Mi Fora", () => (
    <IssuerFulfillerStatisticsCard
      issuerFulfillmentAcceptanceRate={83}
      fulfillmentAcceptanceRate={81}
      averageRatingGiven={2}
      averageReceivedGivenRating={3}
    />
  ))
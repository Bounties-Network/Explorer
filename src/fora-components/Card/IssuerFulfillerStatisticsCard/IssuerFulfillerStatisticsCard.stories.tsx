import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import IssuerFulfillerStatisticsCard from ".";

addDecorator(centered);

storiesOf("IssuerFulfillerStatisticsCard", module)
  .add("Mi Fora", () => (
    <IssuerFulfillerStatisticsCard
      averageRatingReceived={2}
      acceptanceRate={85}
      averageReceivedGivenRating={3}
    />
  ))
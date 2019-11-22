import React from "react";
import { Text, Card, Button } from "rebass";
import styled from "lib/emotion-styled";
import css from "@styled-system/css";
import numbro from "numbro";

const Container = styled(Card)(() =>
  css({
    flexDirection: "column",
    variant: "card",
    "> *:nth-of-type(2n)": { mb: 4 }
  })
);

interface IProps {
  activePlatformBounties: number;
  platformBountiesIssued: number;
  totalBountyIssuedValueInUSD: number;
  resourceType: "communities" | "platform";
}

const PlatformStatisticsCard: React.FC<IProps> = ({
  platformBountiesIssued,
  activePlatformBounties,
  totalBountyIssuedValueInUSD,
  resourceType
}) => (
  <Container>
    {resourceType === "communities" && (
      <Text variant="label">Active bounties in your communities</Text>
    )}
    {resourceType === "platform" && (
      <Text variant="label">Active platform bounties</Text>
    )}
    <Text color={"seaGlass.200"} variant="numeralMonospaceLarge">
      {activePlatformBounties}
    </Text>
    {resourceType === "communities" && (
      <Text variant="label">Bounties issued in your communities</Text>
    )}
    {resourceType === "platform" && (
      <Text variant="label">Platform bounties issued</Text>
    )}
    <Text variant="numeralMonospaceLarge">{platformBountiesIssued}</Text>
    <Text variant="label">Total value of bounties issued</Text>
    <Text variant="numeralMonospaceLarge">
      {numbro(totalBountyIssuedValueInUSD)
        .formatCurrency({ thousandSeparated: true })
        .replace(/,/gi, ", ")}
    </Text>
    <Button width={"100%"} variant="primary">
      View bounties
    </Button>
  </Container>
);

export default PlatformStatisticsCard;

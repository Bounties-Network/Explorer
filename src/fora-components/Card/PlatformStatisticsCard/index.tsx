import React from "react";
import { Text, Card, Link } from "@theme-ui/components";
import styled from "lib/emotion-styled";
import css from "@styled-system/css";
import numbro from "numbro";
import Button from "fora-components/Button";

const Container = styled(Card)(() =>
  css({
    flexDirection: "column",
    "> *:nth-of-type(odd)": { mb: 1 },
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
      <Text variant="label" color='brandGray.400'>Active bounties in your communities</Text>
    )}
    {resourceType === "platform" && (
      <Text variant="label" color='brandGray.400'>Active platform bounties</Text>
    )}
    <Text color={"brandPrimary.200"} sx={{ fontSize: '2xl' }} variant="numeric">
      {activePlatformBounties}
    </Text>
    {resourceType === "communities" && (
      <Text variant="label" color='brandGray.400'>Bounties issued in your communities</Text>
    )}
    {resourceType === "platform" && (
      <Text variant="label" color='brandGray.400'>Platform bounties issued</Text>
    )}
    <Text  sx={{ fontSize: '2xl' }} variant="numeric">{platformBountiesIssued}</Text>
    <Text color='brandGray.400' variant="label">Total value of bounties issued</Text>
    <Text  sx={{ fontSize: '2xl' }} variant="numeric">
      {numbro(totalBountyIssuedValueInUSD)
        .formatCurrency({ thousandSeparated: true })
        .replace(/,/gi, ", ")}
    </Text>
      <Link href={'/view-bounties'}>
    <Button fullWidth={true} label="View bounties" variant="primary" />
      </Link>
  </Container>
);

export default PlatformStatisticsCard;

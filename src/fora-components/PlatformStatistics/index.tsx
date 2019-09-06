import React from 'react';
import { Text, Card, Button } from 'rebass';
import styled from 'lib/emotion-styled';
import css from '@styled-system/css';

const Container = styled(Card)(() =>
  css({
    flexDirection: 'column',
    variant: 'card',
    '> *:nth-of-type(2n)': { mb: 4 }
  })
);

interface IProps {
  activePlatformBounties: number;
  platformBountiesIssued: number;
  totalBountyIssuedValueInUSD: number;
}

const PlatformStatistics: React.FC<IProps> = ({
  platformBountiesIssued,
  activePlatformBounties,
  totalBountyIssuedValueInUSD
}) => (
  <Container>
    <Text variant="label">Active platform bounties</Text>
    <Text color={'seaGlass200'} variant="numeralMonospaceLarge">
      {activePlatformBounties}
    </Text>
    <Text variant="label">Platform bounties issued</Text>
    <Text variant="numeralMonospaceLarge">{platformBountiesIssued}</Text>
    <Text variant="label">Total value of bounties issued</Text>
    <Text variant="numeralMonospaceLarge">{`$${totalBountyIssuedValueInUSD &&
      totalBountyIssuedValueInUSD.toLocaleString().replace(/,/g, ', ')}`}</Text>
    <Button width={'100%'} variant="primary">
      View bounties
    </Button>
  </Container>
);

export default PlatformStatistics;

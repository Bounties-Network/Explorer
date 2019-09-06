import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import PlatformStatistics from '.';

addDecorator(centered);

storiesOf('PlatformStatistics', module).add('Mi Fora', () => (
  <PlatformStatistics
    activePlatformBounties={999}
    platformBountiesIssued={9999}
    totalBountyIssuedValueInUSD={9999999}
  />
));

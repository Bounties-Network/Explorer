import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Network, Text } from 'components';

storiesOf('Network', module).add('Network', () => (
  <div>
    <Text type="H3">Network</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Mainnet</Text>
      <div style={{ marginTop: '10px' }} />
      <Network network="mainnet" />
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Rinkeby</Text>
      <div style={{ marginTop: '10px' }} />
      <Network network="rinkeby" />
    </div>
  </div>
));

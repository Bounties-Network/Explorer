import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import moment from 'moment';

import { Text } from 'components';
import { LeaderCard } from 'explorer-components';

storiesOf('LeaderCard', module).add('LeaderCard', () => (
  <div>
    <Text type="H3">LeaderCard</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">With border, name and address (default text)</Text>
      <span style={{ marginRight: '10px' }} />
      <LeaderCard
        place="1"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0x60adc0f89a41af237ce73554ede170d733ec14e0"
        value={Number(100).toFixed(2)}
        usd={Number(1202.02).toFixed(0)}
        currency="MATT"
      />
    </div>
  </div>
));

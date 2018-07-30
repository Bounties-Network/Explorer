import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RadioGroup, Text } from 'components';

const data = [
  { value: 'eth', label: 'ETH' },
  { value: 'erc20', label: 'ERC20' }
];

storiesOf('RadioGroup', module).add('RadioGroup', () => (
  <div>
    <RadioGroup
      onChange={action('clicked')}
      options={data}
      label="Currency Type"
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <RadioGroup
      onChange={action('clicked')}
      disabled
      options={data}
      label="Currency Type"
      value="eth"
    />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RadioGroup } from 'components';

const data = ['ETH', 'ERC20'];

storiesOf('RadioGroup', module).add('RadioGroup', () => (
  <div>
    <RadioGroup onChange={action('clicked')} options={data} />
  </div>
));

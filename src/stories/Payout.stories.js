import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Payout } from 'components';

storiesOf('Payout', module).add('Payout', () => (
  <div>
    <Payout USD={26} amount={0.05} symbol={'ETH'} />
  </div>
));

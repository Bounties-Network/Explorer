import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EthContainer } from 'components';

storiesOf('EthContainer', module).add('EthContainer', () => (
  <div>
    <EthContainer eth={0.5} usd={27} />
  </div>
));

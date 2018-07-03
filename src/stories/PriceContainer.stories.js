import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PriceContainer } from 'components';

storiesOf('PriceContainer', module).add('PriceContainer', () => (
  <div>
    <PriceContainer value={0.5} usd={27} />
  </div>
));

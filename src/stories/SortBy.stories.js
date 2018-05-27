import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SortBy } from 'components';

storiesOf('SortBy', module).add('SortBy', () => (
  <div>
    <SortBy onClick={action('clicked')} />
  </div>
));

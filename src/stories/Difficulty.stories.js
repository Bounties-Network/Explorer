import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Difficulty } from 'components';

storiesOf('Difficulty', module).add('Difficulty', () => (
  <div>
    <Difficulty onChange={action('clicked')} />
  </div>
));

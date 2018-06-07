import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { NumberInput } from 'components';

storiesOf('NumberInput', module).add('NumberInput', () => (
  <div>
    <NumberInput />
  </div>
));

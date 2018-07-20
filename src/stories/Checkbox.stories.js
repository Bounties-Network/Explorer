import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Checkbox } from 'components';

storiesOf('Checkbox', module).add('Checkbox', () => (
  <div>
    <Checkbox label="Filter 1" />
    <Checkbox label="Filter 2" />
    <Checkbox label="Filter 3" />
    <Checkbox label="Disabled Checkbox" disabled />
  </div>
));

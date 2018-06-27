import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Checkbox } from 'components';

storiesOf('Checkbox', module).add('Checkbox', () => (
  <div>
    <Checkbox onChange={action('checked')} />
  </div>
));

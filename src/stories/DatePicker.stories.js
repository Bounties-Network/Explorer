import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DatePicker } from 'components';

storiesOf('DatePicker', module).add('DatePicker', () => (
  <div>
    <DatePicker onChange={action('clicked')} />
  </div>
));

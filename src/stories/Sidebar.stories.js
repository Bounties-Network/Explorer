import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Sidebar } from 'components';

storiesOf('Sidebar', module).add('Sidebar', () => (
  <div>
    <Sidebar onClick={console.log} />
  </div>
));

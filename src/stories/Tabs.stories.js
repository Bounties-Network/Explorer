import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tabs } from 'components';

const tabsData = [
  { title: 'Active', tabCount: 3, active: true },
  { title: 'Pending', tabCount: 24 },
  { title: 'Completed', tabCount: 0 }
];

storiesOf('Tabs', module).add('Tabs', () => (
  <div>
    <Tabs tabs={tabsData} onClick={action('clicked')} />
  </div>
));

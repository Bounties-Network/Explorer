import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tabs } from 'components';

const tabsData = [
  { title: 'Active', notificationsColor: 'blue', notificationAmount: 3 },
  { title: 'Pending', notificationsColor: 'yellow', notificationAmount: 4 },
  { title: 'Completed', notificationAmount: 0 }
];

storiesOf('Tabs', module).add('Tabs', () => (
  <div>
    <Tabs tabs={tabsData} />
  </div>
));

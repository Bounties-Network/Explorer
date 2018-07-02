import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tabs } from 'components';

storiesOf('Tabs', module).add('Tabs', () => (
  <div>
    <Tabs onSelect={() => {}}>
      <Tabs.Tab tabColor="blue" eventKey={1}>
        Active
      </Tabs.Tab>
      <Tabs.Tab tabColor="green" eventKey={2}>
        Pending
      </Tabs.Tab>
      <Tabs.Tab eventKey={3}>Completed</Tabs.Tab>
    </Tabs>
  </div>
));

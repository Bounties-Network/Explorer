import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Card } from 'components';

storiesOf('Card', module).add('Card', () => (
  <div>
    <Card title={'this stuff goes here'}>stuff goes here</Card>
  </div>
));

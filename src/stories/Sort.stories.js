import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Sort, Text } from 'components';

storiesOf('Sort', module).add('Sort', () => (
  <div>
    <div style={{ marginTop: '10px' }} />
    <Text type="H4">Active</Text>
    <div style={{ marginTop: '10px' }} />
    <Sort active>Creation Date</Sort>
    <Sort active>Another Sort</Sort>
    <Sort active>Another Sort</Sort>
    <div style={{ marginTop: '10px' }} />
    <Text type="H4">Not Active</Text>
    <div style={{ marginTop: '10px' }} />
    <Sort>Creation Date</Sort>
  </div>
));

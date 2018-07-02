import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Toggle, Text } from 'components';

storiesOf('Toggle', module).add('Toggle', () => (
  <div style={{ width: '315px', marginLeft: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <Toggle />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Label</Text>
    <div style={{ marginTop: '10px' }} />
    <Toggle label="Send Email" />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <Toggle disabled />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TextInput, Text } from 'components';

storiesOf('TextInput', module).add('TextInput', () => (
  <div style={{ width: '315px', marginLeft: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <TextInput label="Username" placeholder="enter name" />
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <TextInput label="Username" placeholder="enter name" disabled />
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Optional</Text>
    <div style={{ marginTop: '10px' }} />
    <TextInput label="Username" placeholder="enter name" optional />
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Error</Text>
    <div style={{ marginTop: '10px' }} />
    <TextInput
      label="Username"
      placeholder="enter name"
      error="required field"
    />
  </div>
));

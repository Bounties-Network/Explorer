import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { NumberInput, Text } from 'components';

storiesOf('NumberInput', module).add('NumberInput', () => (
  <div style={{ margin: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Regular</Text>
    <div style={{ marginTop: '10px' }} />
    <NumberInput />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <NumberInput disabled />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Label</Text>
    <div style={{ marginTop: '10px' }} />
    <NumberInput label="Revisions" />
  </div>
));

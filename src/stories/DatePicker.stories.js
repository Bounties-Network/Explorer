import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DatePicker, Text } from 'components';

storiesOf('DatePicker', module).add('DatePicker', () => (
  <div>
    <div style={{ marginTop: '10px' }} />
    <DatePicker showTimeSelect />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <DatePicker showTimeSelect disabled />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">No Timeframe</Text>
    <div style={{ marginTop: '10px' }} />
    <DatePicker />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Label</Text>
    <div style={{ marginTop: '10px' }} />
    <DatePicker showTimeSelect label="Filter 1" />
  </div>
));

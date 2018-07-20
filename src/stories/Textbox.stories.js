import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Textbox, Text } from 'components';

storiesOf('Textbox', module).add('Textbox', () => (
  <div style={{ marginLeft: '10px' }}>
    <div style={{ marginTop: '20px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox label="Description" placeholder="Enter Description" />
    </div>
    <div style={{ marginTop: '10px' }} />
    <div style={{ marginTop: '20px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox label="Disabled" placeholder="Enter Description" disabled />
    </div>
    <div style={{ marginTop: '10px' }} />
    <div style={{ marginTop: '20px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox
        label="Optional field"
        placeholder="Enter Description"
        optional
      />
    </div>
    <div style={{ marginTop: '10px' }} />
    <div style={{ marginTop: '20px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox
        label="Error"
        placeholder="Enter Description"
        error="description required"
      />
    </div>
    <div style={{ marginTop: '20px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox
        label="Non-resizable"
        placeholder="Enter Description"
        resizable={false}
      />
    </div>
    <div style={{ marginTop: '10px' }} />
  </div>
));

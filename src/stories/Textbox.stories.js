import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Textbox, Text } from 'components';

storiesOf('Textbox', module).add('Textbox', () => (
  <div style={{ marginLeft: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox label="Description" placeholder="Enter Description" />
    </div>
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox label="Description" placeholder="Enter Description" disabled />
    </div>
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Optional</Text>
    <div style={{ marginTop: '10px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox label="Description" placeholder="Enter Description" optional />
    </div>
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Error</Text>
    <div style={{ marginTop: '10px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox
        label="Description"
        placeholder="Enter Description"
        error="description required"
      />
    </div>
    <Text style="BodySmall">Non Resizable</Text>
    <div style={{ marginTop: '10px' }} />
    <div style={{ height: '100px', width: '200px' }}>
      <Textbox
        label="Description"
        placeholder="Enter Description"
        resizable={false}
      />
    </div>
    <div style={{ marginTop: '10px' }} />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Card, Text } from 'components';

storiesOf('Card', module).add('Card', () => (
  <div
    style={{
      marginLeft: '30px',
      width: '500px',
      marginTop: '30px',
      marginBottom: '30px'
    }}
  >
    <Text style="H4">Regular Card</Text>
    <div style={{ marginTop: '20px' }} />
    <Card>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '20px' }} />
    <Text style="H4">With Hover Behavior</Text>
    <div style={{ marginTop: '20px' }} />
    <Card hover>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '20px' }} />
    <Text style="H4">With Header Text</Text>
    <div style={{ marginTop: '20px' }} />
    <Card hover>
      <Card.Header>I am a card header :)</Card.Header>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
  </div>
));

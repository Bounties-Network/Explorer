import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Card, Text, Tabs } from 'components';

storiesOf('Card', module).add('Card', () => (
  <div
    style={{
      marginLeft: '30px',
      width: '500px',
      marginTop: '30px',
      marginBottom: '30px'
    }}
  >
    <Text type="H4">Regular Card</Text>
    <div style={{ marginTop: '20px' }} />
    <Card>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '20px' }} />
    <Text type="H4">With Hover Behavior</Text>
    <div style={{ marginTop: '20px' }} />
    <Card hover>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '20px' }} />
    <Text type="H4">With Header Text and Underline</Text>
    <div style={{ marginTop: '20px' }} />
    <Card hover>
      <Card.Header>I am a card header :)</Card.Header>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '20px' }} />
    <Text type="H4">Tab Example</Text>
    <div style={{ marginTop: '20px' }} />
    <Card hover>
      <Card.Header underline={false}>
        <Card.HeaderTitle>Submissions</Card.HeaderTitle>
        <Card.HeaderTabs onSelect={() => {}}>
          <Tabs.Tab tabColor="blue" eventKey={1}>
            Active
          </Tabs.Tab>
          <Tabs.Tab tabColor="green" eventKey={2}>
            Pending
          </Tabs.Tab>
          <Tabs.Tab eventKey={3}>Completed</Tabs.Tab>
        </Card.HeaderTabs>
      </Card.Header>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
    <div style={{ marginTop: '20px' }} />
    <Text type="H4">Only Tab</Text>
    <div style={{ marginTop: '20px' }} />
    <Card hover>
      <Card.Header underline={false}>
        <Card.HeaderTabs onSelect={() => {}} top>
          <Tabs.Tab tabColor="blue" eventKey={1}>
            Active
          </Tabs.Tab>
          <Tabs.Tab tabColor="green" eventKey={2}>
            Pending
          </Tabs.Tab>
          <Tabs.Tab eventKey={3}>Completed</Tabs.Tab>
        </Card.HeaderTabs>
      </Card.Header>
      <Card.Body>
        <div style={{ height: '150px' }}>I am a card :)</div>
      </Card.Body>
    </Card>
  </div>
));

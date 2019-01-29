import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Card, Text, Tabs } from 'components';

storiesOf('Card', module).add('Card', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Cards
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Card components will render a flexible and customizable content container.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular Cards
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Regular Cards contain the <code>Card.Body</code> element inside, which
      includes the HTML to be rendered inside the card.
    </Text>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Card>
        <Card.Body>
          <div style={{ height: '150px' }}>I am a the card content.</div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      If the prop <code>hover</code> is passed, the card's shadow will only
      appear on hover.
    </Text>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Card hover>
        <Card.Body>
          <div style={{ height: '150px' }}>I am a the card content.</div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Cards with header
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Cards can have headers with useful information, such as the title of the
      content or tabs, or both. The <code>Card.Header</code> element can be
      placed inside the <code>Card</code> element.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h4"
      weight="fontWeight-bold"
    >
      Title
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      To add a title, the <code>Card.HeaderTitle</code> can be placed inside the{' '}
      <code>Card.Header</code>.
    </Text>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Card>
        <Card.Header>
          <Card.HeaderTitle>I am the title of the card</Card.HeaderTitle>
        </Card.Header>
        <Card.Body>
          <div style={{ height: '150px' }}>I am the content of the card.</div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      By default, the Card header will be underlined. This can be disabled with
      the <code>underline</code> prop.
    </Text>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Card>
        <Card.Header underline={false}>
          <Card.HeaderTitle>I am the title of the card</Card.HeaderTitle>
        </Card.Header>
        <Card.Body>
          <div style={{ height: '150px' }}>I am the content of the card.</div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h4"
      weight="fontWeight-bold"
    >
      Tabs
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      To add tabs, the <code>Card.HeaderTabs</code> can be placed inside the{' '}
      <code>Card.Header</code>. Each children element must contain a{' '}
      <code>Tabs.Tab</code> element with the HTML of the tab.
    </Text>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Card>
        <Card.Header>
          <Card.HeaderTabs>
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
          <div style={{ height: '150px' }}>I am the content of the card.</div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onSelect</code> prop can be passed to{' '}
      <code>Card.HeaderTabs</code> as a callback for each time the user clicks
      on a tab.
    </Text>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Card>
        <Card.Header>
          <Card.HeaderTabs onSelect={action('clicked')}>
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
          <div style={{ height: '150px' }}>I am the content of the card.</div>
        </Card.Body>
      </Card>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h4"
      weight="fontWeight-bold"
    >
      Title and tabs
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The title and tabs can be put together inside the <code>Card.Header</code>{' '}
      element.
    </Text>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Card>
        <Card.Header>
          <Card.HeaderTitle>Submissions</Card.HeaderTitle>
          <Card.HeaderTabs>
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
          <div style={{ height: '150px' }}>
            Approximately 30 submissions in total.
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
));

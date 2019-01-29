import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tabs, Text } from 'components';

storiesOf('Tabs', module).add('Tabs', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Tabs
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Tab components are used to divide your content into multiple tabs and
      allow the user to switch among them.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular Tabs
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular Tab is composed by a <code>Tabs</code> component with several{' '}
      <code>Tabs.Tab</code> subcomponents inside.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Tabs onSelect={() => {}} defaultActiveKey={1}>
        <Tabs.Tab tabColor="blue" eventKey={1}>
          Active
        </Tabs.Tab>
        <Tabs.Tab tabColor="green" eventKey={2}>
          Pending
        </Tabs.Tab>
        <Tabs.Tab eventKey={3}>Completed</Tabs.Tab>
      </Tabs>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Tabs properties
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>defaultActiveKey</code> prop will determine the default tab. The
      user may switch to another tab.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Tabs onSelect={() => {}} defaultActiveKey={2}>
        <Tabs.Tab tabColor="blue" eventKey={1}>
          Active
        </Tabs.Tab>
        <Tabs.Tab tabColor="green" eventKey={2}>
          Pending
        </Tabs.Tab>
        <Tabs.Tab eventKey={3}>Completed</Tabs.Tab>
      </Tabs>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>activeKey</code> prop will set the current tab. This can only be
      changed programatically.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Tabs onSelect={() => {}} activeKey={3}>
        <Tabs.Tab tabColor="blue" eventKey={1}>
          Active
        </Tabs.Tab>
        <Tabs.Tab tabColor="green" eventKey={2}>
          Pending
        </Tabs.Tab>
        <Tabs.Tab eventKey={3}>Completed</Tabs.Tab>
      </Tabs>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onSelect</code> prop is a function that will be fired whenever
      the user switches to a new tab. The key <code>eventKey</code> from that
      specific tab will be passed as an argument.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Tabs onSelect={action('selected')} defaultActiveKey={1}>
        <Tabs.Tab tabColor="blue" eventKey={1}>
          Active
        </Tabs.Tab>
        <Tabs.Tab tabColor="green" eventKey={2}>
          Pending
        </Tabs.Tab>
        <Tabs.Tab eventKey={3}>Completed</Tabs.Tab>
      </Tabs>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Tabs.Tab properties
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>eventKey</code> prop is a unique identifier for this tab. It can
      be just a number or a string, but it must be unique for each tab.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>tabCount</code> prop is a number that will appear next to the
      tab title. This is useful for notifications. By default, no number will
      appear.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Tabs onSelect={action('selected')} defaultActiveKey={1}>
        <Tabs.Tab tabColor="blue" eventKey={1} tabCount={1}>
          Blue
        </Tabs.Tab>
        <Tabs.Tab tabColor="green" eventKey={2} tabCount={2}>
          Green
        </Tabs.Tab>
        <Tabs.Tab eventKey={3} tabCount={3}>
          lightGrey
        </Tabs.Tab>
      </Tabs>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>tabColor</code> prop will determine the background of the
      counter. It can be <code>blue</code>, <code>green</code> or
      <code>lightGrey</code>. The default value is <code>lightGrey</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Tabs onSelect={action('selected')} defaultActiveKey={1}>
        <Tabs.Tab tabColor="blue" eventKey={1} tabCount={1}>
          Blue
        </Tabs.Tab>
        <Tabs.Tab tabColor="green" eventKey={2} tabCount={2}>
          Green
        </Tabs.Tab>
        <Tabs.Tab eventKey={3}>lightGrey</Tabs.Tab>
      </Tabs>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>typeScale</code> prop will determine the size of the text of
      each tab. It can go from <code>h1</code> to <code>h5</code> or be{' '}
      <code>Small</code> or <code>Body</code>. The default value is{' '}
      <code>Body</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Tabs onSelect={action('selected')} defaultActiveKey={1}>
        <Tabs.Tab tabColor="blue" eventKey={1} tabCount={1} typeScale="h1">
          Blue
        </Tabs.Tab>
        <Tabs.Tab tabColor="green" eventKey={2} tabCount={2} typeScale="h3">
          Green
        </Tabs.Tab>
        <Tabs.Tab eventKey={3} tabCount={3} typeScale="h5">
          lightGrey
        </Tabs.Tab>
      </Tabs>
    </div>
  </div>
));

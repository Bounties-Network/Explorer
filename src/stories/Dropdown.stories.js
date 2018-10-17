import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Dropdown, Text } from 'components';

storiesOf('Dropdown', module).add('Dropdown', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Dropdown
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Dropdown components allow you to add several links to a single element.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Simple Dropdown
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A simple dropdown is composed by a <code>Dropdown</code> element. Inside,
      it must contain a <code>Dropdown.DropdownTrigger</code> element, with the
      text of the trigger, and a <code>Dropdown.DropdownContent</code>, which
      contains each item as a <code>Dropdown.MenuItem</code> element.
    </Text>

    <Dropdown>
      <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
      <Dropdown.DropdownContent>
        <Dropdown.MenuItem>I'm the first item</Dropdown.MenuItem>
        <Dropdown.MenuItem>I'm the second item</Dropdown.MenuItem>
        <Dropdown.MenuItem>I'm the third item</Dropdown.MenuItem>
      </Dropdown.DropdownContent>
    </Dropdown>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Position
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>position</code> prop is applied to the <code>Dropdown</code>{' '}
      element to determine the Dropdown position. It can be <code>right</code>{' '}
      or <code>left</code>. The default is <code>right</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Dropdown position="right">
        <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
        <Dropdown.DropdownContent>
          <Dropdown.MenuItem>I'm the first item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the second item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the third item</Dropdown.MenuItem>
        </Dropdown.DropdownContent>
      </Dropdown>

      <br />
      <br />

      <Dropdown position="left">
        <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
        <Dropdown.DropdownContent>
          <Dropdown.MenuItem>I'm the first item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the second item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the third item</Dropdown.MenuItem>
        </Dropdown.DropdownContent>
      </Dropdown>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      animateDirection
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>animateDirection</code> prop is applied to the{' '}
      <code>Dropdown</code> element to determine the direction of the Dropdown
      animation. It can be <code>right</code> or <code>down</code>. The default
      is <code>down</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Dropdown animateDirection="right">
        <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
        <Dropdown.DropdownContent>
          <Dropdown.MenuItem>I'm the first item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the second item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the third item</Dropdown.MenuItem>
        </Dropdown.DropdownContent>
      </Dropdown>

      <br />
      <br />

      <Dropdown animateDirection="down">
        <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
        <Dropdown.DropdownContent>
          <Dropdown.MenuItem>I'm the first item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the second item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the third item</Dropdown.MenuItem>
        </Dropdown.DropdownContent>
      </Dropdown>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      hoverTrigger
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>hoverTrigger</code> prop is applied to the <code>Dropdown</code>{' '}
      element and will determine whether or not the Dropdown will be triggered
      when the user hovers the trigger element. The default is{' '}
      <code>false</code>
    </Text>

    <div className="sb-component-group sb-button-group">
      <Dropdown hoverTrigger>
        <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
        <Dropdown.DropdownContent>
          <Dropdown.MenuItem>I'm the first item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the second item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the third item</Dropdown.MenuItem>
        </Dropdown.DropdownContent>
      </Dropdown>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      hideOnClick
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>hidenOnClick</code> prop is applied to the <code>Dropdown</code>{' '}
      element and will determine whether or not the Dropdown will be closed when
      the user clicks on an item. The default value is <code>false</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Dropdown hideOnClick>
        <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
        <Dropdown.DropdownContent>
          <Dropdown.MenuItem>I'm the first item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the second item</Dropdown.MenuItem>
          <Dropdown.MenuItem>I'm the third item</Dropdown.MenuItem>
        </Dropdown.DropdownContent>
      </Dropdown>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onClick
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onClick</code> prop is applied to the{' '}
      <code>Dropdown.MenuItem</code> element. It's a function that will be fired
      whenever that element is clicked.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Dropdown>
        <Dropdown.DropdownTrigger>Click me</Dropdown.DropdownTrigger>
        <Dropdown.DropdownContent>
          <Dropdown.MenuItem onClick={action('clicked')}>
            I'm the first item
          </Dropdown.MenuItem>
          <Dropdown.MenuItem onClick={action('clicked')}>
            I'm the second item
          </Dropdown.MenuItem>
          <Dropdown.MenuItem onClick={action('clicked')}>
            I'm the third item
          </Dropdown.MenuItem>
        </Dropdown.DropdownContent>
      </Dropdown>
    </div>
  </div>
));

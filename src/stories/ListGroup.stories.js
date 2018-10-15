import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ListGroup, Text } from 'components';

storiesOf('ListGroup', module).add('ListGroup', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      ListGroup
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      ListGroup components will render a list of items.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular ListGroup
    </Text>
    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular ListGroup is composed by several <code>ListGroup.ListItem</code>{' '}
      subcomponents.
    </Text>

    <div class="sb-component-group sb-button-group">
      <ListGroup>
        <ListGroup.ListItem hover>List Item 1</ListGroup.ListItem>
        <ListGroup.ListItem hover>List Item 2</ListGroup.ListItem>
        <ListGroup.ListItem hover>List Item 3</ListGroup.ListItem>
      </ListGroup>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      hover
    </Text>
    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>hover</code> property is applied to the{' '}
      <code>ListGroup.ListItem</code> subcomponent and will determine if the
      item will be highlighted when the user hovers it. The default value is{' '}
      <code>false</code>
    </Text>

    <div class="sb-component-group sb-button-group">
      <ListGroup>
        <ListGroup.ListItem hover>List Item 1</ListGroup.ListItem>
        <ListGroup.ListItem>List Item 2</ListGroup.ListItem>
      </ListGroup>
    </div>
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Network, Text } from 'components';

storiesOf('Network', module).add('Network', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Network
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Network components will render a Pill used to represent networks.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      network
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>network</code> prop will determine the name of the Network to
      render. It must be either <code>rinkeby</code> or <code>mainNet</code>.
      The default value is <code>mainNet</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Network />
      <br />
      <Network network="rinkeby" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      theme
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>theme</code> prop will determine the color of the text. It must
      be either <code>light</code> or <code>dark</code>. The default value is{' '}
      <code>light</code>.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ backgroundColor: '#f44262' }}
    >
      <Network theme="light" />
      <br />
      <Network theme="dark" />
    </div>
  </div>
));

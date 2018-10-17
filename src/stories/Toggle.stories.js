import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Toggle, Text } from 'components';

storiesOf('Toggle', module).add('Toggle', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Toggle
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Toggle components are special checkboxes used for binary states such as on
      / off.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      label
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>label</code> prop will describe the toggle.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Toggle label="Off / On" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      defaultValue
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>defaultValue</code> prop will set the Toggle's value. This can
      only be changed programatically.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Toggle label="Off / On" defaultValue={false} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      disabled
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>disabled</code> prop will determine if the user can change the
      state of the Toggle component.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Toggle label="Off / On" disabled />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onChange
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onChange</code> prop is a function that will be fired when the
      state of the Toggle is changed. The new value will be passed as an
      argument.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Toggle label="Off / On" onChange={action('changed')} />
    </div>
  </div>
));

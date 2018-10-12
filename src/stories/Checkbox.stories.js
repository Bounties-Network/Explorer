import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Checkbox, Text } from 'components';

storiesOf('Checkbox', module).add('Checkbox', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Checkbox
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Checkbox components will render a simple checkbox which can be customized.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Label
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>label</code> prop will determine the label of the checkbox.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Checkbox label="This is a label" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      defaultChecked
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>defaultChecked</code> prop is a boolean that will determine the
      default state of the checkbox. The user may change the state of the
      checkbox later.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Checkbox
        label="This checkbox is checked by default"
        defaultChecked={true}
      />
      <Checkbox
        label="This checkbox is unchecked by default"
        defaultChecked={false}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Checked
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>checked</code> prop is a boolean that will determine the state
      of the checkbox. The state of this checkbox can only be changed
      programatically.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Checkbox label="This checkbox is checked" checked={true} />
      <Checkbox label="This checkbox is unchecked" checked={false} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Disabled
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>disabled</code> prop is a boolean that will determine whether or
      not the user can change the state of the checkbox.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Checkbox label="This is a disabled checkbox" disabled={true} />
    </div>
  </div>
));

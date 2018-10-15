import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RadioGroup, Text } from 'components';

const data = [
  { value: 'eth', label: 'ETH' },
  { value: 'erc20', label: 'ERC20' }
];

storiesOf('RadioGroup', module).add('RadioGroup', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      RadioGroup
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      RadioGroup components can be used to group several radio boxes in a single
      component.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      options
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>options</code> prop will take an array to render the
      information. Each array value must be an object with the keys{' '}
      <code>label</code> and <code>data</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <RadioGroup options={data} />
    </div>

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
      The <code>label</code> prop will determine the main label for the group of
      radio buttons.
    </Text>

    <div class="sb-component-group sb-button-group">
      <RadioGroup options={data} label="Currency type" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      value
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>value</code> prop will determine which radio input has already
      been checked. You must pass its value.
    </Text>

    <div class="sb-component-group sb-button-group">
      <RadioGroup options={data} label="Currency type" value="eth" />
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
      The <code>disabled</code> prop will determine whether the user can change
      the state of the radio group or not.
    </Text>

    <div class="sb-component-group sb-button-group">
      <RadioGroup options={data} label="Currency type" value="eth" disabled />
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
      The <code>onClick</code> prop is a function that will be fired whenever
      the user clicks on a radio button. The selected value will be passed as an
      argument.
    </Text>

    <div class="sb-component-group sb-button-group">
      <RadioGroup
        options={data}
        label="Currency type"
        value="eth"
        onChange={action('changed')}
      />
    </div>
  </div>
));

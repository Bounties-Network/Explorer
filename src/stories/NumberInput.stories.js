import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { NumberInput, Text } from 'components';

storiesOf('NumberInput', module).add('NumberInput', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      NumberInput
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      NumberInput components can be used to select number within a range.
    </Text>

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
      The <code>defaultValue</code> prop will determine the default value of the
      input. This may be changed later by the user. The default value is{' '}
      <code>0</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <NumberInput defaultValue={5} />
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
      The <code>value</code> prop will determine the value of the input. This
      can only be changed programatically.
    </Text>

    <div className="sb-component-group sb-button-group">
      <NumberInput value={5} />
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
      The <code>label</code> prop will determine the label of the input.
    </Text>

    <div className="sb-component-group sb-button-group">
      <NumberInput value={5} label="I am the label" />
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
      the state of the input or not.
    </Text>

    <div className="sb-component-group sb-button-group">
      <NumberInput value={5} disabled />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      min
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>min</code> prop will determine the minimum value that the input
      can accept. The default value is <code>0</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <NumberInput defaultValue={5} min={3} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      max
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>max</code> prop will determine the maximum value that the input
      can accept. The default value is <code>10</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <NumberInput defaultValue={5} max={7} />
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
      user increases or decreases the value of the input. The new value of the
      input will be sent as an argument.
    </Text>

    <div className="sb-component-group sb-button-group">
      <NumberInput defaultValue={5} onChange={action('changed')} />
    </div>
  </div>
));

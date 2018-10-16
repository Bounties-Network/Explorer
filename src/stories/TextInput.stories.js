import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TextInput, Text } from 'components';

storiesOf('TextInput', module).add('TextInput', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      TextInput
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      TextInput components can be used to receive text from the user.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular TextInput
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular TextInput with no props will render a simple input for text.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      type
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>type</code> prop will determine the input's type. It can be{' '}
      <code>number</code>, <code>text</code> or <code>datetime-local</code>. The
      default value is <code>text</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput
        placeholder="Insert your username"
        label="Username"
        type="text"
      />
      <br />
      <TextInput placeholder="Insert your age" label="Age" type="number" />
      <br />
      <TextInput
        placeholder="Insert the time"
        label="Time"
        type="datetime-local"
      />
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
      The <code>value</code> prop will set the input's value. This can only be
      changed programatically.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput value="I am the value" />
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
      The <code>label</code> prop will determine whether the input's label.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput label="Username" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      placeholder
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>placeholder</code> prop will set the input's placeholder.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput label="Username" placeholder="Insert your username" />
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

    <div class="sb-component-group sb-button-group">
      <TextInput placeholder="Insert your username" label="Username" disabled />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      error
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>error</code> prop will change the input's style and show the
      error message.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput
        placeholder="Insert your username"
        label="Username"
        error="Something went wrong"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      optional
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>optional</code> prop will sufix the label with "(Optional)".
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput placeholder="Insert your username" label="Username" optional />
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
      The <code>onChange</code> prop is a function that will be fired whenever
      the user changes the input's content. The new value will be sent as an
      argument.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput
        placeholder="Insert your username"
        label="Username"
        onChange={action('changed')}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onFocus
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onFocus</code> prop is a function that will be fired whenever
      the user clicks inside the textbox to start writing.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput
        placeholder="Insert your username"
        label="Username"
        onFocus={action('focused')}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onBlur
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onBlur</code> prop is a function that will be fired whenever the
      user clicks outside the after previously clicking in.
    </Text>

    <div class="sb-component-group sb-button-group">
      <TextInput
        placeholder="Insert your username"
        label="Username"
        onBlur={action('blurred')}
      />
    </div>
  </div>
));

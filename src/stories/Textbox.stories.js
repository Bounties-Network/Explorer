import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Textbox, Text } from 'components';

storiesOf('Textbox', module).add('Textbox', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Textbox
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Textbox components can be used to receive text from the user, such as
      messages or comments.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular Textbox
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular Textbox with no props will render a simple textearea for text.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Textbox />
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

    <div className="sb-component-group sb-button-group">
      <Textbox value="I am the value" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      resizable
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>resizable</code> prop will determine if the textearea can be
      resized or not. The default value is <code>true</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Textbox resizable={true} />
      <br />
      <Textbox resizable={false} />
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

    <div className="sb-component-group sb-button-group">
      <Textbox label="Your comment" />
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

    <div className="sb-component-group sb-button-group">
      <Textbox label="Comment" placeholder="Insert your comment" />
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
      <Textbox placeholder="Insert your message" label="Message" disabled />
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

    <div className="sb-component-group sb-button-group">
      <Textbox
        placeholder="Insert your message"
        label="Message"
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

    <div className="sb-component-group sb-button-group">
      <Textbox placeholder="Insert your message" label="Message" optional />
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

    <div className="sb-component-group sb-button-group">
      <Textbox
        placeholder="Insert your message"
        label="Message"
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

    <div className="sb-component-group sb-button-group">
      <Textbox
        placeholder="Insert your message"
        label="Message"
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

    <div className="sb-component-group sb-button-group">
      <Textbox
        placeholder="Insert your message"
        label="Message"
        onBlur={action('blurred')}
      />
    </div>
  </div>
));

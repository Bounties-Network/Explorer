import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MarkdownEditor, Text } from 'components';

storiesOf('MarkdownEditor', module).add('MarkdownEditor', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      MarkdownEditor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      MarkdownEditor components will render a markdown editor that can be
      previsualized in a modal.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular MarkdownEditor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular MarkdownEditor will render the input with the preview button.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ height: '320px' }}
    >
      <MarkdownEditor />
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
      The <code>defaultValue</code> prop will determine the default value of the
      editor. The user may change this value later.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor defaultValue="I am the default value" />
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
      The <code>value</code> prop will determine the value of the editor. This
      value can only be changed programatically.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor value="I am the value" />
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
      The <code>label</code> prop will determine the label of the editor. If
      this prop is not passed, no label will be displayed.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor
        defaultValue="I am the default value"
        label="I am the label"
      />
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
      the text of the editor or not.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor
        defaultValue="I am the default value"
        label="I am the label"
        disabled
      />
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
      The <code>error</code> prop will show an error after the editor and turn
      its lines red.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor
        defaultValue="I am the default value"
        label="I am the label"
        error="I am the error"
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
      The <code>onFocus</code> prop is a function that will be fired when the
      user clicks/taps inside the editor.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor
        defaultValue="I am the default value"
        label="I am the label"
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
      The <code>onFocus</code> prop is a function that will be fired when the
      user clicks/taps outside of the editor, after previously clicking inside.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor
        defaultValue="I am the default value"
        label="I am the label"
        onBlur={action('blurred')}
      />
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
      user changes the content inside the editor. The value of the editor will
      be passed as an argument.
    </Text>

    <div className="sb-component-group sb-button-group">
      <MarkdownEditor
        defaultValue="I am the default value"
        label="I am the label"
        onChange={action('changed')}
      />
    </div>
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileUpload, Text } from 'components';

storiesOf('FileUpload', module).add('FileUpload', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      FileUpload
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      FileUpload components will render a simple input for files.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular FileUpload
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular FileUpload with no props will render an input for files.
    </Text>

    <div class="sb-component-group sb-button-group">
      <FileUpload />
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
      The <code>disabled</code> prop will determine whether the user can change
      the state of the input or not.
    </Text>

    <div class="sb-component-group sb-button-group">
      <FileUpload disabled />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Disabled with value
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      If the FileUpload component is disabled, it can have a default value by
      passing the props <code>filename</code> and <code>filesize</code> (in
      bytes).
    </Text>

    <div class="sb-component-group sb-button-group">
      <FileUpload disabled filename="File.jpg" filesize={31245} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Loading
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>loading</code> prop will determine whether the file is loading
      or not.
    </Text>

    <div class="sb-component-group sb-button-group">
      <FileUpload loading filename="File.jpg" filesize={31245} />
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
      the user changes the state of the input.
    </Text>

    <div class="sb-component-group sb-button-group">
      <FileUpload onChange={action('changed')} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onRemove
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onRemove</code> prop is a function that will be fired whenever
      the user removes the current file.
    </Text>

    <div class="sb-component-group sb-button-group">
      <FileUpload
        onRemove={action('removed')}
        filename="removeMe.png"
        filesize={35243}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onUnmount
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onUnmount</code> prop is a function that will be fired whenever
      the FileUpload component is unmounted.
    </Text>
  </div>
));

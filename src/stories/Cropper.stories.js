import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Cropper, Text } from 'components';

storiesOf('Cropper', module).add('Cropper', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Cropper
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Cropper components are extremely useful for cropping pictures, especially
      profile pictures.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Basic Cropper
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A Basic Cropper with no props will display an input to upload an image and
      crop it.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Cropper />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      With source
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>src</code> prop can be used to set an image beforehand, such as
      the user's current picture.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Cropper src="https://i.imgur.com/lhTwRZY.png" />
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
      The <code>disabled</code> prop is a boolean that determines if the user
      can upload an image or change the current one.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Cropper disabled={true} />
      <Cropper src="https://i.imgur.com/lhTwRZY.png" disabled={true} />
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
      The <code>loading</code> prop will determine if the cropper is loading.
      The default value is <code>false</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Cropper loading={true} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onDelete
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onDelete</code> prop is a function that will be fired when the
      user clicks on delete. To delete the image, the <code>src</code> prop must
      be removed.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Cropper
        src="https://i.imgur.com/lhTwRZY.png"
        onDelete={action('clicked')}
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
      user selects a new picture and crops it. It will be called with the
      arguments <code>smallBlob</code> (64x64) and <code>largeBlob</code>(300x300).
      The format is png.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Cropper
        src="https://i.imgur.com/lhTwRZY.png"
        onChange={action('clicked')}
      />
    </div>
  </div>
));

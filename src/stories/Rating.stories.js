import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Rating, Text } from 'components';

storiesOf('Rating', module).add('Rating', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Rating
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Rating components can be rate things from 1 to 5.
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
      Rating component. The user may change this value later.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Rating defaultValue={4} />
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
      The <code>value</code> prop will determine the value of the Rating
      component. This can only be changed programatically.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Rating value={4} />
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
      The <code>label</code> prop will the label of the rating.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Rating label="Rate me" />
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
      The <code>error</code> prop will show the error below the rating.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Rating label="Rate me" error="Something went wrong" />
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
      the user clicks on one of the options. The selected option will be passed
      as an argument.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Rating label="Rate me" onChange={action('changed')} />
    </div>
  </div>
));

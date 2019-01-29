import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Search, Text } from 'components';

storiesOf('Search', module).add('Search', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Search
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Search components will render an input that can be used to search
      anything.
    </Text>

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
      The <code>value</code> prop will determine the value of the Search
      component. This value can only be changed programatically.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Search value="Who let the dogs out" />
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
      the user changes the text inside the search box. The new value will be
      passed as an argument.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Search onChange={action('typed')} />
    </div>
  </div>
));

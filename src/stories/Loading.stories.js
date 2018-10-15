import React from 'react';

import { storiesOf } from '@storybook/react';

import { Loading, Text } from 'components';

storiesOf('Loading', module).add('Loading', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Loading
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Loading components will render a simple loading animation.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Loading />
    </div>
  </div>
));

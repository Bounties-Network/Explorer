import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FullAddressBar, Button, Text } from 'components';

storiesOf('FullAddressBar', module).add('FullAddressBar', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      FullAddressBar
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      FullAddressBar components are useful to represent addresses that can be
      copied.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      address
    </Text>
    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>address</code> prop will be the address represented by the
      component.
    </Text>

    <div className="sb-component-group sb-button-group">
      <FullAddressBar
        address={'0x1234567891011121314151617181920212223242'}
        copyButton
      />
    </div>
  </div>
));

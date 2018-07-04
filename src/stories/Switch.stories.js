import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Switch, Text } from 'components';

storiesOf('Switch', module).add('Switch', () => (
  <div style={{ marginLeft: '20px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Switch Component</Text>
    <div style={{ marginTop: '10px' }} />
    <Switch onValue={'Fulfiller'} offValue={'Issuer'} />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">All colors are configurable</Text>
    <Text type="Body">
      Props are: selectedColor, unselectedColor, backgroundColor, switchColor
    </Text>
    <div style={{ marginTop: '10px' }} />
    <Switch
      onValue={'Fulfiller'}
      offValue={'Issuer'}
      selectedColor="white"
      unselectedColor="lightGrey"
      backgroundColor="purple"
      switchColor="purpleWhite"
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Large</Text>
    <div style={{ marginTop: '10px' }} />
    <Switch
      onValue={'Fulfiller'}
      offValue={'Issuer'}
      selectedColor="white"
      unselectedColor="lightGrey"
      backgroundColor="purple"
      switchColor="purpleWhite"
      size="large"
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Curved</Text>
    <div style={{ marginTop: '10px' }} />
    <Switch
      onValue={'Fulfiller'}
      offValue={'Issuer'}
      selectedColor="white"
      unselectedColor="lightGrey"
      backgroundColor="purple"
      switchColor="purpleWhite"
      size="large"
      curved
    />
  </div>
));

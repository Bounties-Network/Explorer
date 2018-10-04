import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Switch, Text } from 'components';

storiesOf('Switch', module).add('Switch', () => (
  <div style={{ marginLeft: '20px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Switch Component</Text>
    <div style={{ marginTop: '10px' }} />
    <Switch onValue={'Fulfiller'} offValue={'Issuer'} key="0" />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">All colors are configurable</Text>
    <Text type="Body">
      Props are: selectedColor, unselectedColor, backgroundColor, switchColor
    </Text>
    <div style={{ marginTop: '10px' }} />
    <Switch
      key="1"
      onValue={'Fulfiller'}
      offValue={'Issuer'}
      selectedColor="white"
      unselectedColor="transparentWhite"
      backgroundColor="blue"
      switchColor="transparentWhite"
      size="large"
      curved
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Large</Text>
    <div style={{ marginTop: '10px' }} />
    <Switch
      key="2"
      onValue={'Fulfiller'}
      offValue={'Issuer'}
      selectedColor="white"
      unselectedColor="lightGrey"
      backgroundColor="blue"
      switchColor="green"
      size="large"
    />
  </div>
));

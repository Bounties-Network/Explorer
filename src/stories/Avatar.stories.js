import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Avatar, Text } from 'components';

storiesOf('Avatar', module).add('Avatar', () => (
  <div>
    <Text type="H3">Avatar</Text>
    <div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">With border, name and address (default text)</Text>
      <span style={{ marginRight: '10px' }} />
      <Avatar
        size="medium"
        border
        name="Simona Pop"
        address="0xe66f8C6AB127ecDFD5cbf031f74A584aD2fC494b"
      />
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">With border, name and address (changed text styles)</Text>
      <span style={{ marginRight: '10px' }} />
      <div
        style={{
          width: '300px',
          height: '150px',
          backgroundColor: '#5A28C6',
          paddingTop: '20px'
        }}
      >
        <Avatar
          size="medium"
          border
          name="Simona Pop"
          address="0xe66f8C6AB127ecDFD5cbf031f74A584aD2fC494b"
          nameTextColor="white"
          nameTextType="H2"
          addressTextColor="white"
        />
      </div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">
        No border, no name and with an address (changed text styles)
      </Text>
      <span style={{ marginRight: '10px' }} />
      <div
        style={{
          width: '300px',
          height: '150px',
          backgroundColor: '#5A28C6',
          paddingTop: '20px'
        }}
      >
        <Avatar
          size="medium"
          address="0xe66f8C6AB127ecDFD5cbf031f74A584aD2fC494b"
          addressTextColor="white"
          addressTextType="H4"
        />
      </div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">No name or address</Text>
      <span style={{ marginRight: '10px' }} />
      <Avatar size="medium" />
    </div>
  </div>
));

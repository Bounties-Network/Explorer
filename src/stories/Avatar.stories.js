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
        img="https://i.imgur.com/lhTwRZY.png"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
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
          address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
          nameTextColor="white"
          nameTextType="H2"
          img="https://i.imgur.com/lhTwRZY.png"
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
          address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
          img="https://i.imgur.com/lhTwRZY.png"
          addressTextColor="white"
          addressTextType="H4"
        />
      </div>
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">No name or address</Text>
      <span style={{ marginRight: '10px' }} />
      <Avatar size="medium" img="https://i.imgur.com/lhTwRZY.png" />
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Small</Text>
      <span style={{ marginRight: '10px' }} />
      <Avatar size="small" img="https://i.imgur.com/lhTwRZY.png" />
      <div style={{ marginTop: '10px' }} />
      <Text type="H4">Large</Text>
      <span style={{ marginRight: '10px' }} />
      <Avatar size="large" img="https://i.imgur.com/lhTwRZY.png" />
      <Text type="H4">No Image</Text>
      <Avatar size="medium" hash="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r" />
    </div>
  </div>
));

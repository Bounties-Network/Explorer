import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Circle, Text } from 'components';

storiesOf('Circle', module).add('All Circles', () => (
  <div>
    <Text type="H3">Text Circle</Text>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <br />
      <Circle type="text" size="small" input="3/4" />
      <br />
      <Circle type="text" size="small" input="100%" />
    </div>

    <hr />

    <Text type="H3">Image Circle</Text>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <br />
      <Circle type="img" size="small" input="https://i.imgur.com/lhTwRZY.png" />
    </div>

    <Text type="H3">Loading Circle</Text>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <br />
      <Circle type="img" size="small" type="loading" color="red" />
    </div>

    <hr />

    <Text type="H3">Colors</Text>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <br />
      <Text type="H4">White</Text>
      <br />
      <Circle
        type="text"
        size="small"
        input="100%"
        color="white"
        textColor="black"
      />
      <br />
      <br />
      <Text type="H4">Purple</Text>
      <br />
      <Circle
        type="text"
        size="small"
        input="100%"
        color="purple"
        textColor="white"
      />
      <br />
      <br />
      <Text type="H4">Blue</Text>
      <br />
      <Circle
        type="text"
        size="small"
        input="100%"
        color="blue"
        textColor="white"
      />
      <br />
      <br />
      <Text type="H4">Orange</Text>
      <br />
      <Circle
        type="text"
        size="small"
        input="100%"
        color="orange"
        textColor="white"
      />
      <br />
      <br />
      <Text type="H4">Green</Text>
      <br />
      <Circle
        type="text"
        size="small"
        input="100%"
        color="green"
        textColor="white"
      />
      <br />
      <br />
      <Text type="H4">Red</Text>
      <br />
      <Circle
        type="text"
        size="small"
        input="100%"
        color="red"
        textColor="white"
      />
    </div>

    <br />
    <hr />

    <Text type="H3">Sizes</Text>
    <br />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <br />
      <Text type="H4">Small</Text>
      <br />
      <Circle
        type="text"
        size="small"
        input="100%"
        color="purple"
        textColor="white"
      />
      <br />
      <br />
      <Text type="H4">Medium</Text>
      <br />
      <Circle
        type="text"
        size="medium"
        input="100%"
        color="orange"
        textColor="white"
      />
      <br />
      <br />
      <Text type="H4">Large</Text>
      <br />
      <Circle
        type="text"
        size="large"
        input="100%"
        color="green"
        textColor="white"
      />
      <Text type="H3">Blockies</Text>
    </div>
    <br />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <br />
      <Text type="H4">Small</Text>
      <br />
      <Circle
        type="blocky"
        size="small"
        input="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        color="white"
      />
      <br />
      <br />
      <Text type="H4">Medium</Text>
      <br />
      <Circle
        type="blocky"
        size="medium"
        input="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        color="white"
      />
      <br />
      <br />
      <Text type="H4">Large</Text>
      <br />
      <Circle
        type="blocky"
        size="large"
        input="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        color="white"
      />
    </div>
  </div>
));

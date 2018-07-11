import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Pill, Text } from 'components';

storiesOf('Pill', module).add('All Pills', () => (
  <div>
    <Text type="H3">Rounded Pills</Text>
    <br />
    <br />
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '250px'
        }}
      >
        <Pill>HTML</Pill>
        <Pill>CSS</Pill>
        <Pill>React</Pill>
        <Pill>Javascript</Pill>
      </div>
    </div>

    <br />
    <hr />
    <br />

    <Text type="H3">Rectangle Pills</Text>
    <br />
    <br />
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '250px'
        }}
      >
        <Pill type="rectangle">HTML</Pill>
        <Pill type="rectangle">CSS</Pill>
        <Pill type="rectangle">React</Pill>
        <Pill type="rectangle">Javascript</Pill>
      </div>
    </div>

    <br />
    <hr />

    <Text type="H3">Pills with Close Button</Text>
    <br />
    <br />
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '250px'
        }}
      >
        <Pill type="round" close onCloseClick={action('clicked')}>
          HTML
        </Pill>
        <Pill type="round" close onCloseClick={action('clicked')}>
          CSS
        </Pill>
        <Pill type="round" close onCloseClick={action('clicked')}>
          React
        </Pill>
        <Pill type="round" close onCloseClick={action('clicked')}>
          Javascript
        </Pill>
      </div>
    </div>

    <br />
    <hr />

    <Text type="H3">Pills Transparent</Text>
    <br />
    <br />
    <div
      style={{
        display: 'flex',
        backgroundColor: 'blue',
        height: '60px',
        paddingTop: '10px'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '250px'
        }}
      >
        <Pill type="round">HTML</Pill>
        <Pill type="round">CSS</Pill>
        <Pill type="round">React</Pill>
        <Pill type="round">Javascript</Pill>
      </div>
    </div>

    <br />
    <hr />

    <Text type="H3">Playing with Colors and sizes</Text>
    <br />
    <br />
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '250px'
        }}
      >
        <Pill noBorder type="round" backgroundColor="blue">
          <Text type="H2" color="white">
            HTML
          </Text>
        </Pill>
        <Pill noBorder type="round" backgroundColor="purple">
          <Text type="H4" color="white">
            CSS
          </Text>
        </Pill>
      </div>
    </div>

    <br />
    <hr />

    <Text type="H3">Icons & Network</Text>
    <br />
    <br />
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '250px'
        }}
      >
        <Pill>
          <Text color="green">&#9679;</Text>
          <span style={{ marginRight: '10px' }} />
          <Text color="black">Main Ethereum Network</Text>
        </Pill>
        <Pill>
          <Text color="orange">&#9679;</Text>
          <span style={{ marginRight: '10px' }} />
          <Text color="black">Rinkeby Network</Text>
        </Pill>
      </div>
    </div>
  </div>
));

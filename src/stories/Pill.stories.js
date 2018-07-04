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
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
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
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
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
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
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
  </div>
));

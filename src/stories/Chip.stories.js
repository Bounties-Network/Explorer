import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Chip, Text } from 'components';

storiesOf('Chip', module).add('All Chips', () => (
  <div>
    <Text type="H3">Rounded Chips</Text>
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
        <Chip>HTML</Chip>
        <Chip>CSS</Chip>
        <Chip>React</Chip>
        <Chip>Javascript</Chip>
      </div>
    </div>

    <br />
    <hr />
    <br />

    <Text type="H3">Rectangle Chips</Text>
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
        <Chip type="rectangle">HTML</Chip>
        <Chip type="rectangle">CSS</Chip>
        <Chip type="rectangle">React</Chip>
        <Chip type="rectangle">Javascript</Chip>
      </div>
    </div>

    <br />
    <hr />

    <Text type="H3">Chips with Close Button</Text>
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
        <Chip type="round" close onCloseClick={action('clicked')}>
          HTML
        </Chip>
        <Chip type="round" close onCloseClick={action('clicked')}>
          CSS
        </Chip>
        <Chip type="round" close onCloseClick={action('clicked')}>
          React
        </Chip>
        <Chip type="round" close onCloseClick={action('clicked')}>
          Javascript
        </Chip>
      </div>
    </div>

    <br />
    <hr />
  </div>
));

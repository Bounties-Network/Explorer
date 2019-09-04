import React from 'react';

import { addDecorator, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  select,
  text,
  boolean,
  number
} from '@storybook/addon-knobs/react';
import centered from '@storybook/addon-centered';

import { Tooltip, Text } from 'components';

addDecorator(centered);

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add('short message', () => (
    <Tooltip
      align={select('alignment', ['left', 'center', 'right'], 'center')}
      width={text('width', '200px')}
    >
      <Text typeScale="Small">{text('message', 'A short tooltip')}</Text>
    </Tooltip>
  ))
  .add('long message', () => (
    <Tooltip
      align={select('alignment', ['left', 'center', 'right'], 'center')}
      width={text('width', '200px')}
    >
      <Text
        lineHeight="lineHeight-default"
        alignment="align-left"
        typeScale="Small"
      >
        {text(
          'message',
          'This is much longer tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        )}
      </Text>
    </Tooltip>
  ));

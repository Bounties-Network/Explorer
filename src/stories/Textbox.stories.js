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

import { Textbox, Text } from 'components';

addDecorator(centered);

storiesOf('Textbox', module)
  .addDecorator(withKnobs)
  .add('all', () => (
    <Textbox
      value={text('value', undefined)}
      error={text('error', undefined)}
      label={text('label', 'Textbox label')}
      placeholder={text('placeholder', 'Placeholder text')}
      maxLength={number('max length', 500)}
      resizable={boolean('resizable', true)}
      disabled={boolean('disabled', false)}
      optional={boolean('optional', false)}
      onChange={action('changed')}
      onFocus={action('focused')}
      onBlur={action('blurred')}
    />
  ));

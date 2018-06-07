import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TextInput } from 'components';

storiesOf('TextInput', module).add('TextInput', () => (
  <div
    style={{ width: '315px', display: 'flex', justifyContent: 'space-between' }}
  >
    <TextInput onChange={e => console.log(e)} />
  </div>
));

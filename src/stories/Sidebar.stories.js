import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Sidebar } from 'components';

import { i } from '../fontawesome-all.js';

const options = [
  { icon: 'tachometer', active: true },
  { icon: 'list-alt', active: false },
  { icon: 'trophy-alt', active: false }
];

storiesOf('Sidebar', module).add('Sidebar', () => (
  <div>
    <Sidebar options={options} onClick={console.log} />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Select } from 'components';

const options = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'CSS', label: 'CSS' }
];

storiesOf('Select', module).add('Select', () => (
  <div style={{ width: '200px' }}>
    <Select
      onChange={e => console.log(e)}
      options={options}
      placeholder="Select one!"
    />
  </div>
));

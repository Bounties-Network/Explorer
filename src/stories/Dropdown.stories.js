import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DropdownComponent } from 'components';

const options = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'CSS', label: 'CSS' }
];

storiesOf('Dropdown', module).add('Dropdown', () => (
  <div>
    <DropdownComponent
      onChange={e => console.log(e)}
      options={options}
      placeholder="Select one!"
    />
  </div>
));

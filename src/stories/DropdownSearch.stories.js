import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DropdownSearch } from 'components';

const options = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'CSS', label: 'CSS' }
];

storiesOf('DropdownSearch', module).add('DropdownSearch', () => (
  <div>
    <DropdownSearch
      onChange={action('clicked')}
      options={options}
      placeholder="e.g. HTML"
    />
  </div>
));

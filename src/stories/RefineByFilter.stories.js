import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RefineByFilter } from 'components';

const options = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'CSS', label: 'CSS' }
];

storiesOf('RefineByFilter', module).add('RefineByFilter', () => (
  <div>
    DropDownSearch
    <br />
    <RefineByFilter
      onChange={e => console.log(e)}
      dropdown
      dropdownOptions={options}
    />
    <br />
    <br />
    <br />
    <br />
    <hr />
    <br />
    <br />
    <br />
    No Dropdown Search
    <br />
    <RefineByFilter onChange={e => console.log(e)} />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown } from 'components';

const { DropdownTrigger, DropdownContent } = Dropdown;

const options = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'CSS', label: 'CSS' }
];

storiesOf('NewDropdown', module).add('NewDropdown', () => (
  <div>
    <Dropdown>
      <DropdownTrigger>TestDrop</DropdownTrigger>
      <DropdownContent>
        <div>yolo</div>
      </DropdownContent>
    </Dropdown>
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DropdownSearch, Text } from 'components';

const options = [
  { value: 'React', name: 'React' },
  { value: 'Javascript', name: 'Javascript' },
  { value: 'CSS', name: 'CSS' }
];

storiesOf('DropdownSearch', module).add('DropdownSearch', () => (
  <div style={{ width: '200px', marginLeft: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <DropdownSearch
      label="Select your Category"
      onChange={action('clicked')}
      options={options}
      placeholder="e.g. HTML"
    />
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <DropdownSearch
      disabled
      label="Select your Category"
      onChange={action('clicked')}
      options={options}
      placeholder="e.g. HTML"
    />
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Optional</Text>
    <div style={{ marginTop: '10px' }} />
    <DropdownSearch
      label="Select your Category"
      onChange={action('clicked')}
      optional
      options={options}
      placeholder="e.g. HTML"
    />
    <div style={{ marginTop: '10px' }} />
    <Text style="BodySmall">Error</Text>
    <div style={{ marginTop: '10px' }} />
    <DropdownSearch
      label="Select your Category"
      onChange={action('clicked')}
      error="required field"
      options={options}
      placeholder="e.g. HTML"
    />
  </div>
));

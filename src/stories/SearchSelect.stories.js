import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchSelect, Text } from 'components';

const options = [
  { value: 'React', name: 'React' },
  { value: 'Javascript', name: 'Javascript' },
  { value: 'CSS', name: 'CSS' }
];

storiesOf('SearchSelect', module).add('SearchSelect', () => (
  <div style={{ width: '200px', marginLeft: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <SearchSelect
      label="Select your Category"
      labelKey="name"
      onChange={action('clicked')}
      options={options}
      placeholder="e.g. HTML"
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <SearchSelect
      disabled
      labelKey="name"
      label="Select your Category"
      onChange={action('clicked')}
      options={options}
      placeholder="e.g. HTML"
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Optional</Text>
    <div style={{ marginTop: '10px' }} />
    <SearchSelect
      label="Select your Category"
      labelKey="name"
      onChange={action('clicked')}
      optional
      options={options}
      placeholder="e.g. HTML"
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Error</Text>
    <div style={{ marginTop: '10px' }} />
    <SearchSelect
      label="Select your Category"
      labelKey="name"
      onChange={action('clicked')}
      error="required field"
      options={options}
      placeholder="e.g. HTML"
    />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Creatable</Text>
    <div style={{ marginTop: '10px' }} />
    <SearchSelect
      label="Select your Category"
      creatable
      labelKey="name"
      onChange={action('clicked')}
      options={options}
      placeholder="e.g. HTML"
    />
  </div>
));

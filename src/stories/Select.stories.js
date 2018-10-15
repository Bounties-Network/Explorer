import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Select, Text } from 'components';

const options = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'CSS', label: 'CSS' }
];

storiesOf('Select', module).add('Select', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Search
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Search components allow you to create a customizable select input.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      options
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>options</code> prop will take an array to render the
      information. Each array value must be an object with the keys
      <code>label</code> and <code>value</code>. <br />
      You can customize the label key using the prop <code>labelKey</code>. Its
      default value is <code>label</code>. <br />
      You can customize the value key using the prop <code>valueKey</code>. Its
      default value is <code>value</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Select options={options} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      label
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>label</code> prop will determine the label of the select input.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Select options={options} label="I am the label" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      placeholder
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>placeholder</code> prop will determine the placeholder of the
      input.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Select
        options={options}
        label="I am the label"
        placeholder="Select one"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      disabled
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>disabled</code> prop will determine if the user can change the
      state of the input.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Select options={options} placeholder="Select one" disabled />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      error
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>error</code> prop will change the color of the borders and
      display an error message.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Select
        options={options}
        placeholder="Select one"
        error="Something went wrong"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      optional
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>optional</code> prop will sufix your label with "(Optional)"
    </Text>

    <div class="sb-component-group sb-button-group">
      <Select
        options={options}
        placeholder="Select one"
        label="This is the label"
        optional={true}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onChange
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onChange</code> prop is a function that will be fired when the
      user selects an option. The selected value will be passed as an argument.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Select
        options={options}
        placeholder="Select one"
        onChange={action('changed')}
      />
    </div>
  </div>
));

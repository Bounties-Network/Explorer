import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchSelect, Text } from 'components';

const options = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'CSS', label: 'CSS' }
];

storiesOf('SearchSelect', module).add('SearchSelect', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      SearchSelect
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      SearchSelect components allow you to create a Select input with an
      autocomplete option.
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

    <div className="sb-component-group sb-button-group">
      <SearchSelect options={options} />
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

    <div className="sb-component-group sb-button-group">
      <SearchSelect options={options} label="I am the label" />
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
      select input.
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect
        options={options}
        label="I am the label"
        placeholder="e.g React"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      value
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>value</code> prop will determine the selected values beforehand.
      It should be an array of values. This can only be changed programatically.
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect
        options={options}
        placeholder="e.g React"
        value={['React']}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      maxLength
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>maxLength</code> prop will determine the max length of the user
      input. The default value is <code>20</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect options={options} placeholder="e.g React" maxLength="5" />
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
      state of the select input
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect options={options} placeholder="e.g React" disabled />
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

    <div className="sb-component-group sb-button-group">
      <SearchSelect
        options={options}
        placeholder="e.g React"
        error="Something went wrong"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      single
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>single</code> prop will determine if the user can select more
      than one value. The default value is <code>false</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect options={options} placeholder="e.g React" single={true} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      creatable
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>creatable</code> prop will determine if the user can create new
      values. The default value is <code>false</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect
        options={options}
        placeholder="e.g React"
        creatable={true}
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
      The <code>optional</code> prop will prefix your label with "(Optional)"
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect
        options={options}
        placeholder="e.g React"
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
      user adds or removes a new option. The selected values will be passed as
      an array.
    </Text>

    <div className="sb-component-group sb-button-group">
      <SearchSelect
        options={options}
        placeholder="e.g React"
        onChange={action('changed')}
      />
    </div>
  </div>
));

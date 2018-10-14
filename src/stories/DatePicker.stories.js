import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import { DatePicker, Text } from 'components';

storiesOf('DatePicker', module).add('DatePicker', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      DatePicker
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      DatePicker components will allow the user to pick dates and times.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      showTimeSelect
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>showTimeSelect</code> prop determines whether the user can pick
      a time or not. The default value is <code>false</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker showTimeSelect />
      <br />
      <DatePicker />
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
      The <code>label</code> prop determines the label of the DatePicker
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker label="I am the label" />
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
      The <code>value</code> prop determines the default time of the DatePicker.
      It has to be a <code>moment</code> instance. The default value is the
      current date + 1 day.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker value={moment()} />
      <br />
      <DatePicker />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      minDate
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>minDate</code> prop determines the minimum date that the user is
      allowed to pick. This has to be a <code>moment</code> instance.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker value={moment().subtract(5, 'd')} value={moment()} />
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
      The <code>disabled</code> prop will determine whether the state of the
      DatePicker can be changed or not.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker disabled />
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
      The <code>error</code> prop will show an error message on mobile devices.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker error="I am the error" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onFocus
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onFocus</code> prop is a function that will be fired when the
      user focuses on the DatePicker. This only works for mobile devices.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker onFocus={action('focused')} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onBlur
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onBlur</code> prop is a function that will be fired when the
      user taps outside of the DatePicker. This only works for mobile devices.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker onBlur={action('blurred')} />
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
      user changes the date or time. The selected date and time will be passed
      as an argument.
    </Text>

    <div class="sb-component-group sb-button-group">
      <DatePicker onChange={action('changed')} />
    </div>

    <div style={{ marginTop: '10px' }} />
    <DatePicker showTimeSelect />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <DatePicker showTimeSelect disabled />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">No Timeframe</Text>
    <div style={{ marginTop: '10px' }} />
    <DatePicker />
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Label</Text>
    <div style={{ marginTop: '10px' }} />
    <DatePicker showTimeSelect label="Filter 1" />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Sort, Text } from 'components';

storiesOf('Sort', module).add('Sort', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Sort
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Sort components are excellent headers for tables that can show sorted
      content.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular Sort
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular Sort component displays a sort icon next to its inner HTML.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Sort>Name</Sort>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      active
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>active</code> will make the text bold, indicating that this is
      the column being sorted. The default value is <code>false</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Sort active>Name</Sort>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      defaultSort
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>defaultSort</code> will indicate if the default sort method is
      either ascending (<code>asc</code>) or descending (<code>desc</code>).
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex' }}
    >
      <Sort defaultSort="asc">Name</Sort>
      <Sort defaultSort="desc">Last name</Sort>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onSort
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onSort</code> prop is a function that will be fired whenever the
      user clicks on a Sort element. The new sort method will be passed as an
      argument.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex' }}
    >
      <Sort onSort={action('sorted')}>Name</Sort>
    </div>
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PageBanner, Text } from 'components';

storiesOf('PageBanner', module).add('PageBanner', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      PageBanner
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      PageBanner component can take any content and display it as dismissable at
      the top of a page. The containing page can hook into the close action to
      perform any necessary changes. The banner can be configured to not be
      dismissable. A wrapping class can be provided in order to match the
      content's width to the wrapper of the page's content.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Dismissability
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>dismissable</code> prop will determine whether the X button
      appears and the banner can be closed.
    </Text>

    <div class="sb-component-container">
      <PageBanner onClose={action('Banner dismissed')}>
        <Text>Some content</Text>
      </PageBanner>
    </div>

    <div class="sb-component-container">
      <PageBanner dismissable={false}>
        <Text>Some content</Text>
      </PageBanner>
    </div>
  </div>
));

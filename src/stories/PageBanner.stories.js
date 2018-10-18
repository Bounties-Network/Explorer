import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PageBanner, Text, Avatar } from 'components';

storiesOf('PageBanner', module).add('PageBanner', () => (
  <div>
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
        PageBanner component can take any content and display it as a
        dismissable section. The banner can be configured to not be dismissable.
        A wrapping class can be provided in order to match the content's width
        to the wrapper of the page's content. The banner will always fill the
        available width. The parent page can perform actions when the banner is
        closed by using the <code>onClose</code> prop. The banner close button
        by itself does not dismiss, but requires the <code>visible</code> prop
        to be set to false. Once a banner is dismissed it cannot be brought
        back.
      </Text>

      <Text
        className={'sb-component-group-subheading'}
        typeScale="h3"
        weight="fontWeight-bold"
      >
        Banner Sizing
      </Text>

      <Text
        className={'sb-component-group-description'}
        typeScale="Body"
        lineHeight="lineHeight-default"
      >
        The banner will change height appropriately based on the content.
      </Text>
    </div>

    <div class="sb-component-container">
      <PageBanner>
        <Text>Single line content</Text>
      </PageBanner>
    </div>

    <div class="sb-component-container">
      <PageBanner>
        <Text>A banner</Text>
        <Text>with more</Text>
        <Text>Content</Text>
      </PageBanner>
    </div>

    <div class="sb-component-container">
      <PageBanner>
        <Avatar
          size="large"
          border
          name="Simona Pop"
          img="https://i.imgur.com/lhTwRZY.png"
          address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        />
      </PageBanner>
    </div>

    <div class="sb-page-wrapper">
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
    </div>

    <div class="sb-component-container">
      <PageBanner>
        <Text>Dismissable banner</Text>
      </PageBanner>
    </div>

    <div class="sb-component-container">
      <PageBanner dismissable={false}>
        <Text>Non-dismissable banner</Text>
      </PageBanner>
    </div>

    <div class="sb-page-wrapper">
      <Text
        className={'sb-component-group-subheading'}
        typeScale="h3"
        weight="fontWeight-bold"
      >
        OnClose Callback
      </Text>

      <Text
        className={'sb-component-group-description'}
        typeScale="Body"
        lineHeight="lineHeight-default"
      >
        The <code>onClose</code> prop takes a function that will be called when
        the user dismisses the banner. A parent component can use this callback
        in order to set the <code>visible</code> prop to <code>false</code>
        in order to dismiss the banner visually.
      </Text>
    </div>

    <div class="sb-component-container">
      <PageBanner onClose={action('Banner dismissed')}>
        <Text>Action on banner dismiss</Text>
      </PageBanner>
    </div>

    <div class="sb-page-wrapper">
      <Text
        className={'sb-component-group-subheading'}
        typeScale="h3"
        weight="fontWeight-bold"
      >
        Content Width
      </Text>

      <Text
        className={'sb-component-group-description'}
        typeScale="Body"
        lineHeight="lineHeight-default"
      >
        The content width should match the width of the content on the page
        where it is displayed. This can be accomplished using the
        <code>wrapClass</code> prop to pass a class name which controls the
        width and edge padding of the content. By default the wrapClass is
        <code>pageWrapper</code>, but others can be used such as
        <code>pageWrapper-large</code> which matches the Explorer dashboard. By
        default on smaller screens the content is full width with 1rem edge
        padding matching other components.
      </Text>
    </div>

    <div class="sb-component-container">
      <PageBanner>
        <Text>Default wrap class</Text>
      </PageBanner>
    </div>

    <div class="sb-component-container">
      <PageBanner wrapClass={'pageWrapper-large'}>
        <Text>Larger wrap class</Text>
      </PageBanner>
    </div>
  </div>
));

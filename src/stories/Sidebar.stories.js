import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Sidebar, Text } from 'components';

storiesOf('Sidebar', module).add('Sidebar', () => (
  <div>
    <Sidebar defaultActiveTab="dashboard" onTabClick={action('clicked')}>
      <Sidebar.TabGroup>
        <Sidebar.TabIcon icon={['far', 'list-alt']} tabKey="explorer" />
        <Sidebar.TabIcon icon={['far', 'tachometer']} tabKey="dashboard" />
        <Sidebar.TabIcon icon={['far', 'trophy-alt']} tabKey="leaderboard" />
        <Sidebar.TabIcon icon={['far', 'user-alt']} tabKey="profile" />
      </Sidebar.TabGroup>
    </Sidebar>
    <div className="sb-page-wrapper">
      <Text
        className={'sb-component-group-heading'}
        typeScale="h1"
        color="purple"
        weight="fontWeight-bold"
      >
        Sidebar
      </Text>

      <Text
        className={'sb-component-group-description'}
        typeScale="Body"
        lineHeight="lineHeight-default"
      >
        The Sidebar component will render a fixed sidebar floating at the left
        of your page.
      </Text>

      <Text
        className={'sb-component-group-subheading'}
        typeScale="h3"
        weight="fontWeight-bold"
      >
        Regular Sidebar
      </Text>

      <Text
        className={'sb-component-group-description'}
        typeScale="Body"
        lineHeight="lineHeight-default"
      >
        A regular sidebar contains the subcomponent{' '}
        <code>Sidebar.TabGroup</code>, which contains several{' '}
        <code>SIdebar.TabIcon</code> subcomponents.
      </Text>

      <Text
        className={'sb-component-group-subheading'}
        typeScale="h3"
        weight="fontWeight-bold"
      >
        Sidebar props
      </Text>

      <Text
        className={'sb-component-group-description'}
        typeScale="Body"
        lineHeight="lineHeight-default"
      >
        The prop <code>defaultActiveTab</code> determines the tab that will be
        active when the user first loads the page. The user may change the tab
        later. <br />
        <br />
        The prop <code>activeTab</code> will set the current tab and can only be
        changed programatically. <br />
        <br />
        The prop <code>mobileVisible</code> will determine if the sidebar will
        be visible on mobile devices. <br />
        <br />
        The prop <code>onMobileHide</code> is a function that will be fired
        whenever the user closes the sidebar on mobile devices. The prop{' '}
        <code>onTabClick</code> is a function that will be fired whenever clicks
        on a tab link. The link will be passed as an argument.
      </Text>

      <Text
        className={'sb-component-group-subheading'}
        typeScale="h3"
        weight="fontWeight-bold"
      >
        Sidebar.TabIcon props
      </Text>

      <Text
        className={'sb-component-group-description'}
        typeScale="Body"
        lineHeight="lineHeight-default"
      >
        The prop <code>icon</code> determines the icon of that specific tab. It
        must be a font awesome icon, passed as an array (e.g{' '}
        <code>['far', 'user-alt']</code>). <br />
        <br />
        The prop <code>tabKey</code> the unique identifier for that specific tab
        and will be used as its link. (e.g <code>dashboard</code>). <br />
        <br />
      </Text>
    </div>
  </div>
));

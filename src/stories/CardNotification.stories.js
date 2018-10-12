import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CardNotification, Text } from 'components';

storiesOf('Card', module).add('CardNotification', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Card Notifications
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The CardNotification component will render a small card about a specific
      action in a notification-style. It accepts the prop{' '}
      <code>notificationData</code>, which must contain the following keys:
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>address</code> key, with the address of the person who made the
      action.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>action</code> key, with the action that was made.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>date</code> key, with the date of the action. This must be a
      string.
    </Text>

    <CardNotification
      notificationData={{
        address: '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r',
        action: 'Paid for a new car',
        date: 'Jan 29'
      }}
    />

    <CardNotification
      notificationData={{
        address: '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r',
        action: 'Bought a new house',
        date: 'Jan 31'
      }}
    />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CardNotification } from 'components';

const notificationData = [
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'Yesterday'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  }
];

const renderNotification = data => {
  return data.map(elem => {
    return <CardNotification notificationData={elem} />;
  });
};

storiesOf('CardNotification', module).add('CardNotification', () => (
  <div>{renderNotification(notificationData)}</div>
));

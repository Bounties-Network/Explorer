import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

import { Header } from 'components';

const notificationData = [
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on: Build a new dapp',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on: Build a new dapp',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on: Build a new dapp',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'Yesterday'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission on: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission on: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission on: Build a new dapp',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission: Build a new dapp',
    date: 'May 9'
  }
];

storiesOf('HeaderLoggedin', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Header', () => (
    <div style={{ backgroundColor: '#E0E0E0', height: '2000px' }}>
      <Header
        profilePic="https://i.imgur.com/lhTwRZY.png"
        loginStatus
        notifications={notificationData}
      />
    </div>
  ));

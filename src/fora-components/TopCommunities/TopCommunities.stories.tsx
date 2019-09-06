import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import TopCommunities from '.';

addDecorator(centered);

const communities = [
  {
    id: 'google',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'f • code',
    memberCount: 1274
  },
  {
    id: 'google',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'yowza',
    memberCount: 1274
  },
  {
    id: 'google',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'save mi',
    memberCount: 1274
  }
];

storiesOf('TopCommunities', module).add('Mi Fora', () => (
  <TopCommunities communities={communities} />
));

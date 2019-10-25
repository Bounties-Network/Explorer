import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import AvatarGroup from '.';
import mockAvatarGroupData from './mock-avatar-group-data';

addDecorator(centered);

storiesOf('AvatarGroup', module)
  .add('Mi Fora', () => (
    <AvatarGroup avatars={mockAvatarGroupData} href={'www.google.co.uk'} />
  )
)
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import YourBounties from '.';

addDecorator(centered);

storiesOf('YourBounties', module)
  .add('Mi Fora', () => {
  return (
    <YourBounties
      drafts={[]}
      active={[]}
      activeNotificationCount={4}
      draftsNotificationCount={4}
    />
  )
  })
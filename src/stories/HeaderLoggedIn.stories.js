import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

import { Header } from 'components';

storiesOf('HeaderLoggedin', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Header', () => (
    <Header
      profilePic="https://i.imgur.com/lhTwRZY.png"
      loginStatus
      notification
    />
  ));

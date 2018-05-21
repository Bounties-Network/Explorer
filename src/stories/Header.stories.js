import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Header } from 'components';

storiesOf('Header', module).add('Header', () => (
  <Header profilePic="https://i.imgur.com/lhTwRZY.png" />
));

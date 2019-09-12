import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Navbar from '.';

addDecorator(centered);

storiesOf('Navbar', module)
  .add('Logged In', () => <Navbar isLoggedIn={true} />)
  .add('Logged Out', () => <Navbar isLoggedIn={false} />);

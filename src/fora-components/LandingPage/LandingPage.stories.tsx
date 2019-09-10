import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import LandingPage from '.';

addDecorator(centered);

storiesOf('LandingPage', module).add('Mi Fora', () => <LandingPage />);

import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import IntroBanner from '.';

addDecorator(centered);

storiesOf('IntroBanner', module).add('Mi Fora', () => <IntroBanner />);

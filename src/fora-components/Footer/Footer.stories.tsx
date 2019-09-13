import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Footer from '.';

addDecorator(centered);

storiesOf('Footer', module).add('Mi Fora', () => <Footer />);

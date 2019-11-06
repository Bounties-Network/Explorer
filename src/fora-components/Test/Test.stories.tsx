import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Test from '.';

addDecorator(centered);

storiesOf('Test', module).add('Mi Fora', () => (
  <Test />
));

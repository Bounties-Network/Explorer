import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered';
import IntroBanner from 'fora-components/IntroBanner';

addDecorator(centered);

storiesOf('IntroBanner', module).add('Mi Fora', () => <IntroBanner />);

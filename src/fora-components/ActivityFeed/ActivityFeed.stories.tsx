import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import ActivityFeed from '.';

addDecorator(centered);

storiesOf('ActivityFeed', module).add('v0', () => <ActivityFeed />);

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Chip } from 'components';

storiesOf('Chip', module).add('Chip', () => (
  <div>
    <Chip>CSS</Chip>
    <Chip>React</Chip>
    <Chip>Javascript</Chip>
  </div>
));

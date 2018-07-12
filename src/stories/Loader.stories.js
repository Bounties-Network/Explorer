import React from 'react';

import { storiesOf } from '@storybook/react';

import { Loader } from 'components';

storiesOf('Loader', module).add('Loader', () => (
  <div>
    <div style={{ backgroundColor: 'blue', display: 'inline-block' }}>
      <Loader color="white" size="medium" />
    </div>
    <Loader color="blue" size="medium" />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';

import { Loader } from 'components';

storiesOf('Loader', module).add('Loader', () => (
  <div style={{ backgroundColor: 'blue', width: '100%', height: '800px' }}>
    <Loader color="blue" size="medium" />
    <Loader color="purple" size="medium" />
    <Loader color="orange" size="medium" />
    <Loader color="green" size="medium" />
    <Loader color="red" size="medium" />
    <Loader color="black" size="medium" />
    <Loader color="white" size="medium" />
    <Loader color="grey" size="medium" />
    <Loader color="lightGrey" size="medium" />
    <Loader color="darkGrey" size="medium" />
  </div>
));

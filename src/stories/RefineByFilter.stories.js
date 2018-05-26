import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RefineByFilter } from 'components';

storiesOf('RefineByFilter', module).add('RefineByFilter', () => (
  <div>
    <RefineByFilter onChange={e => console.log(e)} />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Search } from 'components';

storiesOf('Search', module).add('Search', () => (
  <div>
    <Search onChange={e => console.log(e)} />
  </div>
));

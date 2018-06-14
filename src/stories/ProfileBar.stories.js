import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ProfileBar } from 'components';

storiesOf('ProfileBar', module).add('ProfileBar', () => (
  <div>
    <ProfileBar />
  </div>
));

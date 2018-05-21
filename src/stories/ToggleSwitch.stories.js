import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ToggleSwitch } from 'components';

storiesOf('ToggleSwitch', module).add('ToggleSwitch', () => (
  <div>
    <ToggleSwitch offOption="Top Earners" onOption="Top Issuers" />
  </div>
));

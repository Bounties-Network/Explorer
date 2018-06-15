import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ModelViewer } from 'components';

storiesOf('ModelViewer', module).add('ModelViewer', () => (
  <div>
    <ModelViewer />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileUpload } from 'components';

storiesOf('FileUpload', module).add('FileUpload', () => (
  <div>
    <FileUpload onChange={action('changed')} />
  </div>
));

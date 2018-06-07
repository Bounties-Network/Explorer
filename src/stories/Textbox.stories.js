import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Textbox } from 'components';

storiesOf('Textbox', module).add('Textbox', () => (
  <div
    style={{ width: '315px', display: 'flex', justifyContent: 'space-between' }}
  >
    <Textbox onChange={e => console.log(e)} />
  </div>
));

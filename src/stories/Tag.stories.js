import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tag } from 'components';

storiesOf('Tag', module).add('Tag', () => (
  <div
    style={{ width: '315px', display: 'flex', justifyContent: 'space-between' }}
  >
    <Tag onXClick={action('clicked')}>CSS</Tag>
    <Tag onXClick={action('clicked')}>Javascript</Tag>
    <Tag onXClick={action('clicked')}>React</Tag>
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Rating, Text } from 'components';

storiesOf('Rating', module).add('Rating', () => (
  <div style={{ marginLeft: '20px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Rating Component with Default Value</Text>
    <div style={{ marginTop: '10px' }} />
    <Rating defaultValue={4} />
  </div>
));

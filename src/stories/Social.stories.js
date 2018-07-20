import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Social, Text } from 'components';

storiesOf('Social', module).add('Social', () => (
  <div style={{ margin: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Social Component</Text>
    <div style={{ marginTop: '10px' }} />
    <Social
      facebookLink="https://facebook.com"
      twitterLink="https://twitter.com"
      redditLink="https://reddit.com"
    />
  </div>
));

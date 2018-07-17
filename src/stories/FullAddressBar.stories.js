import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FullAddressBar, Button, Text } from 'components';

storiesOf('FullAddressBar', module).add('FullAddressBar', () => (
  <div>
    <Text type="H4">Address Bar (Copy to clipboard on click)</Text>
    <br />
    <FullAddressBar
      address={'0x1234567891011121314151617181920212223242'}
      copyButton
    />
  </div>
));

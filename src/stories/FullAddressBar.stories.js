import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FullAddressBar, Button, Text } from 'components';

storiesOf('FullAddressBar', module).add('FullAddressBar', () => (
  <div>
    <div>
      <Text style="H4">Just Address Bar</Text>
      <br />
      <br />
      <FullAddressBar address={'0x1234567891011121314151617181920212223242'} />
    </div>
    <br />
    <hr />
    <br />
    <div>
      <Text style="H4">Address Bar with Copy Button</Text>
      <br />
      <FullAddressBar
        address={'0x1234567891011121314151617181920212223242'}
        copyButton
      />
    </div>
  </div>
));

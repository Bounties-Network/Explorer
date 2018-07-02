import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Text } from 'components';

storiesOf('Text', module).add('All Texts', () => (
  <div>
    <div>
      <Text type="H4">H1 - 31px</Text>
      <br />
      <Text type="H1">The quick brown fox jumps over the lazy dog.!?</Text>
      <hr />
    </div>

    <div>
      <Text type="H4">H2 - 25px</Text>
      <br />
      <Text type="H2">The quick brown fox jumps over the lazy dog.!?</Text>
      <hr />
    </div>

    <div>
      <Text type="H4">H3 - 20px</Text>
      <br />
      <Text type="H3">The quick brown fox jumps over the lazy dog.!?</Text>
      <hr />
    </div>

    <div>
      <Text type="H4">H4 - 16px</Text>
      <br />
      <Text type="H4">The quick brown fox jumps over the lazy dog.!?</Text>
      <hr />
    </div>

    <div>
      <Text type="H4">Card Heading - 16px (1em)</Text>
      <br />
      <Text type="CardHeading">
        The quick brown fox jumps over the lazy dog.!?
      </Text>
      <hr />
    </div>

    <div>
      <Text type="H4">Body - 16px (1em)</Text>
      <br />
      <Text type="Body">The quick brown fox jumps over the lazy dog.!?</Text>
      <hr />
    </div>

    <div>
      <Text type="H4">Body Small - 14px</Text>
      <br />
      <Text type="BodySmall">
        The quick brown fox jumps over the lazy dog.!?
      </Text>
      <hr />
    </div>

    <div>
      <Text type="H4">Form Label / Metadata</Text>
      <br />
      <Text type="FormLabel">
        The quick brown fox jumps over the lazy dog.!?
      </Text>
      <hr />
    </div>

    <div>
      <Text type="H4">Form Invalid - 14px</Text>
      <br />
      <Text type="FormInvalid">
        The quick brown fox jumps over the lazy dog.!?
      </Text>
      <hr />
    </div>

    <div>
      <Text type="H4">Alt Label - 12px</Text>
      <br />
      <Text type="Alt">The quick brown fox jumps over the lazy dog.!?</Text>
      <hr />
    </div>

    <div>
      <Text type="H4">Link - Body</Text>
      <br />
      <Text link src="http://google.com" type="Body">
        The quick brown fox jumps over the lazy dog.!?
      </Text>
      <hr />
    </div>
  </div>
));

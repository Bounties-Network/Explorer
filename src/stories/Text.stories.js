import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Text } from 'components';

storiesOf('Text', module)
  .add('All Texts', () => (
    <div>
      <div>
        <Text style="H4">H1 - 31px</Text>
        <br />
        <Text style="H1">The quick brown fox jumps over the lazy dog.!?</Text>
        <hr />
      </div>

      <div>
        <Text style="H4">H2 - 25px</Text>
        <br />
        <Text style="H2">The quick brown fox jumps over the lazy dog.!?</Text>
        <hr />
      </div>

      <div>
        <Text style="H4">H3 - 20px</Text>
        <br />
        <Text style="H3">The quick brown fox jumps over the lazy dog.!?</Text>
        <hr />
      </div>

      <div>
        <Text style="H4">H4 - 16px</Text>
        <br />
        <Text style="H4">The quick brown fox jumps over the lazy dog.!?</Text>
        <hr />
      </div>

      <div>
        <Text style="H4">Card Heading - 16px (1em)</Text>
        <br />
        <Text style="CardHeading">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
        <hr />
      </div>

      <div>
        <Text style="H4">Body - 16px (1em)</Text>
        <br />
        <Text style="Body">The quick brown fox jumps over the lazy dog.!?</Text>
        <hr />
      </div>

      <div>
        <Text style="H4">Body Small - 14px</Text>
        <br />
        <Text style="BodySmall">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
        <hr />
      </div>

      <div>
        <Text style="H4">Form Label / Metadata</Text>
        <br />
        <Text style="FormLabel">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
        <hr />
      </div>

      <div>
        <Text style="H4">Form Invalid - 14px</Text>
        <br />
        <Text style="FormInvalid">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
        <hr />
      </div>

      <div>
        <Text style="H4">Alt Label - 12px</Text>
        <br />
        <Text style="Alt">The quick brown fox jumps over the lazy dog.!?</Text>
        <hr />
      </div>

      <div>
        <Text style="H4">Link - Body</Text>
        <br />
        <Text link src="http://google.com" style="Body">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
        <hr />
      </div>
    </div>
  ))
  .add('H1', () => (
    <Text style="H1">The quick brown fox jumps over the lazy dog.!?</Text>
  ))
  .add('H2', () => (
    <Text style="H2">The quick brown fox jumps over the lazy dog.!?</Text>
  ))
  .add('H3', () => (
    <Text style="H3">The quick brown fox jumps over the lazy dog.!?</Text>
  ))
  .add('H4', () => (
    <Text style="H4">The quick brown fox jumps over the lazy dog.!?</Text>
  ))
  .add('Card Heading', () => (
    <Text style="CardHeading">
      The quick brown fox jumps over the lazy dog.!?
    </Text>
  ))
  .add('Body', () => (
    <Text style="Body">The quick brown fox jumps over the lazy dog.!?</Text>
  ))
  .add('Body Small', () => (
    <Text style="BodySmall">
      The quick brown fox jumps over the lazy dog.!?
    </Text>
  ))
  .add('Form Label / Metadata', () => (
    <Text style="FormLabel">
      The quick brown fox jumps over the lazy dog.!?
    </Text>
  ))
  .add('Form Invalid', () => (
    <Text style="FormInvalid">
      The quick brown fox jumps over the lazy dog.!?
    </Text>
  ))
  .add('Alt', () => (
    <Text style="Alt">The quick brown fox jumps over the lazy dog.!?</Text>
  ))
  .add('Link / Anchor Tag', () => (
    <Text link src="http://google.com" style="Body">
      The quick brown fox jumps over the lazy dog.!?
    </Text>
  ));

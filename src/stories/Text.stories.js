import React from 'react';
import styles from '../styles/storybook.scss';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Text } from 'components';

storiesOf('Text', module).add('All Texts', () => (
  <div class="sb-page-wrapper">
    <div class="sb-component-group">
      <div class="sb-component-container">
        <Text typeScale="h1">Heading 1</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h2">Heading 2</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h3">Heading 3</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h4">Heading 4</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h4">Heading 5</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="Body">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="Small">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
      </div>

      <div class="sb-component-container">
        <Text link src="http://google.com" typeScale="Body">
          The quick brown fox jumps over the lazy dog.!?
        </Text>
      </div>
    </div>
  </div>
));

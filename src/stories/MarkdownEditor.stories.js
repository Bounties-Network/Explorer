import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MarkdownEditor, Text } from 'components';

storiesOf('MarkdownEditor', module).add('MarkdownEditor', () => (
  <div style={{ margin: '10px', width: '500px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text type="BodySmall">Markdown Editor</Text>
    <div style={{ marginTop: '10px' }} />
    <div style={{ height: '200px' }}>
      <MarkdownEditor />
    </div>
  </div>
));

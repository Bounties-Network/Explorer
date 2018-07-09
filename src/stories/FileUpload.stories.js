import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FileUpload, Text } from 'components';

storiesOf('FileUpload', module).add('FileUpload', () => (
  <div style={{ margin: '10px' }}>
    <div style={{ marginTop: '10px' }} />
    <Text inputLabel>Regular</Text>
    <div style={{ marginTop: '10px' }} />
    <FileUpload />
    <div style={{ marginTop: '10px' }} />
    <Text inputLabel>Disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <FileUpload disabled />
    <div style={{ marginTop: '10px' }} />
    <Text inputLabel>Disabled With Text</Text>
    <div style={{ marginTop: '10px' }} />
    <FileUpload filename="Corwin.jpg" filesize={23423} disabled />
    <div style={{ marginTop: '10px' }} />
    <Text inputLabel>Loading</Text>
    <div style={{ marginTop: '10px' }} />
    <FileUpload filename="Corwin.jpg" filesize={23423} disabled loading />
  </div>
));

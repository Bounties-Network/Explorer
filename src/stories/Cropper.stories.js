import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Cropper, Text } from 'components';

storiesOf('Cropper', module).add('Cropper', () => (
  <div className="container">
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Croppie Element</Text>
    <div style={{ marginTop: '10px' }} />
    <Cropper />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <Cropper disabled />
  </div>
));

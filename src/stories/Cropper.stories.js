import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Cropper, Text } from 'components';

storiesOf('Cropper', module).add('Cropper', () => (
  <div className="container">
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Cropper Element</Text>
    <div style={{ marginTop: '10px' }} />
    <Cropper />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">disabled</Text>
    <div style={{ marginTop: '10px' }} />
    <Cropper disabled />
    <div style={{ marginTop: '10px' }} />
    <Text type="H3">Image Uploaded</Text>
    <div style={{ marginTop: '10px' }} />
    <Cropper src="https://i.imgur.com/lhTwRZY.png" />
  </div>
));

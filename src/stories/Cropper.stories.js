import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Cropper, Text } from 'components';

import { withKnobs, select, text, boolean } from '@storybook/addon-knobs/react';
import centered from '@storybook/addon-centered/react';

addDecorator(centered);

storiesOf('Cropper', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Cropper
      src={text('image url', null)}
      loading={boolean('loading', false)}
      disabled={boolean('disabled', false)}
    />
  ))
  .add('with image', () => (
    <Cropper
      src={text(
        'image url',
        'https://pbs.twimg.com/profile_images/1072179707444121600/50RLMfXF_400x400.jpg'
      )}
      loading={boolean('loading', false)}
      disabled={boolean('disabled', false)}
    />
  ));

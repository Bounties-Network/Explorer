import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import centered from '@storybook/addon-centered';

import { Avatar } from 'components';

addDecorator(centered);
addDecorator(withKnobs);

storiesOf('Avatar', module).add('User', () => (
  <Avatar
    textFormat={text('textFormat', 'block')}
    size={text('size', 'medium')}
    name={text('name', 'Simona Pop')}
    img={text('img', 'https://i.imgur.com/lhTwRZY.png')}
    address={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
  />
));

storiesOf('Avatar', module).add('Community', () => (
  <Avatar
    type="community"
    size={text('size', 'medium')}
    name={text('name', 'f • Social Impact')}
    img={text(
      'img',
      'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3367&q=80'
    )}
  />
));

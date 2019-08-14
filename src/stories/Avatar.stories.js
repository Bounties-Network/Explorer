import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';
import centered from '@storybook/addon-centered';

import { Avatar } from 'components';

addDecorator(centered);

storiesOf('Avatar', module).add('with name and address', () => (
  <Avatar
    name={text('name', 'Simona Pop')}
    img={text('img', 'https://i.imgur.com/lhTwRZY.png')}
    address={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
    size="small"
    variant="avatarType.community"
  />
));

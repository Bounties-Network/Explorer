import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs/react';
import centered from '@storybook/addon-centered';

import { Avatar, Text } from 'components';

addDecorator(centered);

storiesOf('Avatar', module)
  .addDecorator(withKnobs)
  .add('with name and address', () => (
    <Avatar
      size={select(
        'size',
        { small: 'small', medium: 'medium', large: 'large' },
        'large'
      )}
      border={boolean('border', true)}
      name={text('name', 'Simona Pop')}
      img={text('img', 'https://i.imgur.com/lhTwRZY.png')}
      address={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
    />
  ))
  .add('image only', () => (
    <Avatar
      size={select(
        'size',
        { small: 'small', medium: 'medium', large: 'large' },
        'large'
      )}
      border={boolean('border', true)}
      img={text('img', 'https://i.imgur.com/lhTwRZY.png')}
    />
  ))
  .add('custom text style', () => (
    <Avatar
      size={select(
        'size',
        { small: 'small', medium: 'medium', large: 'large' },
        'large'
      )}
      border={boolean('border', true)}
      img={text('img', 'https://i.imgur.com/lhTwRZY.png')}
      name={text('name', 'Simona Pop')}
      nameTextColor={text('name color', 'blue')}
      nameTextScale={text('name size', 'h1')}
      nameTextWeight={text('name weight', 'fontWeight-regular')}
      address={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
      addressTextColor={text('address color', 'black')}
      addressTextScale={text('address size', 'Small')}
      addressTextWeight={text('address weight', 'fontWeight-medium')}
    />
  ))

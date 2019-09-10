import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import Avatar from 'components/Avatar';

addDecorator(centered);
addDecorator(withKnobs);

storiesOf('Avatar', module)
  .add('User with name', () => (
    <Avatar
      resourceType="user"
      textFormat={text('textFormat', 'block') as 'block'}
      variant={text('variant', 'medium') as 'medium'}
      name={text('name', 'Simona Pop')}
      img={text('img', 'https://i.imgur.com/lhTwRZY.png')}
      address={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
      src={text('src', 'https://www.google.co.uk')}
      onClick={() => {}}
      hash={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
      onDark={false}
    />
  ))
  .add('User without name', () => (
    <Avatar
      resourceType="user"
      textFormat={text('textFormat', 'block') as 'block'}
      variant={text('variant', 'medium') as 'medium'}
      img={text('img', 'https://i.imgur.com/lhTwRZY.png')}
      address={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
      name={undefined}
      src={text('src', 'https://www.google.co.uk')}
      onClick={() => {}}
      hash={text('address', '0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r')}
      onDark={false}
    />
  ));

storiesOf('Avatar', module).add('Community', () => (
  <Avatar
    resourceType="community"
    variant={text('variant', 'medium') as 'medium'}
    name={text('name', 'f • Social Impact')}
    img={text(
      'img',
      'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3367&q=80'
    )}
    onDark={false}
  />
));

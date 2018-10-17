import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Avatar, Text } from 'components';

storiesOf('Avatar', module).add('Avatar', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Avatar
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Avatar components take props to display beautiful avatars. You can
      customize the avatar and surrounding information such as name and address.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Image
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>img</code> prop will determine the image to be displayed.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar size="large" img="https://i.imgur.com/lhTwRZY.png" />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>hash</code> prop will create an image based on the hash.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar size="large" hash="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r" />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>size</code> prop will determine the size of the image. It can be
      <code>small</code>, <code>medium</code> or <code>large</code>. The default
      is <code>small</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar size="small" img="https://i.imgur.com/lhTwRZY.png" />
      <br />
      <Avatar size="medium" img="https://i.imgur.com/lhTwRZY.png" />
      <br />
      <Avatar size="large" img="https://i.imgur.com/lhTwRZY.png" />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>border</code> prop is a boolean that will determine whether the
      image will have a border or not. The default value is <code>false</code>.
    </Text>

    <div
      class="sb-component-group sb-button-group"
      style={{ backgroundColor: '#EEE' }}
    >
      <Avatar
        size="medium"
        img="https://i.imgur.com/lhTwRZY.png"
        border={true}
      />
      <br />
      <Avatar
        size="medium"
        img="https://i.imgur.com/lhTwRZY.png"
        border={false}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Name
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>name</code> prop will determine the name of the person
      represented in the avatar.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
      />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>nameTextScale</code> prop will determine the size of the name.
      It can go from <code>h1</code> to <code>h5</code> or be <code>Body</code>
      or <code>Small</code>. The default value is <code>h3</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="small"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="Small"
      />
      <br />
      <Avatar
        size="medium"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="h3"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="h1"
      />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>nameTextColor</code> prop will determine the color of the name.
      It can be <code>purple</code>, <code>blue</code>, <code>orange</code>,
      <code>green</code>, <code>red</code>, <code>black</code>,
      <code>white</code>, <code>defaultGrey</code>, <code>lightGrey</code> or
      <code>darkGrey</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="small"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="Small"
        nameTextColor="purple"
      />
      <br />
      <Avatar
        size="medium"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="h3"
        nameTextColor="green"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="h1"
        nameTextColor="red"
      />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>nameTextWeight</code> prop will determine the weight of the text
      in the name. It can be <code>fontWeight-regular</code>,
      <code>fontWeight-medium</code> or <code>fontWeight-bold</code>. The
      default value is <code>fontWeight-bold</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextWeight="fontWeight-regular"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextWeight="fontWeight-medium"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Address
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>address</code> prop will determine the address of the person
      represented in the avatar.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
      />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>addressTextScale</code> prop will determine the size of the
      address. It can go from <code>h1</code> to <code>h5</code> or be
      <code>Body</code> or <code>Small</code>. The default is value{' '}
      <code>Body</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="small"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="Small"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        addressTextScale="Small"
      />
      <br />
      <Avatar
        size="medium"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="h3"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        addressTextScale="h5"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        nameTextScale="h1"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        addressTextScale="h3"
      />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>addressTextColor</code> prop will determine the color of the
      address. It can be <code>purple</code>, <code>blue</code>,
      <code>orange</code>, <code>green</code>, <code>red</code>,
      <code>black</code>, <code>white</code>, <code>defaultGrey</code>,
      <code>lightGrey</code> or <code>darkGrey</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        addressTextColor="red"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        addressTextColor="green"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        addressTextColor="blue"
      />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>src</code> prop will determine the link of the address. If not
      passed, it will link to <code>{'profile/{address}'}</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        src="https://www.google.com/"
      />
      <br />
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
      />
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onClick</code> prop is a function that will be executed when the
      address is clicked.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Avatar
        size="large"
        img="https://i.imgur.com/lhTwRZY.png"
        name="Simona Pop"
        address="0xe68f8C6AB137ecDGD5cbf131f74A584aD2fG294r"
        onClick={action('clicked')}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Misc
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>className</code> prop is a string that contains classes to be
      added to the root div of the avatar.
    </Text>
  </div>
));

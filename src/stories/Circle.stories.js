import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Circle, Text } from 'components';

storiesOf('Circle', module).add('All Circles', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Circles
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Circle components are a great way to represent content using circles.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Type
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>type</code> prop will determine the type of the circle. It can
      be <code>text</code>, <code>img</code>, <code>blocky</code> or{' '}
      <code>loading</code>. The default value is <code>text</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Circle
        type="text"
        size="medium"
        color="orange"
        textColor="white"
        input="Circle"
      />
      <br />
      <Circle
        type="img"
        size="medium"
        input="https://i.imgur.com/lhTwRZY.png"
      />
      <br />
      <Circle type="blocky" size="medium" />
      <br />
      <Circle type="loading" color="orange" size="medium" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Size
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>size</code> prop will determine the size of the circle. It can
      be <code>small</code>, <code>medium</code> or <code>large</code>. The
      default value is <code>small</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Circle
        type="text"
        size="small"
        color="orange"
        textColor="white"
        input="One"
      />
      <br />
      <Circle
        type="text"
        size="medium"
        color="orange"
        textColor="white"
        input="Two"
      />
      <br />
      <Circle
        type="text"
        size="large"
        color="orange"
        textColor="white"
        input="Three"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Input
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>input</code> prop will determine the content inside the circle.
      For <code>text</code> circles, this will be the text. For{' '}
      <code>images</code>, this will be the image source or link. For{' '}
      <code>blocky</code> and <code>loading</code>, this is not required.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Circle
        type="text"
        size="large"
        color="orange"
        textColor="white"
        input="Text"
      />
      <br />
      <Circle type="img" size="large" input="https://i.imgur.com/lhTwRZY.png" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Border
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>border</code> prop is a boolean that will determine whether the
      circle will have a border or not. The default value is <code>false</code>.
    </Text>

    <div
      class="sb-component-group sb-button-group"
      style={{ backgroundColor: '#EEE' }}
    >
      <Circle
        type="text"
        size="medium"
        color="orange"
        textColor="white"
        input="Circle"
        border={true}
      />
      <br />
      <Circle
        type="img"
        size="medium"
        input="https://i.imgur.com/lhTwRZY.png"
        border={true}
      />
      <br />
      <Circle type="blocky" size="medium" border={true} />
      <br />
      <Circle type="loading" color="orange" size="medium" border={true} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Color
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>color</code> will determine the background of <code>text</code>{' '}
      and <code>loading</code> circles. It can be <code>orange</code>,{' '}
      <code>green</code>, <code>red</code>, <code>lightGrey</code>,{' '}
      <code>white</code> or <code>nearWhite</code>. The default value is{' '}
      <code>white</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Circle
        type="text"
        color="orange"
        size="medium"
        input="Orange"
        textSize="h6"
      />
      <br />
      <Circle
        type="text"
        color="green"
        size="medium"
        input="Green"
        textSize="h6"
      />
      <br />
      <Circle type="text" color="red" size="medium" input="Red" textSize="h6" />
      <br />
      <Circle type="loading" color="lightGrey" size="medium" />
      <br />
      <Circle type="loading" color="white" size="medium" />
      <br />
      <Circle type="loading" color="nearWhite" size="medium" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      textColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>textColor</code> will determine the color of the text inside the
      circle. It can be <code>purple</code>, <code>blue</code>,{' '}
      <code>orange</code>, <code>green</code>, <code>red</code>,{' '}
      <code>black</code>, <code>white</code>, <code>defaultGrey</code>,{' '}
      <code>lightGrey</code>, <code>darkGrey</code>. The default value is{' '}
      <code>black</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Circle
        type="text"
        color="nearWhite"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="purple"
      />
      <br />
      <Circle
        type="text"
        color="nearWhite"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="blue"
      />
      <br />
      <Circle
        type="text"
        color="nearWhite"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="orange"
      />
      <br />
      <Circle
        type="text"
        color="nearWhite"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="green"
      />
      <br />
      <Circle
        type="text"
        color="nearWhite"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="red"
      />
      <br />
      <Circle
        type="text"
        color="nearWhite"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="black"
      />
      <br />
      <Circle
        type="text"
        color="red"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="lightGrey"
      />
      <br />
      <Circle
        type="text"
        color="red"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="white"
      />
      <br />
      <Circle
        type="text"
        color="orange"
        size="medium"
        input="Text"
        textSize="h6"
        textColor="darkGrey"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      className
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>className</code> prop contains a string of classes that will be
      added to the root div of the Circle. This can be useful to add your own
      styles to the circle.
    </Text>
  </div>
));

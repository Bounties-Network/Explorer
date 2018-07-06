import React from 'react';
import styles from '../styles/storybook.scss';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Text } from 'components';

storiesOf('Text', module).add('All Texts', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      weight="fontWeight-bold"
    >
      Typography
    </Text>
    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Typographic components take props to define scale, line-height, color,
      weight, text-decoration, and alignment. These can all be combined to
      create a variety of typographic treatments to fit the demands of the
      interface.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Typographic Scale
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The typeScale prop will define a font-size for the given text component
      based on our typographic scale.
    </Text>

    <div class="sb-component-group">
      <div class="sb-component-container">
        <Text typeScale="h1">Heading 1</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h2">Heading 2</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h3">Heading 3</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h4">Heading 4</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h4">Heading 5</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="Body">Body copy</Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="Small">Small body copy & labels</Text>
      </div>

      <div class="sb-component-container">
        <Text link src="http://google.com" typeScale="Body">
          Link
        </Text>
      </div>
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
      The color prop will define a color for the given text component based on
      our brands color variables.
    </Text>

    <div class="sb-component-group">
      <div class="sb-component-container">
        <Text typeScale="h3" color="black">
          Darkest grey
        </Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="Body" color="darkGrey">
          Body text grey
        </Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="Body" color="blue">
          Link blue
        </Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="Body" color="red">
          Destructuve red
        </Text>
      </div>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Weight
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The weight prop will define a font-weight for the given text component. We
      use one of 3 weights for our UI typography: regular, medium, and bold.
    </Text>

    <div class="sb-component-group">
      <div class="sb-component-container">
        <Text typeScale="h3" weight="fontWeight-regular">
          Regular
        </Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h3" weight="fontWeight-medium">
          Medium
        </Text>
      </div>

      <div class="sb-component-container">
        <Text typeScale="h3" weight="fontWeight-bold">
          Bold
        </Text>
      </div>
    </div>
  </div>
));

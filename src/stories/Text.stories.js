import React from 'react';
import styles from '../styles/storybook.scss';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Text } from 'components';

storiesOf('Text', module).add('All Texts', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
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
      weight, alignment, and style. These can all be combined to create a
      variety of typographic treatments to fit the demands of the interface. Our
      UI uses the typeface{' '}
      <Text link src="https://rsms.me/inter/">
        Inter UI
      </Text>{' '}
      created by{' '}
      <Text link src="https://twitter.com/rsms">
        Rasmus Andersson
      </Text>.
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
      The <code>typeScale</code> prop will define a font-size for the given text
      component based on our typographic scale.
    </Text>

    <div className="sb-component-group">
      <div className="sb-component-container">
        <Text typeScale="h1">Heading 1</Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="h2">Heading 2</Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="h3">Heading 3</Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="h4">Heading 4</Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="h4">Heading 5</Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body">Body copy & Large labels</Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Small">Metadata & small labels</Text>
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
      The <code>color</code> prop will define a color for the given text
      component based on our brands color variables.
    </Text>

    <div className="sb-component-group">
      <div className="sb-component-container">
        <Text typeScale="h3" color="black">
          black
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" color="darkGrey">
          darkGrey
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" color="blue">
          blue
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" color="red">
          red
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
      The <code>weight</code> prop will define a font-weight for the given text
      component. We use one of 3 weights for our UI typography: regular, medium,
      and bold.
    </Text>

    <div className="sb-component-group">
      <div className="sb-component-container">
        <Text typeScale="Body" weight="fontWeight-regular">
          Regular
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" weight="fontWeight-medium">
          Medium
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" weight="fontWeight-bold">
          Bold
        </Text>
      </div>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Alignment
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>alignment</code> prop will define left, centered, or right
      text-alignment for the given text component.
    </Text>

    <div className="sb-component-group">
      <div className="sb-component-container">
        <Text typeScale="Body" alignment="align-left">
          Left align
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" alignment="align-center">
          Center align
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" alignment="align-right">
          Right align
        </Text>
      </div>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Style
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>style</code> prop will apply certain CSS text-decoration,
      font-style, and text-transforms for the given text component. This can be
      used to add or remove underline, uppercase, and italic properties to
      individual text components.
    </Text>

    <div className="sb-component-group">
      <div className="sb-component-container">
        <Text typeScale="Body" style="underline">
          Underline
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" style="italic">
          Italic
        </Text>
      </div>

      <div className="sb-component-container">
        <Text typeScale="Body" style="uppercase">
          Uppercase
        </Text>
      </div>
    </div>
  </div>
));

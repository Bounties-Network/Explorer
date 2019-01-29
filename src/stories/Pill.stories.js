import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Pill, Text } from 'components';

storiesOf('Pill', module).add('All Pills', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Pill
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Pill components can be used to represent small blocks of information.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular Pills
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The content of the pills will go inside their inner HTML.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex' }}
    >
      <Pill>HTML</Pill>
      <Pill>CSS</Pill>
      <Pill>Javascript</Pill>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      type
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>type</code> prop will determine the type of the pill. It can be{' '}
      <code>round</code> or <code>rectangle</code>. The default value is{' '}
      <code>round</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <Pill>HTML</Pill>
        <Pill>CSS</Pill>
        <Pill>Javascript</Pill>
      </div>
      <div style={{ display: 'flex' }}>
        <Pill type="rectangle">HTML</Pill>
        <Pill type="rectangle">CSS</Pill>
        <Pill type="rectangle">Javascript</Pill>
      </div>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      close
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>close</code> prop will determine if the pill can be closed. The
      default value is <code>false</code>.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex', marginBottom: 10 }}
    >
      <Pill close>HTML</Pill>
      <Pill close>CSS</Pill>
      <Pill close>Javascript</Pill>
    </div>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Clicking the close button won't make the pill disappear. To achieve this,
      take a look at the <code>onCloseClick</code> prop.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      noBorder
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>noBorder</code> prop will determine if the pill will not have a
      border. The default value is <code>false</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <Pill>HTML</Pill>
        <Pill>CSS</Pill>
        <Pill>Javascript</Pill>
      </div>
      <div style={{ display: 'flex' }}>
        <Pill noBorder>HTML</Pill>
        <Pill noBorder>CSS</Pill>
        <Pill noBorder>Javascript</Pill>
      </div>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      backgroundColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>backgroundColor</code> prop will determine the background color
      of the pill. The default value is <code>white</code>.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex', marginBottom: 10 }}
    >
      <Pill backgroundColor="purple" textColor="black">
        purple
      </Pill>
      <Pill backgroundColor="blue" textColor="black">
        blue
      </Pill>
      <Pill backgroundColor="orange" textColor="black">
        orange
      </Pill>
      <Pill backgroundColor="red" textColor="black">
        red
      </Pill>
      <Pill backgroundColor="blue" textColor="black">
        blue
      </Pill>
      <Pill backgroundColor="nearWhite" textColor="black">
        nearWhite
      </Pill>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      hoverBackgroundColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>hoverBackgroundColor</code> prop will determine the background
      color of the pill when the user hovers it. It can be <code>white</code> or{' '}
      <code>nearWhite</code>.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex', marginBottom: 10 }}
    >
      <Pill textColor="black" hoverBackgroundColor="nearWhite">
        HTML
      </Pill>
      <Pill textColor="black" hoverBackgroundColor="nearWhite">
        CSS
      </Pill>
      <Pill textColor="black" hoverBackgroundColor="nearWhite">
        Javascript
      </Pill>
      <Pill textColor="black" hoverBackgroundColor="nearWhite">
        Typescript
      </Pill>
      <Pill textColor="black" hoverBackgroundColor="nearWhite">
        jQuery
      </Pill>
      <Pill textColor="black" hoverBackgroundColor="nearWhite">
        React
      </Pill>
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
      The <code>textColor</code> prop will determine the color of the text of
      the pill. It can be <code>white</code> or <code>nearWhite</code>.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex', marginBottom: 10 }}
    >
      <Pill textColor="purple">purple</Pill>
      <Pill textColor="orange">orange</Pill>
      <Pill textColor="red">red</Pill>
      <Pill textColor="black">black</Pill>
      <Pill textColor="blue">blue</Pill>
      <Pill textColor="green">green</Pill>
      <Pill backgroundColor="red" textColor="white">
        white
      </Pill>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      borderColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>borderColor</code> prop will determine the color of the border
      of the pill. It can be <code>white</code> or <code>lightGret</code>. The
      default value is <code>lightGrey</code>.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex', marginBottom: 10, backgroundColor: '#212121' }}
    >
      <Pill borderColor="lightGrey" textColor="white">
        C
      </Pill>
      <Pill borderColor="lightGrey" textColor="white">
        C++
      </Pill>
      <Pill borderColor="lightGrey" textColor="white">
        C#
      </Pill>
      <Pill borderColor="white" textColor="white">
        Java
      </Pill>
      <Pill borderColor="white" textColor="white">
        Swift
      </Pill>
      <Pill borderColor="white" textColor="white">
        Objective C
      </Pill>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onClick
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onClick</code> prop is a function that will be fired whenever
      the user clicks on the pill.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex', marginBottom: 10 }}
    >
      <Pill onClick={action('clicked')}>C</Pill>
      <Pill onClick={action('clicked')}>C++</Pill>
      <Pill onClick={action('clicked')}>C#</Pill>
      <Pill onClick={action('clicked')}>Java</Pill>
      <Pill onClick={action('clicked')}>Swift</Pill>
      <Pill onClick={action('clicked')}>Objective C</Pill>
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onCloseClick
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onCloseClick</code> prop is a function that will be fired
      whenever the user clicks on the close button. Bear in mind that the close
      button will only appear if the <code>close</code> prop is passed.
    </Text>

    <div
      className="sb-component-group sb-button-group"
      style={{ display: 'flex', marginBottom: 10 }}
    >
      <Pill close onClick={action('clicked')}>
        C
      </Pill>
      <Pill close onClick={action('clicked')}>
        C++
      </Pill>
      <Pill close onClick={action('clicked')}>
        C#
      </Pill>
      <Pill close onClick={action('clicked')}>
        Java
      </Pill>
      <Pill close onClick={action('clicked')}>
        Swift
      </Pill>
      <Pill close onClick={action('clicked')}>
        Objective C
      </Pill>
    </div>
  </div>
));

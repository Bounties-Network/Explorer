import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Switch, Text } from 'components';

storiesOf('Switch', module).add('Switch', () => (
  <div class="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Switch
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Switch components are special checkboxes for two states, but not limited
      to on / off.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Regular Switch
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      A regular Switch contains the props <code>offValue</code> and{' '}
      <code>onValue</code> for the right and left state respectively.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch onValue={'Fulfiller'} offValue={'Issuer'} />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      value
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>value</code> prop will determine the value of the switch.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch onValue={'Fulfiller'} offValue={'Issuer'} value="Issuer" />
      <br />
      <Switch onValue={'Fulfiller'} offValue={'Issuer'} value="Fulfiller" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      curved
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>curved</code> prop will determine whether the switch will have a
      round shape or not. The default value is <code>false</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch onValue={'Fulfiller'} offValue={'Issuer'} curved />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      size
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>size</code> prop will determine the size of the switch. It can
      be <code>small</code> or <code>large</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch onValue={'Fulfiller'} offValue={'Issuer'} curved size="small" />
      <br />
      <Switch onValue={'Fulfiller'} offValue={'Issuer'} curved size="large" />
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
      of the switch component. It can be <code>dark</code>,{' '}
      <code>nearWhite</code>, <code>blue</code>, <code>transparentWhite</code>,{' '}
      <code>orange</code>, <code>green</code>, <code>red</code>,{' '}
      <code>black</code>, <code>lightGrey</code>, <code>grey</code>,{' '}
      <code>darkGrey</code> or <code>white</code>. The default value is{' '}
      <code>lightGrey</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="dark"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="nearWhite"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="blue"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="transparentWhite"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="orange"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="green"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="red"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="black"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="lightGrey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="grey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="darkGrey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        backgroundColor="white"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      switchColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>switchColor</code> prop will determine the text color of the
      indicator. It can be <code>nearWhite</code>, <code>blue</code>,{' '}
      <code>transparentWhite</code>, <code>orange</code>, <code>green</code>,{' '}
      <code>red</code>, <code>black</code>, <code>grey</code>,{' '}
      <code>darkGrey</code> or <code>white</code>. The default value is{' '}
      <code>white</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="nearWhite"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="blue"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="transparentWhite"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="orange"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="green"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="red"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="black"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="grey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="darkGrey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        switchColor="white"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      selectedColor and unselectedColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>selectedColor</code> and <code>unselectedColor</code> props will
      determine the text color of the the selected color and the selected color
      respectively. They can be <code>nearWhite</code>, <code>blue</code>,{' '}
      <code>transparentWhite</code>, <code>orange</code>, <code>green</code>,{' '}
      <code>red</code>, <code>black</code>, <code>grey</code>,{' '}
      <code>darkGrey</code> or <code>white</code>. Their default value is{' '}
      <code>grey</code>.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="dark"
        unselectedColor="dark"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="nearWhite"
        unselectedColor="nearWhite"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="blue"
        unselectedColor="blue"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="transparentWhite"
        unselectedColor="transparentWhite"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="orange"
        unselectedColor="orange"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="green"
        unselectedColor="green"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="red"
        unselectedColor="red"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="black"
        unselectedColor="black"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="lightGrey"
        unselectedColor="lightGrey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="grey"
        unselectedColor="grey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="darkGrey"
        unselectedColor="darkGrey"
      />
      <br />
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        selectedColor="white"
        unselectedColor="white"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      onChange
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>onChange</code> prop is a function that will be fired when the
      state of the switch is changed. The new value will be passed as an
      argument.
    </Text>

    <div class="sb-component-group sb-button-group">
      <Switch
        onValue={'Fulfiller'}
        offValue={'Issuer'}
        curved
        onChange={action('changed')}
      />
    </div>
  </div>
));

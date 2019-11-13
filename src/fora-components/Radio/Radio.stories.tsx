import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Radio from '.';

addDecorator(centered);

storiesOf('Radio', module)
  .add('Neutral', () => {
    const [checked, setState] = React.useState(false)
  return (
    <Radio onChange={() => setState(true)} disabled={false} checked={checked} label='LOL' name='lol' value='lol' id='lol' />
  )
})
  .add('Checked', () => {
  return (
    <Radio onChange={() => {}} disabled={false} checked={true} label='LOL' name='lol' value='lol' id='lol' />
  )
})
  .add('Disabled', () => {
  return (
    <Radio onChange={() => {}} disabled={true} checked={true} label='LOL' name='lol' value='lol' id='lol' />
  )
})
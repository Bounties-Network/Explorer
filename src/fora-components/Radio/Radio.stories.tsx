import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Radio from '.';

addDecorator(centered);

storiesOf('Radio', module)
  .add('Neutral', () => {
    const [checked, setState] = React.useState(false)
  return (
    <Radio onClick={() => setState(true)} disabled={false} checked={checked} label='LOL' name='lol' value='lol' id='lol' />
  )
})
  .add('Checked', () => {
  return (
    <Radio onClick={() => {}} disabled={false} checked={true} label='LOL' name='lol' value='lol' id='lol' />
  )
})
  .add('Disabled', () => {
  return (
    <Radio onClick={() => {}} disabled={true} checked={true} label='LOL' name='lol' value='lol' id='lol' />
  )
})
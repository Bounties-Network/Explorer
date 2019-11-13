import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Checkbox from '.';

addDecorator(centered);

storiesOf('Checkbox', module)
  .add('Neutral', () => {
    const [checked, setState] = React.useState(false)
  return (
    <Checkbox onChange={() => setState(!checked)} disabled={false} checked={checked} label='LOL' name='lol' value='lol' id='lol' />
  )
})
  .add('Checked', () => {
  return (
    <Checkbox onChange={() => {}} disabled={false} checked={true} label='LOL' name='lol' value='lol' id='lol' />
  )
})
  .add('Disabled', () => {
  return (
    <Checkbox onChange={() => {}} disabled={true} checked={true} label='LOL' name='lol' value='lol' id='lol' />
  )
})
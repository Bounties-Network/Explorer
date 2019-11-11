import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import ToggleSwitch from '.';

addDecorator(centered);

storiesOf('ToggleSwitch', module).add('Mi Fora', () => {
  const [state, setState] = React.useState<boolean>(false)

  return (
    <ToggleSwitch isChecked={state} onChange={() => setState(!state)} />
  )
});

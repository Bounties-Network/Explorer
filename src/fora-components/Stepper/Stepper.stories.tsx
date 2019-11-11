import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Stepper from '.';

addDecorator(centered);

storiesOf('Stepper', module).add('Mi Fora', () => {
  const [state, setState] = React.useState<boolean>(4)

  return (
    <Stepper handleClick={(value) => setState(value)} value={ state }/>
  )
});

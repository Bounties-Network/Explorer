import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Input from '.';

addDecorator(centered);

storiesOf('Input', module)
  .add('Error', () => {
  return (
    <Input
      isValid={false}
      errorMessage={'This is an error message'}
      hasError={true} placeholder='Placeholder..' value={'Invalid'} onChange={() => { }} />
  )
  })
  .add('Valid', () => {
  return (
    <Input
      isValid={true}
      hasError={false}
      placeholder='Placeholder..' value={'Some really long valid message'} onChange={() => {}} />
  )
  })
  .add('Helper', () => {
    const [state, setState] = React.useState<string>('')
    return (
      <Input
        isValid={false}
        hasError={false}
        helperMessage={'This is some helper text'}
        placeholder='Placeholder..' value={state} onChange={({ target: { value } }) => setState(value)} />
    )
  });


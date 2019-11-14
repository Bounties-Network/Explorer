/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import CommentForm from '.';

addDecorator(centered);

storiesOf('CommentForm', module)
  .add('Mi Fora', () => {
    const [ state, setState] = React.useState<string | undefined | null>(undefined)
  return (
    <CommentForm
      value={state}
      handleChange={(value) => setState(value)}
      handleCancel={() => console.log('handle cancel clicked')}
      handleSubmit={(value, callback) => 
        { console.log(value)
        if (callback) {
          setTimeout(callback, 1500)
        } }
      }
    />
  )
  })
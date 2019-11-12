/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react'
import { storiesOf } from '@storybook/react';
import StyledBrowserSelect from '.';
import { addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";

addDecorator(centered);

storiesOf('StyledBrowserSelect', module)
  .add('Mi Fora', () => {
    const [state, setState] = React.useState<string>('')

    return (
      <StyledBrowserSelect  
        options={['React', 'HTML', 'CSS', 'JavaScript']}
        placeholder={'Placeholder..'}
        handleSelect={(option: string) => setState(option)}
        value={state}
       />
    )
  }
)
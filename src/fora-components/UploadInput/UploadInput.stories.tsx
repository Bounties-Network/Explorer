/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import UploadInput from '.';

addDecorator(centered);

storiesOf('UploadInput', module)
  .add('Mi Fora', () => {
    const [state, setState] = React.useState<string>('')
    return (
      <div sx={{  display: 'flex', flexDirection: 'column', '> img:first-of-type': { mt: 4 } }}>
        <UploadInput onChange={ipfsFileURL => {
      console.log('PARENT ONCHANGE ', ipfsFileURL)
      setState(ipfsFileURL)
    }} value={null}></UploadInput>
        <img sx={{  
           display: 'block',
           maxWidth: '230px',
           maxHeight: '230px',
           width: "auto",
           height: "auto",
        }} src={state} alt="" />
      </div>
    )
  })
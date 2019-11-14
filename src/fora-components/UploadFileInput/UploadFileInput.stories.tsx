/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import UploadFileInput from '.';

addDecorator(centered);

storiesOf('UploadFileInput', module)
  .add('Mi Fora', () => {
    return (
        <UploadFileInput onChange={ipfsFileURL => {
        console.log('PARENT ONCHANGE ', ipfsFileURL)
    }} value={null}></UploadFileInput>
    )
  })
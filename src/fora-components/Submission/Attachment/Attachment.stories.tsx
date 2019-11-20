import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Attachment from '.';

addDecorator(centered);

storiesOf('Attachment', module)
  .add('File attachment', () => {
  return (
    <Attachment fileExtensionType={'pdf'} ipfsHash={'abc'} fileName={'fileName345345434MrLee'} />
  )
})
  .add('External link', () => {
  return (
    <Attachment url={'https://www.google.co.uk'} />
  )
})
  .add('Image', () => {
  return (
    <Attachment ipfsHash={'QmRB6uPrCFPouSJsdYuCVCURUvfWXiXFjb6WtJQXFLZrUr'} fileExtensionType={'.png'} fileName={'code.png'} />
  )
})
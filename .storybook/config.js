import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components'
import '../src/styles/flexboxgrid.css';
import '../src/font-files/inter-ui.css';
import '../src/styles/index.scss';
import '../src/fontAwesome';
import '../src/styles/Toastify.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../src/styles/variables.scss')
addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
))

configure(loadStories, module);

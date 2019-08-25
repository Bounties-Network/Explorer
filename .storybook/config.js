require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../src/theme';
import '../src/styles/flexboxgrid.css';
import '../src/styles/index.scss';
import '../src/fontAwesome';
import '../src/styles/Toastify.scss';

// automatically import all files ending in *.stories.js
function loadStories() {
  const req = require.context('../src/stories', true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
  const tsreq = require.context('../src/stories', true, /.stories.tsx$/);
  tsreq.keys().forEach(filename => tsreq(filename));
}

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

configure(loadStories, module);

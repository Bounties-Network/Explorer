require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'theme-ui';
import { Global } from '@emotion/core';
import theme from '../src/theme';
import globalStyles from 'styles/global-styles';
import '../src/styles/flexboxgrid.css';
import '../src/styles/index.scss';
import '../src/styles/Toastify.scss';
import 'tippy.js/dist/tippy.css';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import 'react-toastify/dist/ReactToastify.css';

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Global style={globalStyles} />
      {story()}
    </React.Fragment>
  </ThemeProvider>
));

configure(
  require.context('../src/fora-components', true, /\.stories\.(js|mdx|tsx)$/),
  module
);

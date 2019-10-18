require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import { ThemeProvider as CThemeProvider } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import theme from '../src/theme';
import globalStyles from 'styles/global-styles';
import '../src/styles/flexboxgrid.css';
import '../src/styles/index.scss';
import '../src/styles/Toastify.scss';

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <CThemeProvider theme={theme}>
      <React.Fragment>
        <Global style={globalStyles} />
        {story()}
      </React.Fragment>
    </CThemeProvider>
  </ThemeProvider>
));

configure(require.context('../src/fora-components', true, /\.stories\.(js|mdx|tsx)$/), module);

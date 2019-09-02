require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../src/theme';
import '../src/styles/flexboxgrid.css';
import '../src/styles/index.scss';
import '../src/styles/Toastify.scss';

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

configure(require.context('../src/stories', true, /\.stories\.(js|mdx|tsx)$/), module);

import { css } from '@emotion/core';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Domine&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    font-family: 'Domine', 'Inter', 'Roboto', 'serif';
  }
`;

export default globalStyles;

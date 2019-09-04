// MEDIA QUERIES
const createMediaQuery = n => `@media screen and (min-width:${n})`;

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i];
      }
    })
  );

// Break-points
export const breakpoints = [32, 40, 48, 64].map(n => n + 'em');

export const mediaQueries = breakpoints.map(createMediaQuery);

const aliases = ['sm', 'md', 'lg', 'xl'];

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

// SPACING SCALE
export const space = [0, 4, 8, 16, 24, 32, 40, 128];
export const sizes = [0, 4, 8, 16, 32, 40, 64, 80, 100, 128];

// TYPOGRAPHY //
export const font = '"Domine", Inter, -apple-system';
export const fontMonospace = 'monospace';
export const fontSizes = [12, 14, 16, 18, 20, 25];

// Weights
export const regular = 400;
export const medium = 500;
export const semiBold = 600;
export const bold = 700;
// styled-system's 'fontWeight' function can hook into the 'fontWeights' object
export const fontWeights = {
  regular,
  medium,
  semiBold,
  bold
};

// Line-height
export const lineHeights = {
  h1: 37,
  h2: 24,
  h3: 22,
  h4: 19,
  h5: 17,
  standard: 21,
  small: 18,
  reset: 1
};

// Scale
export const text = {
  h1: {
    fontSize: fontSizes[5] + 'px',
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.h1 + 'px'
  },
  h2: {
    fontSize: fontSizes[4] + 'px',
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.h2
  },
  h2Secondary: {
    fontSize: fontSizes[4] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.h2
  },
  h3: {
    fontSize: fontSizes[3] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.h3
  },
  h4: {
    fontSize: fontSizes[2] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.h4
  },
  h5: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.h5
  },
  bodyItalic: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.regular,
    fontStyle: 'italic',
    lineHeight: lineHeights.standard
  },
  bodyStrong: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard
  },
  body: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard
  },
  smallStrong: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.small
  },
  small: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.small
  },
  link: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard
  },
  linkStrong: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard
  },
  linkSmall: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard
  },
  label: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard
  },
  help: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.regular,
    fontStyle: 'italic',
    lineHeight: lineHeights.standard
  },
  tableHeading: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard
  }
};

// COLOR PALETTE
const seaGlass100 = 'hsl(187, 45%, 81%)';
const seaGlass200 = 'hsl(187, 50%, 60%)';
const seaGlass300 = 'hsl(187, 76%, 35%)';
const seaGlass400 = 'hsl(191, 76%, 27%)';
const seaGlass500 = 'hsl(190, 95%, 18%)';

const rose100 = 'hsl(351, 68%, 83%)';
const rose200 = 'hsl(352, 64%, 67%)';
const rose300 = 'hsl(345, 68%, 23%)';

const amber100 = '#F2BAC2';
const amber200 = '#F2BAC2';
const amber300 = '#F2BAC2';

const amber100 = '#F2BAC2';
const amber200 = '#F2BAC2';
const amber300 = '#F2BAC2';

const lightPurple = 'hsl(259, 55%, 55%)';
const purple = 'hsl(259, 66%, 47%)';
const darkPurple = 'hsl(259, 66%, 37%)';
const lightBlue = 'hsl(216, 100%, 98%)';
const blue = 'hsl(216, 100%, 65%)';
const darkBlue = 'hsl(216, 80%, 55%)';
const red = 'hsl(353, 64%, 67%)';
const darkRed = 'hsl(353, 64%, 60%)';
const orange = 'hsl(36, 96%, 59%)';
const green = 'hsl(140, 44%, 61%)';
const darkGreen = 'hsl(141, 44%, 51%)';

// Brand color aliases
const brandPrimary = purple;
const brandPrimaryHover = darkPurple;
const brandSecondary = blue;
const brandSecondaryHover = darkBlue;
const brandDestructive = red;
const brandDestructiveHover = darkRed;
const brandWarning = orange;
const brandAffirmative = green;
const brandAffirmativeHover = darkGreen;

// Gray-scale
const black = '#111618';
const purpleBlack = 'hsl(262, 12%, 19%)';
const gray500 = 'hsl(223, 9%, 29%)';
const gray400 = 'hsl(218, 10%, 57%)';
const gray300 = 'hsl(223, 10%, 86%)';
const gray200 = 'hsl(225, 9%, 91%)';
const gray100 = 'hsl(220, 30%, 96%)';
const white = 'hsl(0, 0%, 100%)';
const transparentWhite = 'rgba(255, 255, 255, 65%)';

// Misc
const inputBg = gray100;
const baseBorderColor = gray200;

const colors = {
  seaGlass100,
  seaGlass200,
  seaGlass300,
  seaGlass400,
  seaGlass500,

  rose100,
  rose200,
  rose300,

  brandPrimary,
  brandPrimaryHover,
  brandSecondary,
  brandSecondaryHover,
  brandDestructive,
  brandDestructiveHover,
  brandWarning,
  brandAffirmative,
  brandAffirmativeHover,
  lightPurple,
  lightBlue,
  black,
  purpleBlack,
  gray500,
  gray400,
  gray300,
  gray200,
  gray100,
  white,
  transparentWhite,
  inputBg,
  baseBorderColor
};

export { colors };

// BORDERS
// styled-system's 'borderRadius' function can hook into the 'radii' object/array
export const radii = [0, 4, 8, '50%'];
export const radius = '8px';

const baseBorder = `1px solid ${colors.baseBorderColor}`;
const avatarBorder = `2px solid ${colors.white}`;
const lightBorder = `1px solid ${colors.gray100}`;

const borders = [baseBorder, avatarBorder, lightBorder];

export { borders };

// PAGE WRAPPER
export const maxContainerWidth = '1280px';

// BOX SHADOWS
export const shadows = [
  '0px 2px 4px rgba(17, 22, 24, 0.08);',
  '0px 3px 5px rgba(17, 22, 24, 0.15);',
  `0 0 10px ${colors.gray200}`,
  `inset 0 0 0 1px ${colors.brandSecondary}`,
  `inset 0 0 0 1px ${colors.brandDestructive}`
]; //Card //Avatar

//Z-INDEX
export const zIndices = [0, 9, 99, 999, 9999];

//AVATAR STYLES
export const avatarResourceTypes = {
  user: {
    borderRadius: 3
  },
  community: {
    borderRadius: 2
  }
};

export const textFormat = {
  block: {
    flexDirection: 'column'
  },
  inline: {
    flexDirection: 'row'
  }
};

// EXPORT THEME
const theme = {
  breakpoints,
  mediaQueries,
  space,
  sizes,
  font,
  fontSizes,
  fontWeights,
  lineHeights,
  regular,
  bold,
  text,
  colors,
  radii,
  radius,
  borders,
  shadows,
  zIndices,
  avatarResourceTypes,
  textFormat,
  maxContainerWidth
};

export default theme;

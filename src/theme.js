// MEDIA QUERIES
const createMediaQuery = n => '@media screen and (min-width:${n})';

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
export const space = [0, 4, 8, 16, 32, 40, 64, 128];
export const sizes = [0, 4, 8, 16, 32, 40, 64, 128];

// TYPOGRAPHY //
export const font = '"Inter", -apple-system, BlinkMacSystemFont, sans-serif';
export const fontMonospace = 'monospace';
export const fontSizes = [0.75, 0.875, 1, 1.25, 1.563, 2];

// Weights
export const regular = 400;
export const medium = 500;
export const bold = 700;
// styled-system's 'fontWeight' function can hook into the 'fontWeights' object
export const fontWeights = {
  regular,
  medium,
  bold
};

// Line-height
export const lineHeights = {
  standard: 1.6,
  small: 1.3,
  heading: 1.25,
  reset: 1
};

// Scale
export const text = {
  h1: {
    fontSize: fontSizes[5] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  h2: {
    fontSize: fontSizes[4] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  h3: {
    fontSize: fontSizes[3] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  h4: {
    fontSize: fontSizes[2] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  h5: {
    fontSize: fontSizes[1] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  bodyLarge: {
    fontSize: fontSizes[2] + 'rem',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard
  },
  body: {
    fontSize: fontSizes[1] + 'rem',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard
  },
  small: {
    fontSize: fontSizes[0] + 'rem',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard
  }
};

// COLOR PALETTE
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
const black = 'hsl(223, 17%, 8%)';
const purpleBlack = 'hsl(262, 12%, 19%)';
const gray500 = 'hsl(223, 9%, 29%)';
const gray400 = 'hsl(218, 10%, 57%)';
const gray300 = 'hsl(223, 10%, 86%)';
const gray200 = 'hsl(225, 9%, 91%)';
const gray100 = 'hsl(220, 30%, 96%)';
const white = 'hsl(0, 0%, 100%)';

// Misc
const inputBg = gray100;
const baseBorderColor = gray200;

const colors = {
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
  inputBg,
  baseBorderColor
};

export { colors };

// BORDERS
// styled-system's 'borderRadius' function can hook into the 'radii' object/array
export const radii = [0, 4, 8, '50%'];
export const radius = '8px';

const baseBorder = `1px solid ${colors.baseBorderColor}`;
const lightBorder = `1px solid ${colors.gray100}`;

const borders = [baseBorder, lightBorder];

export { borders };

// PAGE WRAPPER
export const maxContainerWidth = '1280px';

// BOX SHADOWS
export const shadows = [
  `0px 2px 4px rgba(${colors.black}, 0.075)`,
  `0 0 10px ${colors.gray200}`,
  `inset 0 0 0 1px ${colors.brandSecondary}`,
  `inset 0 0 0 1px ${colors.brandDestructive}`
];

//Z-INDEX
export const zIndices = [0, 9, 99, 999, 9999];

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
  maxContainerWidth
};

export default theme;

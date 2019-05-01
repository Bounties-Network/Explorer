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

// TYPOGRAPHY //
export const font = '"Inter", -apple-system, BlinkMacSystemFont, sans-serif';
export const fontSizes = [12, 14, 16, 20, 24, 32];

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
  standard: 1.5,
  heading: 1.25
};

// Scale
export const textStyles = {
  heading4: {
    fontSize: fontSizes[5] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  heading3: {
    fontSize: fontSizes[4] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  heading2: {
    fontSize: fontSizes[3] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  heading1: {
    fontSize: fontSizes[2] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  heading0: {
    fontSize: fontSizes[1] + 'rem',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading
  },
  body1: {
    fontSize: fontSizes[2] + 'rem',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard
  },
  body0: {
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
const purple = '#5a28c6';
const black = '2d2838';
const white = '#fff';
const text = '#615e67';

const colors = {
  black,
  white,
  text,
  purple
};

export { colors };

// BORDERS
// styled-system's 'borderRadius' function can hook into the 'radii' object/array
export const radii = [0, 3];
export const radius = '3px';

//WRAPPER
export const maxContainerWidth = '1280px';

// BOXSHADOWS
export const boxShadows = [
  '0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)',
  '0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)',
  '0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)',
  '0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)'
];

// EXPORT THEME
const theme = {
  breakpoints,
  mediaQueries,
  space,
  font,
  fontSizes,
  fontWeights,
  lineHeights,
  regular,
  bold,
  textStyles,
  colors,
  radii,
  radius,
  boxShadows,
  maxContainerWidth
};

export default theme;

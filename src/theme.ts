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

// COLOR PALETTE
const seaGlass100 = 'hsl(187, 45%, 81%)';
const seaGlass200 = 'hsl(187, 50%, 60%)';
const seaGlass300 = 'hsl(187, 76%, 35%)';
const seaGlass400 = 'hsl(191, 76%, 27%)';
const seaGlass500 = 'hsl(190, 95%, 18%)';

const rose100 = 'hsl(351, 68%, 83%)';
const rose200 = 'hsl(352, 64%, 67%)';
const rose300 = 'hsl(345, 68%, 23%)';

const amber100 = 'hsl(21, 94%, 85%)';
const amber200 = 'hsl(21, 95%, 75%)';
const amber300 = 'hsl(18, 68%, 35%)';

const mustard100 = 'hsl(175, 31%, 16%)';
const mustard200 = 'hsl(39, 100%, 77%)';
const mustard300 = 'hsl(36, 85%, 38%)';

const gray100 = 'hsl(219, 27%, 97%)';
const gray200 = 'hsl(180, 2%, 91%)';
const gray300 = 'hsl(199, 4%, 86%)';
const gray400 = 'hsl(193, 4%, 57%)';
const gray500 = 'hsl(199, 4%, 29%)';
const black = 'hsl(197, 17%, 8%)';
const white = 'hsl(0, 0%, 100%)';
const transparentWhite = 'rgba(255, 255, 255, 65%)';

// Brand color aliases
const brandPrimary = seaGlass200;
const brandPrimaryHover = seaGlass100;
const brandSecondary = white;
const brandSecondaryHover = white;
const brandDestructive = rose200;
const brandDestructiveHover = rose100;
const brandSpecial = amber200;
const brandSpecialHover = amber100;
const brandAffirmative = seaGlass200;
const brandAffirmativeHover = seaGlass100;

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

  amber100,
  amber200,
  amber300,

  mustard100,
  mustard200,
  mustard300,

  brandPrimary,
  brandPrimaryHover,
  brandSecondary,
  brandSecondaryHover,
  brandDestructive,
  brandDestructiveHover,
  brandSpecial,
  brandSpecialHover,
  brandAffirmative,
  brandAffirmativeHover,

  gray100,
  gray200,
  gray300,
  gray400,
  gray500,
  black,
  white,
  transparentWhite,
  inputBg,
  baseBorderColor
};

// SPACING SCALE
export const space = [0, 4, 8, 16, 24, 32, 40, 128];
export const sizes = [0, 4, 8, 16, 32, 40, 64, 80, 100, 128];

// TYPOGRAPHY //
export const body = '"Domine", Inter, -apple-system';
export const heading = 'inherit';
export const monospace = 'monospace';
export const fontSizes = [12, 14, 16, 18, 20, 25];
export const fonts = {
  body,
  heading,
  monospace
};

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

// BORDERS
// styled-system's 'borderRadius' function can hook into the 'radii' object/array
export const radii = [0, 4, 8, '50%'];
export const radius = '8px';

const baseBorder = `1px solid ${colors.baseBorderColor}`;
const activeBorder = `1px solid ${colors.gray300}`;
const avatarBorder = `2px solid ${colors.white}`;
const lightBorder = `1px solid ${colors.gray100}`;

const borders = [baseBorder, activeBorder, avatarBorder, lightBorder];

export { borders };

// PAGE WRAPPER
export const maxContainerWidth = '1280px';

// BOX SHADOWS
export const shadows = [
  '0px 2px 4px rgba(17, 22, 24, 0.08);', //buttonShadow1, cardShadow
  '0px 3px 5px rgba(17, 22, 24, 0.15);', //buttonShadow2
  '0px 9px 24px rgba(0, 0, 0, 0.08)', //shadowLarge
  `0 0 10px ${colors.gray200}`,
  `inset 0 0 0 1px ${colors.brandSecondary}`,
  `inset 0 0 0 1px ${colors.brandDestructive}`
]; //Card //Avatar

//Z-INDEX
export const zIndices = [0, 9, 99, 999, 9999];

// Text variants
export const text = {
  h1: {
    fontSize: fontSizes[5] + 'px',
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.h1 + 'px'
  },
  h2: {
    fontSize: fontSizes[4] + 'px',
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.h2 + 'px'
  },
  h2Secondary: {
    fontSize: fontSizes[4] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.h2 + 'px'
  },
  h3: {
    fontSize: fontSizes[3] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.h3 + 'px'
  },
  h4: {
    fontSize: fontSizes[2] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.h4 + 'px'
  },
  h5: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.h5 + 'px'
  },
  bodyItalic: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.regular,
    fontStyle: 'italic',
    lineHeight: lineHeights.standard + 'px'
  },
  bodyStrong: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard + 'px'
  },
  body: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard + 'px'
  },
  smallStrong: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.small + 'px'
  },
  small: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.small + 'px'
  },
  link: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.standard + 'px'
  },
  linkStrong: {
    fontSize: fontSizes[1] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard + 'px'
  },
  linkSmall: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard + 'px'
  },
  label: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard + 'px'
  },
  help: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.regular,
    fontStyle: 'italic',
    lineHeight: lineHeights.standard + 'px'
  },
  tableHeading: {
    fontSize: fontSizes[0] + 'px',
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard + 'px'
  },
  introBannerH1: {
    fontFamily: 'Domine',
    fontWeight: fontWeights.bold,
    fontSize: '40px',
    lineHeight: '51px',
    color: colors.seaGlass400
  },
  introBannerDescription: {
    fontFamily: 'Inter',
    fontWeight: fontWeights.regular,
    fontSize: fontSizes[2] + 'px',
    lineHeight: lineHeights.h2 + 'px'
  }
};

// Button variants
export const buttons = {
  secondary: {
    background: 'white',
    borderRadius: 2,
    border: baseBorder,
    color: colors.gray500,
    width: '153px',
    cursor: 'pointer',
    ...text.bodyStrong,
    ':hover': {
      boxShadow: shadows[0],
      color: colors.black,
      border: borders[1]
    },
    ':active': {
      color: colors.black,
      border: borders[1]
    },
    ':disabled': {
      background: colors.gray100,
      cursor: 'not-allowed',
      color: colors.gray300
    }
  }
};

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
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  regular,
  bold,
  colors,
  radii,
  radius,
  borders,
  shadows,
  zIndices,
  text,
  buttons,
  avatarResourceTypes,
  textFormat,
  maxContainerWidth
};

export default theme;
export { colors };

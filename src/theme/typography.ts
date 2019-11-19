import { colors, colorAliases } from "./colors";

const typography = {
  fonts: {
    headingSans: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,`,
    headingSerif: `"Domine", Lucida Bright, Georgia, serif`,
    body: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,`,
    monospace: `"Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace"`
  },

  // Typographic Scale
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    "2xl": "1.25rem", // 20px
    "3xl": "1.5625rem", // 25px
    "4xl": "1.9375rem" // 31px
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },

  lineHeights: {
    standard: 1.5,
    small: 1.25,
    reset: 1
  },

  // Text Variants
  text: {
    body: {
      fontSize: "sm",
      fontWeight: "regular",
      lineHeight: "standard"
    },

    link: {
      color: colorAliases.brandPrimary,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline"
      }
    },

    headingSans: {
      fontFamily: "headingSans",
      fontWeight: "medium"
    },

    headingSerif: {
      fontFamily: "headingSerif",
      fontWeight: "bold"
    },

    label: {
      color: colors.gray["400"],
      fontSize: "xs"
    },

    labelCaps: {
      fontSize: "xs",
      textTransform: "uppercase"
    },

    numeric: {
      fontVariantNumeric: "tabular-nums"
    }
  }
};

export default typography;

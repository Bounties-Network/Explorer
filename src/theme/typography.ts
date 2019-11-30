const typography = {
  fonts: {
    headingSans: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    headingSerif: `"Domine", Lucida Bright, Georgia, serif`,
    base: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    monospace: `"Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace"`
  },

  // Typographic Scale
  fontSizes: {
    small: "0.75rem", // 12px
    base: "0.875rem", // 14px
    large: "1rem", // 16px
    h5: "1rem", // 16px
    h4: "1.125rem", // 18px
    h3: "1.25rem", // 20px
    h2: "1.5625rem", // 25px
    h1: "1.9375rem" // 31px
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },

  lineHeights: {
    standard: 1.5,
    small: 1.25,
    reset: 1
  },

  // Theme-UI Text Component Variants
  text: {
    small: {
      fontFamily: "body",
      fontSize: "small",
      lineHeight: "standard"
    },

    body: {
      fontFamily: "body",
      fontSize: "base",
      fontWeight: "normal",
      lineHeight: "standard"
    },

    bodyStrong: {
      fontFamily: "body",
      fontSize: "bodyLarge",
      fontWeight: "medium",
      lineHeight: "standard"
    },

    bodyLarge: {
      fontFamily: "body",
      fontSize: "large",
      fontWeight: "normal",
      lineHeight: "standard"
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
      fontFamily: "body",
      fontSize: "small",
      fontWeight: "normal",
      lineHeight: "reset"
    },

    labelCaps: {
      fontSize: "small",
      textTransform: "uppercase"
    },

    numeric: {
      fontVariantNumeric: "tabular-nums"
    },

    link: {
      // text.link, hmm should we keep this?
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "standard",
      color: "brandPrimary.300"
    }
  }
};

export default typography;

import { theme as cTheme } from "@chakra-ui/core";
import { colors, colorAliases } from "./colors";
import typography from "./typography";
import buttons from "./buttons";

// BREAK-POINTS
export const breakpoints = ["30em", "48em", "62em", "80em"];
// Aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

// SPACING SCALE
export const space = [0, 4, 8, 16, 24, 32, 40, 128].map(n => n / 16 + "em");
export const sizes = cTheme.sizes;

// BORDERS & BORDER-RADII
// styled-system's 'borderRadius' function can hook into the 'radii' object/array
export const radii = [0, 4, 8, "50%"];
export const radius = "8px";

export const borders = {
  base: `1px solid ${colorAliases.baseBorderColor}`,
  light: `1px solid ${colors.gray["100"]}`,

  avatar: {
    default: `2px solid ${colors.white}`,
    large: `4px solid ${colors.white}`
  },

  input: {
    default: `2px solid ${colors.gray["300"]}`,
    focused: `2px solid ${colors.seaGlass["200"]}`,
    active: `2px solid ${colors.seaGlass["200"]}`,
    invalid: `2px solid ${colors.rose["200"]}`
  },

  button: {
    primary: `1px solid ${colors.seaGlass["200"]}`,
    secondary: `1px solid ${colors.gray["300"]}`,
    tertiary: `1px solid ${colors.amber["200"]}`
  }
};

// PAGE WRAPPER
export const maxContainerWidth = "1280px";

// BOX SHADOWS
export const shadows = [
  "0px 2px 4px rgba(17, 22, 24, 0.08)", //cardShadow
  "0px 9px 24px rgba(0, 0, 0, 0.08)", //shadowLarge
  `inset 0px 1px 4px rgba(0, 0, 0, 0.14)`, //innerShadows
  `0 0 10px ${colors.gray["200"]}`,
  `inset 0 0 0 1px ${colorAliases.brandSecondary}`,
  `inset 0 0 0 1px ${colorAliases.brandDestructive}`
]; //Card //Avatar

//Z-INDEX
export const zIndices = cTheme.zIndices;

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
    flexDirection: "column"
  },
  inline: {
    flexDirection: "row"
  }
};

export const pill = {
  status: {
    active: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.seaGlass["500"],
      backgroundColor: colors.seaGlass["100"]
    },
    expired: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.rose["300"],
      backgroundColor: colors.rose["100"]
    },
    dead: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.gray["500"],
      backgroundColor: colors.white,
      border: borders.base
    },
    completed: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.gray["500"],
      backgroundColor: colors.white,
      border: borders.base
    },
    pendingAcceptance: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.gold["300"],
      backgroundColor: colors.gold["100"]
    },
    declined: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.rose["300"],
      backgroundColor: colors.rose["200"]
    },
    accepted: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.seaGlass["500"],
      backgroundColor: colors.seaGlass["200"]
    },
    processing: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.gold["300"],
      backgroundColor: colors.gold["100"]
    },
    confirmed: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.seaGlass["500"],
      backgroundColor: colors.seaGlass["100"]
    },
    failed: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.rose["300"],
      backgroundColor: colors.rose["200"]
    },
    pending: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.gold["300"],
      backgroundColor: colors.gold["100"]
    }
  },
  tag: {
    explorer: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.gray["400"],
      border: borders.base
    }
  },
  network: {
    textTransform: "uppercase",
    backgroundColor: colors.white,
    border: borders.base
  },
  notificationCount: {
    backgroundColor: colors.rose["200"],
    px: `${space[0]}px !important`,
    py: `${space[1]}px !important`
  },
  tabNotificationCount: {
    backgroundColor: colors.gray["200"],
    px: `${space[0]}px !important`,
    py: `${space[1]}px !important`
  }
};

export const forms = {
  textarea: {
    ...typography.text.body,
    resize: "none",
    border: "none",
    color: colors.gray["500"],
    "&:active": {
      border: "none",
      outline: "none"
    },
    "&:focus, &:active": { border: "none", outline: "none" },
    "::placeholder": { color: colors.gray["400"] }
  },
  error: {
    bg: `${colors.white} !important`,
    border: `${borders.input.invalid} !important`
  },
  valid: {}
};

export const variants = {
  card: {
    border: borders.base,
    padding: 5,
    boxShadow: shadows[0],
    boxSizing: "border-box",
    borderRadius: 2
  },
  link: {
    color: colorAliases.brandPrimary,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  linkIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "> :first-of-type": { mr: 2 }
  },
  secondaryLink: {
    color: colors.gray["400"],
    "&[disabled]": {
      colors: colors.gray["400"],
      opacity: 0.3
    },
    ":active": {
      color: colors.gray["500"]
    }
  },
  pill,
  networkDot: {
    mainnet: {
      height: 2,
      width: 2,
      backgroundColor: colors.seaGlass["200"],
      borderRadius: "50%"
    }
  }
};

const icons = {
  ...cTheme.icons
};

const styles = {
  a: {
    color: colorAliases.brandPrimary,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

// EXPORT THEME
const theme = {
  breakpoints,
  space,
  sizes,
  colors,
  colorAliases,
  ...typography,
  radii,
  radius,
  borders,
  shadows,
  zIndices,
  buttons,
  avatarResourceTypes,
  textFormat,
  maxContainerWidth,
  forms,
  variants,
  icons,
  styles
};

export default theme;
export type ITheme = typeof theme;

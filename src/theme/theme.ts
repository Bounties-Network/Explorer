import { theme as cTheme } from "@chakra-ui/core";
import { colors } from "./colors";
import typography from "./typography";
import buttons from "./buttons";

// BREAK-POINTS
export const breakpoints = ["30em", "48em", "62em", "80em"];
// Aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

// SPACING & SIZE SCALES
export const space = [0, 4, 8, 16, 24, 32, 40, 128].map(n => n / 16 + "rem");
export const sizeScale = [24, 32, 40, 44, 48, 52, 100, 152].map(
  n => n / 16 + "rem"
);

// SIZES
export const sizes = {
  avatarImage: {
    sm: sizeScale[1],
    md: sizeScale[3],
    lg: sizeScale[6]
  },

  inputHeight: {
    sm: sizeScale[1],
    lg: sizeScale[4]
  },

  buttonWidth: {
    sm: sizeScale[5],
    lg: sizeScale[7]
  }
};

// BORDERS & BORDER-RADII
// styled-system's 'borderRadius' function can hook into the 'radii' object/array
export const radii = [0, 4, 8, "50%"];
export const radius = "8px";

export const borders = {
  base: `1px solid ${colors.baseBorderColor}`,
  light: `1px solid ${colors.brandGray["100"]}`,

  avatar: {
    default: `2px solid ${colors.white}`,
    large: `4px solid ${colors.white}`
  },

  input: {
    default: `2px solid ${colors.brandGray["300"]}`,
    focused: `2px solid ${colors.brandPrimary["200"]}`,
    active: `2px solid ${colors.brandPrimary["200"]}`,
    invalid: `2px solid ${colors.brandDestructive["200"]}`
  }
};

// PAGE WRAPPER
export const maxContainerWidth = "1280px";

// BOX SHADOWS
export const shadows = [
  "0px 2px 4px rgba(17, 22, 24, 0.08)", //cardShadow
  "0px 9px 24px rgba(0, 0, 0, 0.08)", //shadowLarge
  `inset 0px 1px 4px rgba(0, 0, 0, 0.14)`, //innerShadows
  `0 0 10px ${colors.brandGray["200"]}`,
  `inset 0 0 0 1px ${colors.brandGray["200"]}`,
  `inset 0 0 0 1px ${colors.brandDestructive["200"]}`
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
      color: colors.brandPrimary["500"],
      backgroundColor: colors.brandPrimary["100"]
    },
    expired: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandDestructive["300"],
      backgroundColor: colors.brandDestructive["100"]
    },
    dead: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandGray["500"],
      backgroundColor: colors.white,
      border: borders.base
    },
    completed: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandGray["500"],
      backgroundColor: colors.white,
      border: borders.base
    },
    pendingAcceptance: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandPending["300"],
      backgroundColor: colors.brandPending["100"]
    },
    declined: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandDestructive["300"],
      backgroundColor: colors.brandDestructive["200"]
    },
    accepted: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandPrimary["500"],
      backgroundColor: colors.brandPrimary["200"]
    },
    processing: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandPending["300"],
      backgroundColor: colors.brandPending["100"]
    },
    confirmed: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandPrimary["500"],
      backgroundColor: colors.brandPrimary["100"]
    },
    failed: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandDestructive["300"],
      backgroundColor: colors.brandDestructive["200"]
    },
    pending: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandPending["300"],
      backgroundColor: colors.brandPending["100"]
    }
  },
  tag: {
    explorer: {
      fontSize: "xs",
      textTransform: "capitalize",
      color: colors.brandGray["400"],
      border: borders.base
    }
  },
  network: {
    textTransform: "uppercase",
    backgroundColor: colors.white,
    border: borders.base
  },
  notificationCount: {
    backgroundColor: colors.brandDestructive["200"],
    px: `${space[0]}px !important`,
    py: `${space[1]}px !important`
  },
  tabNotificationCount: {
    backgroundColor: colors.brandGray["200"],
    px: `${space[0]}px !important`,
    py: `${space[1]}px !important`
  }
};

export const forms = {
  textarea: {
    ...typography.text.body,
    resize: "none",
    border: "none",
    color: colors.brandGray["500"],
    "&:active": {
      border: "none",
      outline: "none"
    },
    "&:focus, &:active": { border: "none", outline: "none" },
    "::placeholder": { color: colors.brandGray["400"] }
  },
  error: {
    bg: `${colors.white} !important`,
    border: `${borders.input.invalid} !important`
  },
  valid: {}
};

const cards = {
  primary: {
    border: borders.base,
    padding: 3,
    boxShadow: shadows[0],
    boxSizing: "border-box",
    borderRadius: 2
  }
};

export const variants = {
  pill,
  networkDot: {
    mainnet: {
      height: 2,
      width: 2,
      backgroundColor: colors.brandPrimary["200"],
      borderRadius: "50%"
    }
  }
};

const icons = {
  ...cTheme.icons
};

const styles = {
  a: {
    color: colors.brandPrimary["300"],
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
  ...typography,
  radii,
  radius,
  borders,
  shadows,
  zIndices,
  buttons,
  cards,
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

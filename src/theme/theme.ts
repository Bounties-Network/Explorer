import { theme as cTheme } from "@chakra-ui/core";
import { colors, colorAliases } from "./colors";
import typography from "./typography";

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
  "0px 2px 4px rgba(17, 22, 24, 0.08)", //buttonShadow1, cardShadow
  "0px 3px 5px rgba(17, 22, 24, 0.15)", //buttonShadow2
  "0px 9px 24px rgba(0, 0, 0, 0.08)", //shadowLarge
  `inset 0px 1px 4px rgba(0, 0, 0, 0.14)`, // innerShadows
  `0 0 10px ${colors.gray["200"]}`,
  `inset 0 0 0 1px ${colorAliases.brandSecondary}`,
  `inset 0 0 0 1px ${colorAliases.brandDestructive}`
]; //Card //Avatar

//Z-INDEX
export const zIndices = cTheme.zIndices;

// Button variants
const primaryButton = {
  backgroundColor: colors.seaGlass["200"],
  borderRadius: 2,
  border: borders.button.primary,
  color: colors.seaGlass["500"],
  cursor: "pointer",
  boxSizing: "border-box",
  ":hover": {
    background: colors.seaGlass["100"],
    boxShadow: shadows[0]
  },
  ":active, :focus": {
    background: colors.seaGlass["100"]
  },
  ":disabled": {
    background: colors.seaGlass["100"],
    cursor: "not-allowed",
    pointerEvents: "disabled",
    color: colors.gray["200"]
  }
};

const primaryIcon = {
  ...primaryButton,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "> :first-of-type": { mr: 2 }
};

const primaryIconOnly = {
  ...primaryIcon,
  height: "40px",
  width: "40px",
  "> :first-of-type": { mr: 0 }
};

const primarySmall = {
  ...primaryButton,
  py: 1,
  px: 4
};

const secondaryButton = {
  backgroundColor: colors.white,
  borderRadius: 2,
  border: borders.button.secondary,
  color: colors.gray["500"],
  cursor: "pointer",
  boxSizing: "border-box",
  ":hover": {
    boxSizing: "border-box",
    boxShadow: shadows[0],
    color: colors.black
  },
  ":active, :focus": {
    boxSizing: "border-box",
    color: colors.black
  },
  ":disabled": {
    background: colors.gray["100"],
    cursor: "not-allowed",
    color: colors.gray["300"]
  }
};

const secondaryIcon = {
  ...secondaryButton,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "> :first-of-type": { mr: 2 }
};

const secondaryIconOnly = {
  ...secondaryIcon,
  width: "40px",
  height: "40px",
  "> :first-of-type": { mr: 0 }
};

const secondarySmall = {
  ...secondaryButton,
  py: 1,
  px: 4
};

const secondarySmallIconOnly = {
  ...secondarySmall,
  py: 0,
  px: 2,
  "> :first-of-type": { mr: 0 }
};

const secondaryAffirmative = {
  ...secondaryButton,
  color: colors.seaGlass["300"],
  ":hover": {
    ...secondaryButton[":hover"],
    color: colors.seaGlass["400"]
  },
  ":active": {
    ...secondaryButton[":active"],
    color: colors.seaGlass["400"]
  }
};

const secondaryAffirmativeIcon = {
  ...secondaryAffirmative,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "> :first-of-type": { mr: 2 }
};

const secondaryAffirmativeIconOnly = {
  ...secondaryAffirmativeIcon,
  width: "40px",
  height: "40px",
  "> :only-child": { mr: 0 }
};

const secondaryAffirmativeSmall = {
  ...secondaryAffirmative,
  py: 1,
  px: 4
};

const secondaryDestructive = {
  ...secondaryAffirmative,
  color: colors.rose["200"],
  ":hover": {
    ...secondaryAffirmative[":hover"],
    color: colors.rose["300"]
  },
  ":active": {
    ...secondaryAffirmative[":active"],
    color: colors.rose["300"]
  }
};

const secondaryDestructiveIcon = {
  ...secondaryDestructive,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "> :first-of-type": { mr: 2 }
};

const secondaryDestructiveIconOnly = {
  ...secondaryDestructiveIcon,
  width: "40px",
  height: "40px",
  "> :only-child": { mr: 0 }
};

const secondaryDestructiveSmall = {
  ...secondaryDestructive,
  py: 1,
  px: 4
};

const special = {
  ...primaryButton,
  backgroundColor: colors.amber["200"],
  color: colors.amber["300"],
  ":hover": {
    ...primaryButton[":hover"],
    backgroundColor: colors.amber["100"],
    borderColor: colors.amber["200"],
    color: colors.rose["300"]
  },
  ":active": {
    ...primaryButton[":active"],
    backgroundColor: colors.amber["100"],
    color: colors.rose["300"]
  },
  ":disabled": {
    ...primaryButton[":disabled"],
    color: primaryButton[":disabled"].color,
    backgroundColor: colors.amber["100"]
  }
};

const specialIcon = { ...primaryIcon, ...special };

const specialIconOnly = {
  ...specialIcon,
  width: "40px",
  height: "40px",
  "> :only-child": { mr: 0 }
};

const specialSmall = {
  ...special,
  py: 1,
  px: 4
};

const destructive = {
  ...primaryButton,
  backgroundColor: colors.rose["200"],
  color: colors.rose["300"],
  ":hover": {
    ...primaryButton[":hover"],
    backgroundColor: colors.rose["100"],
    borderColor: colors.rose["200"],
    color: colors.rose["300"]
  },
  ":active, :focus": {
    ...primaryButton[":active"],
    backgroundColor: colors.rose["100"],
    color: colors.rose["300"]
  },
  ":disabled": {
    ...primaryButton[":disabled"],
    color: primaryButton[":disabled"].color,
    backgroundColor: colors.rose["100"]
  }
};

const destructiveLink = {
  ...typography.text.link,
  color: colors.rose["200"],
  "&[disabled]": {
    colors: colors.rose["200"],
    opacity: 0.3,
    pointerEvents: "disabled",
    cursor: "not-allowed"
  },
  ":active": {
    color: colors.rose["300"]
  }
};

const destructiveIcon = {
  ...destructive,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "> :first-of-type": { mr: 2 }
};

const destructiveIconOnly = {
  ...destructiveIcon,
  width: "40px",
  height: "40px",
  "> :first-of-type": { mr: 0 }
};

const destructiveSmall = {
  ...destructive,
  py: 1,
  px: 4
};

const tertiary = {
  backgroundColor: colors.amber["200"],
  borderRadius: 2,
  color: colors.amber["300"],
  cursor: "pointer",
  boxSizing: "border-box",
  ":hover": {
    boxShadow: shadows[0],
    boxSizing: "border-box",
    color: colors.amber["300"],
    background: colors.amber["100"],
    border: borders.button.tertiary
  },
  ":active, :focus": {
    boxSizing: "border-box"
  },
  ":disabled": {
    background: colors.amber["100"],
    cursor: "not-allowed",
    color: colors.gray["100"]
  }
};

const upload = {
  cursor: "pointer",
  backgroundColor: "white",
  borderLeft: "unset",
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderTopRightRadius: 2,
  borderBottomRightRadius: 2,
  height: "48px",
  width: "106px",
  color: "black",
  border: "base"
};

export const buttons = {
  primary: primaryButton,
  primaryIcon,
  primaryIconOnly,
  primarySmall,
  secondary: secondaryButton,
  secondaryIcon,
  secondaryIconOnly,
  secondarySmall,
  secondarySmallIconOnly,
  secondaryAffirmative,
  secondaryAffirmativeIcon,
  secondaryAffirmativeIconOnly,
  secondaryAffirmativeSmall,
  secondaryDestructive,
  secondaryDestructiveIcon,
  secondaryDestructiveIconOnly,
  secondaryDestructiveSmall,
  special,
  specialSmall,
  specialIcon,
  specialIconOnly,
  destructive,
  destructiveLink,
  destructiveIcon,
  destructiveIconOnly,
  destructiveSmall,
  tertiary,
  upload
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
    ...typography.text.link,
    color: colors.gray["400"],
    "&[disabled]": {
      colors: colors.gray["400"],
      opacity: 0.3
    },
    ":active": {
      color: colors.gray["500"]
    }
  },
  destructiveLink,
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
  ...borders,
  shadows,
  zIndices,
  buttons,
  avatarResourceTypes,
  textFormat,
  maxContainerWidth,
  ...pill,
  forms,
  variants,
  icons,
  styles
};

export default theme;
export type ITheme = typeof theme;
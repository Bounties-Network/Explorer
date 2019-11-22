import { colors, colorAliases } from "./colors";

const buttonGradients = {
  primary: {
    default: `linear-gradient(180deg, ${colors.seaGlass["100"]} 0%, #98D4DC 100%)`,
    hover: "linear-gradient(180deg, #8CD0D9 0%, #66C0CC 100%)"
  },
  secondary: {
    default: `linear-gradient(180deg, ${colors.white} 0%, #F8F9F9 100%)`,
    hover: "linear-gradient(180deg, #F8F9FB 0%, #F4F4F6 100%)"
  },
  tertiary: {
    default: `linear-gradient(180deg, ${colors.amber["100"]} 0%, #FCB992 100%)`,
    hover: "linear-gradient(180deg, #FABC99 0%, #F79964 100%)"
  },
  destructive: {
    default: `linear-gradient(180deg, ${colors.rose["100"]} 0%, #E997A2 100%)`,
    hover: "linear-gradient(180deg, #ED9CA6 0%, #E17582 100%)"
  }
};

const buttonInsetShadows = {
  primary: {
    default:
      "inset 0px 1px 2px rgba(226, 244, 246, 0.9), inset 0px -1px 2px rgba(17, 105, 125, 0.17)",
    hover:
      "inset 0px 1px 2px rgba(226, 244, 246, 0.63), inset 0px -1px 2px rgba(17, 105, 125, 0.28)",
    active: "inset 0px 2px 4px rgba(17, 105, 125, 0.5)"
  },
  secondary: {
    default: "inset 0px -1px 2px #E6E6E6",
    hover: "inset 0px -1px 2px #E0E0E0, inset 0px 1px 2px #FFFFFF",
    active: "inset 0px 2px 4px rgba(71, 75, 77, 0.18)"
  },
  tertiary: {
    default:
      "inset 0px 1px 2px rgba(255, 255, 255, 0.54), inset 0px -1px 2px rgba(163, 63, 20, 0.16)",
    hover:
      "inset 0px 1px 2px rgba(255, 255, 255, 0.5), inset 0px -1px 2px rgba(174, 59, 9, 0.22)",
    active: "inset 0px 2px 4px rgba(154, 67, 29, 0.32)"
  },
  destructive: {
    default:
      "inset 0px 1px 2px #FFFFFF, inset 0px -1px 2px rgba(113, 21, 43, 0.28)",
    hover:
      "inset 0px 1px 2px #FFFFFF, inset 0px -1px 2px rgba(113, 21, 43, 0.35)",
    active: "inset 0px 2px 4px rgba(113, 21, 43, 0.39)"
  }
};

const buttonSecondaryBase = {
  background: buttonGradients.secondary.default,
  borderColor: colors.gray["300"],
  boxShadow: buttonInsetShadows.secondary.default,

  ":hover, :focus": {
    background: buttonGradients.secondary.hover,
    boxShadow: buttonInsetShadows.secondary.hover,
    outline: "none"
  },

  ":active": {
    backgroundColor: colors.gray["200"],
    borderColor: "rgba(71, 75, 77, 0.18)",
    boxShadow: buttonInsetShadows.secondary.active
  },

  ":disabled": {
    background: colors.gray["300"]
  }
};

const buttonLinkBase = {
  border: "none",

  ":hover, :focus": {
    textDecoration: "underline",
    outline: "none"
  },

  ":active, :focus": {
    background: colors.gray["100"]
  },

  ":disabled:hover": {
    textDecoration: "none"
  }
};

const buttons = {
  primary: {
    background: buttonGradients.primary.default,
    borderColor: colors.seaGlass["200"],
    boxShadow: buttonInsetShadows.primary.default,
    color: colors.seaGlass["500"],

    ":hover, :focus": {
      background: buttonGradients.primary.hover,
      boxShadow: buttonInsetShadows.primary.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.seaGlass["200"],
      borderColor: "rgba(17, 105, 125, 0.28)",
      boxShadow: buttonInsetShadows.primary.active
    },

    ":disabled": {
      background: colors.seaGlass["200"]
    }
  },

  secondary: {
    ...buttonSecondaryBase,
    color: colors.gray["500"],

    affirmative: {
      ...buttonSecondaryBase,
      color: colorAliases.brandPrimary
    },

    destructive: {
      ...buttonSecondaryBase,
      color: colorAliases.brandDestructive
    }
  },

  tertiary: {
    background: buttonGradients.tertiary.default,
    borderColor: colorAliases.brandTertiary,
    boxShadow: buttonInsetShadows.tertiary.default,
    color: colors.amber["300"],

    ":hover, :focus": {
      background: buttonGradients.tertiary.hover,
      boxShadow: buttonInsetShadows.tertiary.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colorAliases.brandTertiary,
      borderColor: "rgba(174, 59, 9, 0.22)",
      boxShadow: buttonInsetShadows.tertiary.active
    },

    ":disabled": {
      background: colorAliases.brandTertiary
    }
  },

  destructive: {
    background: buttonGradients.destructive.default,
    borderColor: colorAliases.brandDestructive,
    boxShadow: buttonInsetShadows.destructive.default,
    color: colors.rose["300"],

    ":hover, :focus": {
      background: buttonGradients.destructive.hover,
      boxShadow: buttonInsetShadows.destructive.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colorAliases.brandDestructive,
      borderColor: "rgba(113, 21, 43, 0.35)",
      boxShadow: buttonInsetShadows.destructive.active
    },

    ":disabled": {
      background: colorAliases.brandDestructive
    }
  },

  link: {
    ...buttonLinkBase,
    color: colors.gray["500"],

    affirmative: {
      ...buttonLinkBase,
      color: colorAliases.brandPrimary
    },

    destructive: {
      ...buttonLinkBase,
      color: colorAliases.brandDestructive
    }
  }
};

export default buttons;

// const upload = {
//   cursor: "pointer",
//   backgroundColor: "white",
//   borderLeft: "unset",
//   borderTopLeftRadius: 0,
//   borderBottomLeftRadius: 0,
//   borderTopRightRadius: 2,
//   borderBottomRightRadius: 2,
//   height: "48px",
//   width: "106px",
//   color: "black",
//   border: "base"
// };

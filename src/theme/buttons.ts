import { colors, gradientColorStop } from "./colors";

const buttonGradients = {
  primary: {
    default: `linear-gradient(180deg, ${gradientColorStop.primary[0]} 0%, ${gradientColorStop.primary[1]} 100%)`,
    hover: `linear-gradient(180deg, ${gradientColorStop.primary[1]} 0%, ${gradientColorStop.primary[2]} 100%)`
  },
  secondary: {
    default: `linear-gradient(180deg, ${gradientColorStop.secondary[0]} 0%, ${gradientColorStop.secondary[1]} 100%)`,
    hover: `linear-gradient(180deg, ${gradientColorStop.secondary[1]} 0%, ${gradientColorStop.secondary[2]} 100%)`
  },
  tertiary: {
    default: `linear-gradient(180deg, ${gradientColorStop.tertiary[0]} 0%, ${gradientColorStop.tertiary[1]} 100%)`,
    hover: `linear-gradient(180deg, ${gradientColorStop.tertiary[1]} 0%, ${gradientColorStop.tertiary[2]} 100%)`
  },
  destructive: {
    default: `linear-gradient(180deg, ${gradientColorStop.destructive[0]} 0%, ${gradientColorStop.destructive[1]} 100%)`,
    hover: `linear-gradient(180deg, ${gradientColorStop.destructive[1]} 0%, ${gradientColorStop.destructive[2]} 100%)`
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
      "inset 0px 1px 2px rgba(255, 255, 255, 0.54), inset 0px -1px 2px rgba(113, 21, 43, 0.28)",
    hover:
      "inset 0px 1px 2px rgba(255, 255, 255, 0.54), inset 0px -1px 2px rgba(113, 21, 43, 0.35)",
    active: "inset 0px 2px 4px rgba(113, 21, 43, 0.39)"
  }
};

const buttonSecondaryBase = {
  background: buttonGradients.secondary.default,
  borderColor: colors.brandGray["300"],
  boxShadow: buttonInsetShadows.secondary.default,

  ":hover, :focus": {
    background: buttonGradients.secondary.hover,
    boxShadow: buttonInsetShadows.secondary.hover,
    outline: "none"
  },

  ":active": {
    backgroundColor: colors.brandGray["200"],
    borderColor: "rgba(71, 75, 77, 0.18)",
    boxShadow: buttonInsetShadows.secondary.active
  },

  ":disabled": {
    background: colors.brandGray["300"]
  }
};

const buttonLinkBase = {
  border: "none",

  ":hover, :focus": {
    textDecoration: "underline",
    outline: "none"
  },

  ":active, :focus": {
    background: colors.brandGray["100"]
  },

  ":disabled:hover": {
    textDecoration: "none"
  }
};

const buttons = {
  primary: {
    background: buttonGradients.primary.default,
    borderColor: colors.brandPrimary["200"],
    boxShadow: buttonInsetShadows.primary.default,
    color: colors.brandPrimary["500"],

    ":hover, :focus": {
      background: buttonGradients.primary.hover,
      boxShadow: buttonInsetShadows.primary.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.brandPrimary["200"],
      borderColor: "rgba(17, 105, 125, 0.28)",
      boxShadow: buttonInsetShadows.primary.active
    },

    ":disabled": {
      background: colors.brandPrimary["200"]
    }
  },

  secondary: {
    ...buttonSecondaryBase,
    color: colors.brandGray["500"],

    affirmative: {
      ...buttonSecondaryBase,
      color: colors.brandPrimary["300"]
    },

    destructive: {
      ...buttonSecondaryBase,
      color: colors.brandDestructive["200"]
    }
  },

  tertiary: {
    background: buttonGradients.tertiary.default,
    borderColor: colors.brandTertiary["200"],
    boxShadow: buttonInsetShadows.tertiary.default,
    color: colors.brandTertiary["300"],

    ":hover, :focus": {
      background: buttonGradients.tertiary.hover,
      boxShadow: buttonInsetShadows.tertiary.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.brandTertiary["200"],
      borderColor: "rgba(174, 59, 9, 0.22)",
      boxShadow: buttonInsetShadows.tertiary.active
    },

    ":disabled": {
      background: colors.brandTertiary
    }
  },

  destructive: {
    background: buttonGradients.destructive.default,
    borderColor: colors.brandDestructive["200"],
    boxShadow: buttonInsetShadows.destructive.default,
    color: colors.brandDestructive["300"],

    ":hover, :focus": {
      background: buttonGradients.destructive.hover,
      boxShadow: buttonInsetShadows.destructive.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.brandDestructive["200"],
      borderColor: "rgba(113, 21, 43, 0.35)",
      boxShadow: buttonInsetShadows.destructive.active
    },

    ":disabled": {
      background: colors.brandDestructive["200"]
    }
  },

  link: {
    ...buttonLinkBase,
    color: colors.brandGray["500"],

    affirmative: {
      ...buttonLinkBase,
      color: colors.brandPrimary["300"]
    },

    destructive: {
      ...buttonLinkBase,
      color: colors.brandDestructive["200"]
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

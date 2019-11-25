import { colors, colorGradientStops } from "./colors";
import { darken, lighten, desaturate } from "polished";

const buttonGradients = {
  primary: {
    default: `linear-gradient(180deg, ${colorGradientStops.primary[0]} 0%, ${colorGradientStops.primary[1]} 100%)`,
    hover: `linear-gradient(180deg, ${colorGradientStops.primary[1]} 0%, ${colorGradientStops.primary[2]} 100%)`
  },
  secondary: {
    default: `linear-gradient(180deg, ${colorGradientStops.secondary[0]} 0%, ${colorGradientStops.secondary[1]} 100%)`,
    hover: `linear-gradient(180deg, ${colorGradientStops.secondary[1]} 0%, ${colorGradientStops.secondary[2]} 100%)`
  },
  tertiary: {
    default: `linear-gradient(180deg, ${colorGradientStops.tertiary[0]} 0%, ${colorGradientStops.tertiary[1]} 100%)`,
    hover: `linear-gradient(180deg, ${colorGradientStops.tertiary[1]} 0%, ${colorGradientStops.tertiary[2]} 100%)`
  },
  destructive: {
    default: `linear-gradient(180deg, ${colorGradientStops.destructive[0]} 0%, ${colorGradientStops.destructive[1]} 100%)`,
    hover: `linear-gradient(180deg, ${colorGradientStops.destructive[1]} 0%, ${colorGradientStops.destructive[2]} 100%)`
  }
};

const buttonInsetShadows = {
  primary: {
    default: `inset 0px 1px 2px ${colors.whiteAlpha["700"]}, inset 0px -1px 2px ${colors.blackAlpha["300"]}`,
    hover: `inset 0px 1px 2px ${colors.whiteAlpha["600"]}, inset 0px -1px 2px ${colors.blackAlpha["300"]}`,
    active: `inset 0px 2px 4px ${colors.blackAlpha["300"]}`
  },
  secondary: {
    default: `inset 0px 1px 2px ${colors.white}, inset 0px -1px 2px ${colors.blackAlpha["200"]}`,
    hover: `inset 0px 1px 2px ${colors.white}, inset 0px -1px 2px ${colors.blackAlpha["200"]}`,
    active: `inset 0px 2px 4px ${colors.blackAlpha["200"]}`
  },
  tertiary: {
    default: `inset 0px 1px 2px ${colors.whiteAlpha["700"]}, inset 0px -1px 2px ${colors.blackAlpha["300"]}`,
    hover: `inset 0px 1px 2px ${colors.whiteAlpha["600"]}, inset 0px -1px 2px ${colors.blackAlpha["300"]}`,
    active: `inset 0px 2px 4px ${colors.blackAlpha["300"]}`
  },
  destructive: {
    default: `inset 0px 1px 2px ${colors.whiteAlpha["700"]}, inset 0px -1px 2px ${colors.blackAlpha["300"]}`,
    hover: `inset 0px 1px 2px ${colors.whiteAlpha["600"]}, inset 0px -1px 2px ${colors.blackAlpha["300"]}`,
    active: `inset 0px 2px 4px ${colors.blackAlpha["300"]}`
  }
};

const buttonDisabled = {
  backgroundImage: "none",
  border: "none",
  boxShadow: "none",
  cursor: "not-allowed",
  pointerEvents: "none"
};

const buttonSecondaryBase = {
  backgroundImage: buttonGradients.secondary.default,
  borderColor: colors.brandSecondary["300"],
  boxShadow: buttonInsetShadows.secondary.default,

  ":hover, :focus": {
    backgroundImage: buttonGradients.secondary.hover,
    boxShadow: buttonInsetShadows.secondary.hover,
    outline: "none"
  },

  ":active": {
    backgroundColor: colors.brandSecondary["200"],
    borderColor: darken(0.05, colors.brandSecondary["200"]),
    boxShadow: buttonInsetShadows.secondary.active
  },

  ":disabled": {
    ...buttonDisabled,
    backgroundColor: colors.brandSecondary["100"],
    color: colors.brandSecondary["300"]
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

  ":disabled": {
    opacity: 0.3,
    pointerEvents: "none"
  },

  ":disabled:hover": {
    textDecoration: "none"
  }
};

const buttons = {
  primary: {
    backgroundImage: buttonGradients.primary.default,
    borderColor: colors.brandPrimary["200"],
    boxShadow: buttonInsetShadows.primary.default,
    color: colors.brandPrimary["500"],

    ":hover, :focus": {
      backgroundImage: buttonGradients.primary.hover,
      boxShadow: buttonInsetShadows.primary.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.brandPrimary["100"],
      borderColor: darken(0.05, colors.brandPrimary["200"]),
      boxShadow: buttonInsetShadows.primary.active
    },

    ":disabled": {
      ...buttonDisabled,
      backgroundColor: lighten(0.1, colors.brandPrimary["100"]),
      color: desaturate(0.25, colors.brandPrimary["200"])
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
    backgroundImage: buttonGradients.tertiary.default,
    borderColor: colors.brandTertiary["200"],
    boxShadow: buttonInsetShadows.tertiary.default,
    color: colors.brandTertiary["300"],

    ":hover, :focus": {
      backgroundImage: buttonGradients.tertiary.hover,
      boxShadow: buttonInsetShadows.tertiary.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.brandTertiary["200"],
      borderColor: darken(0.05, colors.brandTertiary["200"]),
      boxShadow: buttonInsetShadows.tertiary.active
    },

    ":disabled": {
      ...buttonDisabled,
      backgroundColor: lighten(0.1, colors.brandTertiary["100"]),
      color: desaturate(0.25, colors.brandTertiary["200"])
    }
  },

  destructive: {
    backgroundImage: buttonGradients.destructive.default,
    borderColor: colors.brandDestructive["200"],
    boxShadow: buttonInsetShadows.destructive.default,
    color: colors.brandDestructive["300"],

    ":hover, :focus": {
      backgroundImage: buttonGradients.destructive.hover,
      boxShadow: buttonInsetShadows.destructive.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.brandDestructive["200"],
      borderColor: darken(0.025, colors.brandDestructive["200"]),
      boxShadow: buttonInsetShadows.destructive.active
    },

    ":disabled": {
      ...buttonDisabled,
      backgroundColor: lighten(0.1, colors.brandDestructive["100"]),
      color: desaturate(0.25, colors.brandDestructive["200"])
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

import { colors, colorGradientStops } from "./colors";

const pillBorder = `1px solid ${colors.baseBorderColor}`;

const networkIndicatorBase = {
  textTransform: "capitalize",
  backgroundColor: colors.white,
  border: pillBorder,
  position: "relative",

  "::before": {
    content: `""`,
    borderRadius: 2,
    position: "relative",
    height: "8px",
    width: "8px",
    mr: 2
  }
};

const pills = {
  status: {
    affirmative: {
      textTransform: "capitalize",
      color: colors.brandPrimary["500"],
      backgroundImage: `linear-gradient(180deg, ${colorGradientStops.primary[0]} 0%, ${colorGradientStops.primary[1]} 100%)`
    },

    negative: {
      textTransform: "capitalize",
      color: colors.brandDestructive["300"],
      backgroundImage: `linear-gradient(180deg, ${colorGradientStops.destructive[0]} 0%, ${colorGradientStops.destructive[1]} 100%)`
    },

    neutral: {
      textTransform: "capitalize",
      color: colors.brandSecondary["500"],
      backgroundImage: `linear-gradient(180deg, ${colorGradientStops.secondary[0]} 0%, ${colorGradientStops.secondary[1]} 100%)`,
      border: pillBorder
    },

    pending: {
      textTransform: "capitalize",
      color: colors.brandPending["300"],
      backgroundImage: `linear-gradient(180deg, ${colorGradientStops.pending[0]} 0%, ${colorGradientStops.pending[1]} 100%)`
    },

    draft: {
      textTransform: "capitalize",
      color: colors.brandTertiary["300"],
      backgroundImage: `linear-gradient(180deg, ${colorGradientStops.tertiary[0]} 0%, ${colorGradientStops.tertiary[1]} 100%)`
    }
  },

  tag: {
    explorer: {
      textTransform: "capitalize",
      color: colors.brandGray["400"],
      backgroundColor: colors.white,
      border: pillBorder,
      active: {
        textTransform: "capitalize",
        color: colors.brandGray["400"],
        backgroundColor: colors.brandGray["200"],
        border: pillBorder
      }
    }
  },

  networkIndicator: {
    rinkeby: {
      ...networkIndicatorBase,

      "&::before": {
        backgroundColor: colors.brandTertiary["200"]
      }
    },

    mainnet: {
      ...networkIndicatorBase,

      "&::before": {
        backgroundColor: colors.brandPrimary["200"]
      }
    }
  },

  notificationCounter: {
    color: colors.white,
    backgroundColor: colors.brandDestructive["200"]
  },

  tabCounter: {
    deselected: {
      backgroundColor: colors.brandGray["200"],
      color: colors.brandGray["400"]
    },

    selected: {
      backgroundColor: colors.brandPrimary["300"],
      color: colors.white
    }
  },

  address: {
    background: 'linear-gradient(180deg, #BCE1E6 0%, #98D4DC 100%)',
  }
};

export default pills;

const colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#111618",
  white: "#fff",

  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },

  // Brand colors
  seaGlass: {
    100: "#BCE1E6",
    200: "#66C0CC",
    300: "#158E9E",
    400: "#11697D",
    500: "#024B5B"
  },

  rose: {
    100: "#F2BAC2",
    200: "#E17582",
    300: "#671328"
  },

  amber: {
    100: "#FDCFB5",
    200: "#FCAF84",
    300: "#9A431D"
  },

  gold: {
    100: "#FFE5B3",
    200: "#FFD78A",
    300: "#B8740E"
  },

  gray: {
    100: "#F8F9FB",
    200: "#EAEBEB",
    300: "#D5D7D8",
    400: "#8D9496",
    500: "#474B4D"
  }
};

// Brand color aliases
const colorAliases = {
  brandPrimary: colors.seaGlass["300"],
  brandPrimaryHover: colors.seaGlass["100"],
  brandSecondary: colors.white,
  brandSecondaryHover: colors.white,
  brandDestructive: colors.rose["200"],
  brandDestructiveHover: colors.rose["100"],
  brandSpecial: colors.amber["200"],
  brandSpecialHover: colors.amber["100"],
  brandAffirmative: colors.seaGlass["200"],
  brandAffirmativeHover: colors.seaGlass["100"],

  // Misc
  inputBg: colors.gray["100"],
  baseBorderColor: colors.gray["200"]
};

export { colors };
export { colorAliases };

import { darken } from "polished";

const colorPalette = {
  black: "#111618",
  white: "#fff",

  blackAlpha: {
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },

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
    200: "#E3828E",
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

// Brand color aliases. The sx prop's 'color' property automatically references this object. Always default to using keys from this object throughout the application in order to favor semantics.
const colors = {
  transparent: "transparent",
  current: "currentColor",
  white: colorPalette.white,
  whiteAlpha: colorPalette.whiteAlpha,
  black: colorPalette.black,
  blackAlpha: colorPalette.blackAlpha,
  brandPrimary: colorPalette.seaGlass,
  brandSecondary: colorPalette.gray,
  brandTertiary: colorPalette.amber,
  brandAffirmative: colorPalette.seaGlass,
  brandPending: colorPalette.gold,
  brandDestructive: colorPalette.rose,
  brandGray: colorPalette.gray,
  brandGold: colorPalette.gold,

  // Misc
  inputBg: colorPalette.gray["100"],
  baseBorderColor: colorPalette.gray["200"]
};

const colorGradientStops = {
  primary: [
    colors.brandPrimary["100"],
    darken(0.05, colors.brandPrimary["100"]),
    darken(0.125, colors.brandPrimary["100"])
  ],
  secondary: [
    colors.white,
    colors.brandSecondary["100"],
    darken(0.02, colors.brandSecondary["100"])
  ],
  tertiary: [
    colors.brandTertiary["100"],
    darken(0.05, colors.brandTertiary["100"]),
    darken(0.125, colors.brandTertiary["100"])
  ],
  pending: [
    colors.brandPending["100"],
    darken(0.05, colors.brandPending["100"]),
    darken(0.125, colors.brandPending["100"])
  ],
  destructive: [
    colors.brandDestructive["100"],
    darken(0.05, colors.brandDestructive["100"]),
    darken(0.125, colors.brandDestructive["100"])
  ]
};

export { colorPalette, colors, colorGradientStops };

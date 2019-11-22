import { colors } from "./colors";

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

const buttonShadows = {
  primary: {
    default:
      "inset 0px 1px 2px rgba(226, 244, 246, 0.9), inset 0px -1px 2px rgba(17, 105, 125, 0.17)",
    hover:
      "inset 0px 1px 2px rgba(226, 244, 246, 0.63), inset 0px -1px 2px rgba(17, 105, 125, 0.28)",
    active: "inset 0px 2px 4px rgba(17, 105, 125, 0.5)"
  },
  secondary: {
    default: "",
    active: ""
  },
  tertiary: {
    default: "",
    active: ""
  }
};

const buttons = {
  primary: {
    background: buttonGradients.primary.default,
    borderColor: colors.seaGlass["200"],
    boxShadow: buttonShadows.primary.default,
    color: colors.seaGlass["500"],

    ":hover, :focus": {
      background: buttonGradients.primary.hover,
      boxShadow: buttonShadows.primary.hover,
      outline: "none"
    },

    ":active": {
      backgroundColor: colors.seaGlass["200"],
      borderColor: "rgba(17, 105, 125, 0.28)",
      boxShadow: buttonShadows.primary.active
    },

    ":disabled": {
      background: colors.seaGlass["200"],
      border: "none",
      boxShadow: "none",
      opacity: 0.3
    }
  }
};

export default buttons;

// Button variants
// const primaryButton = {
//   backgroundColor: colors.seaGlass["200"],
//   borderRadius: 2,
//   border: borders.button.primary,
//   color: colors.seaGlass["500"],
//   cursor: "pointer",
//   boxSizing: "border-box",
//   ":hover": {
//     background: colors.seaGlass["100"],
//     boxShadow: shadows[0]
//   },
//   ":active, :focus": {
//     background: colors.seaGlass["100"]
//   },
//   ":disabled": {
//     background: colors.seaGlass["100"],
//     cursor: "not-allowed",
//     pointerEvents: "disabled",
//     color: colors.gray["200"]
//   }
// };

// const primaryIcon = {
//   ...primaryButton,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "> :first-of-type": { mr: 2 }
// };

// const primaryIconOnly = {
//   ...primaryIcon,
//   height: "40px",
//   width: "40px",
//   "> :first-of-type": { mr: 0 }
// };

// const primarySmall = {
//   ...primaryButton,
//   py: 1,
//   px: 4
// };

// const secondaryButton = {
//   backgroundColor: colors.white,
//   borderRadius: 2,
//   border: borders.button.secondary,
//   color: colors.gray["500"],
//   cursor: "pointer",
//   boxSizing: "border-box",
//   ":hover": {
//     boxSizing: "border-box",
//     boxShadow: shadows[0],
//     color: colors.black
//   },
//   ":active, :focus": {
//     boxSizing: "border-box",
//     color: colors.black
//   },
//   ":disabled": {
//     background: colors.gray["100"],
//     cursor: "not-allowed",
//     color: colors.gray["300"]
//   }
// };

// const secondaryIcon = {
//   ...secondaryButton,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "> :first-of-type": { mr: 2 }
// };

// const secondaryIconOnly = {
//   ...secondaryIcon,
//   width: "40px",
//   height: "40px",
//   "> :first-of-type": { mr: 0 }
// };

// const secondarySmall = {
//   ...secondaryButton,
//   py: 1,
//   px: 4
// };

// const secondarySmallIconOnly = {
//   ...secondarySmall,
//   py: 0,
//   px: 2,
//   "> :first-of-type": { mr: 0 }
// };

// const secondaryAffirmative = {
//   ...secondaryButton,
//   color: colors.seaGlass["300"],
//   ":hover": {
//     ...secondaryButton[":hover"],
//     color: colors.seaGlass["400"]
//   },
//   ":active": {
//     ...secondaryButton[":active"],
//     color: colors.seaGlass["400"]
//   }
// };

// const secondaryAffirmativeIcon = {
//   ...secondaryAffirmative,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "> :first-of-type": { mr: 2 }
// };

// const secondaryAffirmativeIconOnly = {
//   ...secondaryAffirmativeIcon,
//   width: "40px",
//   height: "40px",
//   "> :only-child": { mr: 0 }
// };

// const secondaryAffirmativeSmall = {
//   ...secondaryAffirmative,
//   py: 1,
//   px: 4
// };

// const secondaryDestructive = {
//   ...secondaryAffirmative,
//   color: colors.rose["200"],
//   ":hover": {
//     ...secondaryAffirmative[":hover"],
//     color: colors.rose["300"]
//   },
//   ":active": {
//     ...secondaryAffirmative[":active"],
//     color: colors.rose["300"]
//   }
// };

// const secondaryDestructiveIcon = {
//   ...secondaryDestructive,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "> :first-of-type": { mr: 2 }
// };

// const secondaryDestructiveIconOnly = {
//   ...secondaryDestructiveIcon,
//   width: "40px",
//   height: "40px",
//   "> :only-child": { mr: 0 }
// };

// const secondaryDestructiveSmall = {
//   ...secondaryDestructive,
//   py: 1,
//   px: 4
// };

// const special = {
//   ...primaryButton,
//   backgroundColor: colors.amber["200"],
//   color: colors.amber["300"],
//   ":hover": {
//     ...primaryButton[":hover"],
//     backgroundColor: colors.amber["100"],
//     borderColor: colors.amber["200"],
//     color: colors.rose["300"]
//   },
//   ":active": {
//     ...primaryButton[":active"],
//     backgroundColor: colors.amber["100"],
//     color: colors.rose["300"]
//   },
//   ":disabled": {
//     ...primaryButton[":disabled"],
//     color: primaryButton[":disabled"].color,
//     backgroundColor: colors.amber["100"]
//   }
// };

// const specialIcon = { ...primaryIcon, ...special };

// const specialIconOnly = {
//   ...specialIcon,
//   width: "40px",
//   height: "40px",
//   "> :only-child": { mr: 0 }
// };

// const specialSmall = {
//   ...special,
//   py: 1,
//   px: 4
// };

// const destructive = {
//   ...primaryButton,
//   backgroundColor: colors.rose["200"],
//   color: colors.rose["300"],
//   ":hover": {
//     ...primaryButton[":hover"],
//     backgroundColor: colors.rose["100"],
//     borderColor: colors.rose["200"],
//     color: colors.rose["300"]
//   },
//   ":active, :focus": {
//     ...primaryButton[":active"],
//     backgroundColor: colors.rose["100"],
//     color: colors.rose["300"]
//   },
//   ":disabled": {
//     ...primaryButton[":disabled"],
//     color: primaryButton[":disabled"].color,
//     backgroundColor: colors.rose["100"]
//   }
// };

// const destructiveLink = {
//   ...typography.text.link,
//   color: colors.rose["200"],
//   "&[disabled]": {
//     colors: colors.rose["200"],
//     opacity: 0.3,
//     pointerEvents: "disabled",
//     cursor: "not-allowed"
//   },
//   ":active": {
//     color: colors.rose["300"]
//   }
// };

// const destructiveIcon = {
//   ...destructive,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "> :first-of-type": { mr: 2 }
// };

// const destructiveIconOnly = {
//   ...destructiveIcon,
//   width: "40px",
//   height: "40px",
//   "> :first-of-type": { mr: 0 }
// };

// const destructiveSmall = {
//   ...destructive,
//   py: 1,
//   px: 4
// };

// const tertiary = {
//   backgroundColor: colors.amber["200"],
//   borderRadius: 2,
//   color: colors.amber["300"],
//   cursor: "pointer",
//   boxSizing: "border-box",
//   ":hover": {
//     boxShadow: shadows[0],
//     boxSizing: "border-box",
//     color: colors.amber["300"],
//     background: colors.amber["100"],
//     border: borders.button.tertiary
//   },
//   ":active, :focus": {
//     boxSizing: "border-box"
//   },
//   ":disabled": {
//     background: colors.amber["100"],
//     cursor: "not-allowed",
//     color: colors.gray["100"]
//   }
// };

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

// export const buttons = {
//   primary: primaryButton,
//   primaryIcon,
//   primaryIconOnly,
//   primarySmall,
//   secondary: secondaryButton,
//   secondaryIcon,
//   secondaryIconOnly,
//   secondarySmall,
//   secondarySmallIconOnly,
//   secondaryAffirmative,
//   secondaryAffirmativeIcon,
//   secondaryAffirmativeIconOnly,
//   secondaryAffirmativeSmall,
//   secondaryDestructive,
//   secondaryDestructiveIcon,
//   secondaryDestructiveIconOnly,
//   secondaryDestructiveSmall,
//   special,
//   specialSmall,
//   specialIcon,
//   specialIconOnly,
//   destructive,
//   destructiveLink,
//   destructiveIcon,
//   destructiveIconOnly,
//   destructiveSmall,
//   tertiary,
//   upload
// };

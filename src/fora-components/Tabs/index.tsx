import {
  Tabs,
  TabList as CTabList,
  TabPanels,
  Tab,
  TabPanel as CTabPanel
} from "@chakra-ui/core";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";

const TabList = emotionStyled(CTabList)(props =>
  css({
    border: "none",
    borderBottom: `1px solid ${props.theme.colors.gray["200"]}`,

    button: {
      border: "none",
      background: "none",
      color: props.theme.colors.gray["400"],
      borderBottom: `2px solid transparent`,
      boxSizing: "border-box",
      ...props.theme.text.h5,
      fontWeight: props.theme.fontWeights.regular
    },

    "button[aria-selected=true]": {
      border: "none",
      borderBottom: `2px solid ${props.theme.colors.seaGlass["400"]}`,
      boxSizing: "border-box",
      color: "black",
      fontWeight: props.theme.fontWeights.medium
    }
  })
);

const TabPanel = emotionStyled(CTabPanel)(props =>
  css({
    paddingTop: props.theme.space[6]
  })
);

export { Tabs, Tab, TabList, TabPanels, TabPanel };

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
    borderBottom: `1px solid ${props.theme.colors.brandGray["200"]}`,

    button: {
      border: "none",
      background: "none",
      color: props.theme.colors.brandGray["400"],
      borderBottom: `2px solid transparent`,
      boxSizing: "border-box",
      ...props.theme.text.bodyStrong,
      fontWeight: props.theme.fontWeights.normal
    },

    "button[aria-selected=true]": {
      border: "none",
      borderBottom: `2px solid ${props.theme.colors.brandPrimary["400"]}`,
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

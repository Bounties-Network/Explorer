/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import Tippy from "@tippy.js/react";
import { Global } from "@emotion/core";
import css from "@styled-system/css";
import theme from "theme/theme";

interface IProps {
  content: React.ReactElement<any>;
}

const Tooltip: React.FunctionComponent<IProps> = props => (
  <Tippy
    distance={8}
    trigger={"click"}
    interactive={true}
    content={props.content}
  >
    <div>
      <Global
        styles={css({
          ".tippy-tooltip": {
            boxSizing: "border-box",
            bg: "#F8FCFC",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(2, 75, 91, 0.1)"
          },
          ".tippy-arrow": { display: "none" }, // TODO: Never <_<
          ".tippy-popper": {
            background: "none"
          },
          ".tippy-content": {
            ...theme.text.small,
            fontWeight: "500",
            color: "seaGlass300",
            border: `1px solid hsl(187, 45%, 81%)`,
            borderRadius: 2,
            p: 3
          }
        })}
      ></Global>
      {props.children}
    </div>
  </Tippy>
);

export default Tooltip;

/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex } from "@theme-ui/components";

export type PillProps = {
  variant?: string;
  size?: string;
  shape?: string;
  onClick?: any;
};
const Pill: React.FC<PillProps> = ({
  variant = "primary",
  shape = "rounded",
  size = "small",
  onClick,
  children
}) => (
  <Flex
    onClick={onClick}
    sx={{
      borderRadius: shape === "square" ? 1 : "100px",
      justifyContent: "center",
      alignItems: "center",
      variant: `pills.${variant}`,
      fontSize: size === "large" ? "body" : "small",
      px: size === "large" ? "0.75rem" : 2,
      py: 1,
      cursor: onClick ? 'pointer' : 'default'
    }}
  >
    {children}
  </Flex>
);

export default Pill;

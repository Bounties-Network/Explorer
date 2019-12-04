/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex } from "@theme-ui/components";

export type PillProps = {
  variant?: string;
  size?: string;
  shape?: string;
  children?: any;
};
const Pill: React.FC<PillProps> = ({
  variant = "primary",
  shape = "rounded",
  size = "small",
  children
}) => (
  <Flex
    sx={{
      borderRadius: shape === "square" ? 1 : "100px",
      justifyContent: "center",
      alignItems: "center",
      variant: `pills.${variant}`,
      fontSize: size === "large" ? "body" : "small",
      px: "0.75rem",
      py: 1
    }}
  >
    {children}
  </Flex>
);

export default Pill;

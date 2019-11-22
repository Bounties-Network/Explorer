/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text } from "@theme-ui/components";

export type ButtonProps = {
  variant: string;
  size?: string; // "default" || "small"
  label?: string;
};

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "default",
  label,
  ...props
}) => (
  <button
    {...props}
    sx={{
      appearance: "none",
      display: "inline-block",
      textAlign: "center",
      height: size === "small" ? "32px" : "48px",
      lineHeight: size === "small" ? "32px" : "48px",
      textDecoration: "none",
      fontSize: "sm",
      fontWeight: "medium",
      m: 0,
      px: size === "small" ? 3 : 4,
      py: 0,
      borderRadius: 2,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
      cursor: "pointer",
      // pass variant prop to sx
      variant: `buttons.${variant}`,

      ":disabled:hover": {
        cursor: "not-allowed"
      },

      "> svg": {
        mr: label ? 3 : null,
        textAlign: "center"
      }
    }}
  >
    {props.children}
    <Text sx={{ display: "inline-block" }}>{label}</Text>
  </button>
);

export default Button;

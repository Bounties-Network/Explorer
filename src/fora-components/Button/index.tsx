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
      height: size === "small" ? "2rem" : "3rem",
      minWidth: size === "small" || !label ? "3.25rem" : "9.5rem",
      lineHeight: size === "small" ? "2rem" : "3rem",
      textDecoration: "none",
      fontSize: "sm",
      fontWeight: "medium",
      m: 0,
      px: 3,
      py: 0,
      borderRadius: 2,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
      cursor: "pointer",
      // pass variant prop to sx
      variant: `buttons.${variant}`,
      verticalAlign: "baseline",

      ":disabled": {
        border: "none",
        boxShadow: "none",
        cursor: "not-allowed",
        opacity: 0.3,
        pointerEvents: "none"
      },

      "> svg": {
        mr: label ? 2 : null,
        textAlign: "center"
      }
    }}
  >
    {props.children}
    <Text sx={{ display: "inline-block" }}>{label}</Text>
  </button>
);

export default Button;

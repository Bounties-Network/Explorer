/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";

export type ButtonProps = {
  variant: string;
  size?: string; // "default" || "small"
  label?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>
  ) => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "default",
  label,
  isLoading,
  fullWidth,
  onClick,
  ...props
}) => (
  <button
    {...props}
    sx={{
      appearance: "none",
      display: "inline-block",
      textAlign: "center",
      height: size === "small" ? "inputHeight.sm" : "inputHeight.lg",
      minWidth:
        size === "small" || !label || variant.includes("link")
          ? "buttonWidth.sm"
          : "buttonWidth.lg",
      textDecoration: "none",
      fontSize: "base",
      fontWeight: "medium",
      m: 0,
      px: 3,
      py: 0,
      borderRadius: 2,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
      cursor: "pointer",
      width: fullWidth ? "100%" : "auto",
      // pass variant to sx prop
      variant: `buttons.${variant}`,
      verticalAlign: "middle",

      "> svg": {
        mr: label ? 2 : null,
        textAlign: "center"
      }
    }}
  >
    {props.children}
    {label}
    {isLoading ? (
      <FontAwesomeIcon icon={faSpinnerThird} sx={{ fontSize: "lg" }} spin />
    ) : null}
  </button>
);

export default Button;

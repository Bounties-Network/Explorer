/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Label } from "@rebass/forms";
import { Box } from "@theme-ui/components";

const disabledStyles = {
  bg: "brandGray.200",
  border: "none",
  cursor: "not-allowed",
  "&:hover": {
    border: "unset"
  }
};

const checkedStyles = {
  bg: "brandPrimary.300",
  boxShadow: 3,
  border: "none"
};

const radioStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  height: "18px",
  width: "18px",
  userSelect: "none",
  borderRadius: "50%",
  border: "active",
  borderWidth: "2px",
  transition: "background-color 120ms, box-shadow 250ms",
  color: "white",
  bg: "white",
  "&:hover": {
    border: "input.default",
    borderWidth: "2px"
  },
  "&:disabled": {
    borderColor: "transparent",
    bg: "white",
    color: "brandGray.500"
  },
  "&:focus": {
    boxShadow: "outline"
  }
};

const Radio: React.FC<{
  checked: boolean;
  label: string;
  id: string;
  name: string;
  value: string;
  disabled: boolean;
  onClick: any;
}> = props => {
  return (
    <Label
      sx={{
        "> div:first-of-type": { mr: 2 },
        "&:hover": {
          color: "brandPrimary.300",
          cursor: "pointer",
          "> *": {
            color: "brandPrimary.300"
          }
        }
      }}
      variant="text.body"
      color={props.checked ? "brandPrimary.300" : "brandGray.500"}
      htmlFor={props.name}
      onClick={props.onClick}
    >
      <input type="radio" {...props} />
      <Box
        sx={Object.assign(
          radioStyles,
          props.checked ? checkedStyles : { bg: "white" },
          props.disabled ? disabledStyles : {}
        )}
      >
        {props.checked && !props.disabled && (
          <Box
            sx={{
              bg: "white",
              height: "8px",
              width: "8px",
              mixBlendMode: "normal",
              boxShadow: `0px 2px 4px rgba(17, 22, 24, 0.08), 0px 1px 2px rgba(17, 22, 24, 0.19)`,
              borderRadius: 1
            }}
          ></Box>
        )}
      </Box>
      {props.label}
    </Label>
  )
};

export default Radio;

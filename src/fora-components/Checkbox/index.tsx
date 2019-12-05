/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Label } from "@rebass/forms";
import { Box, Text } from "@theme-ui/components";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import typography from "theme/typography";

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

const checkboxStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  height: "18px",
  width: "18px",
  userSelect: "none",
  borderRadius: 1,
  border: "active",
  borderWidth: "2px",
  transition: "background-color 120ms, box-shadow 250ms",
  color: "white",
  bg: "white",
  "&:disabled": {
    borderColor: "transparent",
    bg: "white",
    color: "brandGray.500"
  },
  "&:focus": {
    boxShadow: "outline"
  }
};

const Checkbox: React.FC<{
  checked: boolean;
  label: string;
  id: string;
  name: string;
  value: string;
  disabled: boolean;
  onChange: any;
}> = props => (
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
  >
    <input {...props} type="checkbox" />
    <Box
      sx={Object.assign(
        checkboxStyles,
        props.checked ? checkedStyles : { bg: "white" },
        props.disabled ? disabledStyles : {}
      )}
    >
      {props.checked && !props.disabled && (
        <FontAwesomeIcon
          sx={{
            color: "white",
            height: "12px",
            width: "12px",
            mixBlendMode: "normal"
          }}
          icon={faCheck}
        ></FontAwesomeIcon>
      )}
    </Box>
    {props.label}
  </Label>
);

export default Checkbox;

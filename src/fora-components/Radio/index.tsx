/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Radio as RRadio, Label } from "@rebass/forms";
import { Text, Flex, Box } from "rebass";

const converted = {
  opacity: 0,
  zIndex: "1",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  "&:hover + label": {
    background: "#bebebe",
    "&::after": {
      content: '""',
      display: "block",
      borderRadius: "50%",
      width: "12px",
      height: "12px",
      margin: "6px",
      background: "#eeeeee"
    }
  },
  "&:checked + label": {
    background: "#db7290",
    border: "1px solid #db7290",
    "&::after": {
      content: '""',
      display: "block",
      borderRadius: "50%",
      width: "12px",
      height: "12px",
      margin: "6px",
      boxShadow: "1px 3px 3px 1px rgba(0, 0, 0, 0.1)",
      background: "white"
    }
  }
};

const disabledStyles = {
  bg: "gray.200",
  border: "none",
  cursor: "not-allowed",
  "&:hover": {
    border: "unset"
  }
};

const checkedStyles = {
  bg: "seaGlass.300",
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
    border: "radioCheckbox",
    borderWidth: "2px"
  },
  "&:disabled": {
    borderColor: "transparent",
    bg: "white",
    color: "gray.500"
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
  onChange: any;
}> = props => (
  <Label
    sx={{ "> div:first-of-type": { mr: 2 } }}
    variant="body"
    color={props.checked ? "seaGlass.300" : "gray.500"}
    fontFamily="secondary"
    htmlFor={props.name}
  >
    <input {...props} type="radio" />
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
);

export default Radio;

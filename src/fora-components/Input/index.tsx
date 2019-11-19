/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Input as RInput } from "@rebass/forms";
import { faCheckCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text } from "rebass";
import theme from "theme/theme";

/**
 * background: #FFFFFF;
/* foraRose/200 */
// border: 2px solid #E17582;
// box-sizing: border-box;
// border-radius: 8px;
type InputProps = {
  value: any;
  onChange: any;
  hasError: boolean;
  isValid: boolean;
  placeholder: string;
  errorMessage?: string;
  helperMessage?: string;
};

const inputStyle = (props: InputProps) => ({
  border: "base",
  borderRadius: 2,
  boxShadow: 3,
  bg: "gray100",
  color: "black",
  "::placeholder": { color: "gray400" },
  "&:focus": { border: "focus", outline: "none" },
  ...theme.text.body,
  fontFamily: "secondary",
  pr: props.isValid && 6
});

const getVariant = props => {
  if (props.hasError) return "error";
};

const Input: React.FunctionComponent<InputProps> = props => (
  <Flex flexDirection="column" sx={{ position: "relative" }}>
    <Flex alignItems="center" sx={{ "> input": { mr: 2 } }}>
      <RInput sx={inputStyle(props)} {...props} variant={getVariant(props)}>
        {props.children}
      </RInput>
      {props.isValid && (
        <FontAwesomeIcon
          sx={{
            color: "seaGlass300",
            position: "absolute",
            top: "12px",
            right: 4
          }}
          icon={faCheckCircle}
        ></FontAwesomeIcon>
      )}
    </Flex>
    {typeof props.helperMessage === "string" && (
      <Text sx={{ mt: 1 }} color="gray400" variant="help">
        {props.helperMessage}
      </Text>
    )}
    {typeof props.errorMessage === "string" && (
      <Text
        sx={{ mt: 1 }}
        color="rose200"
        variant="help"
      >{`* ${props.errorMessage}`}</Text>
    )}
  </Flex>
);

export default Input;

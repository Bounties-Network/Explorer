/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text } from "@theme-ui/components";
import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const panelStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: theme => theme.space[5],
  width: theme => theme.space[5],
  bg: "white",
  mixBlendMode: "normal",
  boxShadow: 0,
  borderRadius: 1,
  cursor: "pointer",
  "&:hover": {
    mixBlendMode: "normal",
    color: "brandPrimary.400",
    bg: "brandGray.200"
  }
};

interface IStepperProps {
  handleClick: any;
  value: number;
}
const Stepper: React.FunctionComponent<IStepperProps> = props => (
  <Flex
    sx={{
      p: theme => theme.space[1],
      bg: "brandGray.100",
      boxShadow: 2,
      borderRadius: 1,
      width: "160px",
      justifyContent:"space-between",
      alignItems:"center"
    }}
  >
    <Flex
      sx={panelStyle}
      onClick={() => props.handleClick(props.value - 1)}
    >
      <FontAwesomeIcon icon={faMinus} sx={{ color: 'brandPrimary.300' }} />
    </Flex>
    <Text variant="body" color='black'>
      {props.value}
    </Text>
    <Flex
      sx={panelStyle}
      onClick={() => props.handleClick(props.value + 1)}
    >
      <FontAwesomeIcon icon={faPlus} sx={{ color: 'brandPrimary.300' }} />
    </Flex>
  </Flex>
);

export default Stepper;

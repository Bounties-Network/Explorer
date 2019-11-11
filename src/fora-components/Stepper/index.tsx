/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text } from "rebass";

const panelStyle = {
  height: 5,
  width: 5,
  bg: 'white',
  mixBlendMode: "normal",
  boxShadow: 0,
  borderRadius: 1,
  cursor: 'pointer',
  '&:hover': { 
    color: 'seaGlass400',
    bg: 'gray100'
  }
}

interface IStepperProps {
  handleClick: any
  value: number
}
const Stepper: React.FunctionComponent<IStepperProps> = props => (
  <Flex
    sx={{ p: 1, bg: 'gray100', boxShadow: 3, borderRadius: 1, width: '160px' }}
    justifyContent="space-between" alignItems="center">
    <Flex justifyContent={'center'} alignItems={'center'} sx={panelStyle} onClick={() => props.handleClick(props.value - 1)}>
      <Text variant='h3' fontFamily='secondary' color='seaGlass300'>-</Text>
    </Flex>
    <Text variant='body' fontFamily='secondary'>{props.value}</Text >
    <Flex justifyContent={'center'} alignItems={'center'} sx={panelStyle} onClick={() => props.handleClick(props.value + 1)}>
      <Text variant='h3' fontFamily='secondary' color='seaGlass300'>+</Text>
    </Flex>
  </Flex>
);

export default Stepper;

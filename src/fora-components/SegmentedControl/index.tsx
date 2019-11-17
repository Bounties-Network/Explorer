import React from "react";
import { Text, Flex } from "rebass";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";

const Container = emotionStyled(Flex)(() =>
  css({
    mixBlendMode: "normal",
    boxShadow: 3,
    borderRadius: 1
  })
);

interface IOptionProps {
  isActive: boolean;
  firstOption?: boolean;
}
const Option = emotionStyled(Flex)<IOptionProps>(
  props =>
    css({
      height: '24px',
      minWidth: '80px',
      width: "fit-content",
      cursor: "pointer",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: props.isActive ? "white" : "gray100",
      mixBlendMode: "normal",
      boxSizing: "border-box"
    }),
  props =>
    props.firstOption
      ? {
          border: props.theme.borders.base,
          borderRight: "none",
          borderTopLeftRadius: props.theme.radii[1],
          borderBottomLeftRadius: props.theme.radii[1]
        }
      : {
          border: props.theme.borders.base,
          borderTopRightRadius: props.theme.radii[1],
          borderBottomRightRadius: props.theme.radii[1]
        }
);

interface IProps {
  firstOption: string;
  firstOptionHandleClick: Function;
  secondOption: string;
  secondOptionHandleClick: Function;
}
const SegmentedControl: React.FC<IProps> = ({
  firstOption,
  firstOptionHandleClick,
  secondOption,
  secondOptionHandleClick
}) => {
  const [activeSegment, setActiveSegment] = React.useState<"first" | "second">(
    "first"
  );
  return (
    <Container>
      <Option
        onClick={() => {
          if (activeSegment === "second") {
            firstOptionHandleClick();
            setActiveSegment("first");
          }
        }}
        isActive={activeSegment === "first"}
        firstOption={true}
      >
        <Text
          color={activeSegment === "first" ? "black" : "gray400"}
          variant="small"
        >
          {firstOption}
        </Text>
      </Option>
      <Option
        onClick={() => {
          if (activeSegment === "first") {
            secondOptionHandleClick();
            setActiveSegment("second");
          }
        }}
        isActive={activeSegment === "second"}
      >
        <Text
          color={activeSegment === "second" ? "black" : "gray400"}
          variant="small"
        >
          {secondOption}
        </Text>
      </Option>
    </Container>
  );
};

export default SegmentedControl;

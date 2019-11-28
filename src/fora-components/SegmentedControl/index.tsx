import React from "react";
import { Text, Flex } from "@theme-ui/components";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";

const Container = emotionStyled(Flex)(() =>
  css({
    mixBlendMode: "normal",
    boxShadow: 2,
    borderRadius: 1,
    p: 1,
  })
);

interface IOptionProps {
  isActive: boolean;
  firstOption?: boolean;
}
const Option = emotionStyled(Flex)<IOptionProps>(
  props =>
    css({
      height: "24px",
      minWidth: "80px",
      width: "fit-content",
      cursor: "pointer",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: props.isActive ? "white" : "transparent",
      mixBlendMode: "normal",
      boxSizing: "border-box",
      boxShadow: props.isActive ? 0 : undefined,
      borderRadius: 1
    }),
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
          color={activeSegment === "first" ? "black" : "brandGray.400"}
          variant="body"
          fontSize={'xs'}
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
          color={activeSegment === "second" ? "black" : "brandGray.400"}
          variant="body"
          fontSize={'xs'}
        >
          {secondOption}
        </Text>
      </Option>
    </Container>
  );
};

export default SegmentedControl;

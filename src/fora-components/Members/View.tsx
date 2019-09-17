import React from "react";
import { Flex } from "rebass";
import styled from "lib/emotion-styled";
import css from "@styled-system/css";
import Member from "./Member";
import mockMemberData from "./mock-members-data";

const Container = styled(Flex)(() =>
  css({
    flexDirection: "column",
    "> div:last-child > div:last-child": {
      display: "none"
    }
  })
);

interface IProps {
  data: typeof mockMemberData;
}

const Members: React.FC<IProps> = ({ data }) => (
  <Container>{data.map(Member)}</Container>
);

export default Members;

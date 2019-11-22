import React from "react";
import { Flex, Button } from "rebass";
import styled from "lib/emotion-styled";
import css from "@styled-system/css";
import Member from "./Member";
import mockMemberData from "./mock-members-data";

const Container = styled(Flex)(() =>
  css({
    flexDirection: "column",
    "> :last-child": { mt: 6 }
  })
);

interface IProps {
  data: typeof mockMemberData;
  loadMore: () => void;
}

const Members: React.FC<IProps> = ({ data, loadMore }) => (
  <Container>
    {data.map(Member)}
    <Button
      onClick={loadMore}
      variant="secondary"
      color="seaGlass.300"
      width={"100%"}
    >
      Load More
    </Button>
  </Container>
);

export default Members;

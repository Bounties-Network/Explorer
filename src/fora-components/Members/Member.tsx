import React from "react";
import { Flex, Text } from "rebass";
import moment from "moment";
import css from "@styled-system/css";
import emotionStyled from "lib/emotion-styled";
import Avatar from "fora-components/Avatar";
import { IMember } from "./mock-members-data";
import Divider from "fora-components/Divider";

const Container = emotionStyled(Flex)(() =>
  css({
    flexDirection: "row",
    alignItems: "center",
    "> :first-child": { mr: 6 },
    "> :nth-child(2)": { ml: "auto" }
  })
);

const Member: React.FC<IMember> = ({
  name,
  screenName,
  address,
  joinedTimestamp
}) => (
  <Flex width={570} flexDirection="column">
    <Container>
      <Avatar
        variant={"medium"}
        name={name}
        screenName={screenName}
        address={address}
        resourceType={"user"}
        onDark={false}
      ></Avatar>
      <Text
        fontFamily="secondary"
        variant="body"
        color="gray.400"
      >{`Joined ${moment(joinedTimestamp).fromNow()}`}</Text>
    </Container>
    <Divider></Divider>
  </Flex>
);

export default Member;

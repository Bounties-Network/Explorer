import React from "react";
import { Text, Flex } from "rebass";
import styled from "lib/emotion-styled";
import css from "@styled-system/css";
import Avatar from "fora-components/Avatar";
import Divider from "fora-components/Divider";

const Container = styled(Flex)(() =>
  css({
    flexDirection: "row",
    alignItems: "center",
    "> :first-child": { mr: 6 },
    "> :nth-child(2)": { mr: "auto" }
  })
);

interface IProps {
  position: number;
  name: string;
  screenName: string;
  address: string;
  ethInUSD: number;
  ethAmount: number;
}
const LeaderboardEntry: React.FC<IProps> = ({
  position,
  name,
  screenName,
  address,
  ethInUSD,
  ethAmount
}) => (
  <Flex width={570} flexDirection="column">
    <Container>
      <Text variant="h2">{position > 0 ? position : 1}</Text>
      <Avatar
        variant={"medium"}
        name={name}
        screenName={screenName}
        address={address}
        resourceType={"user"}
        onDark={false}
      ></Avatar>
      <Flex flexDirection="column">
        <Text color="seaGlass.400" variant="h3">{`$${ethInUSD}`}</Text>
        <Text
          fontFamily="secondary"
          variant="body"
          color="gray.300"
        >{`${ethAmount} ETH`}</Text>
      </Flex>
    </Container>
    <Divider></Divider>
  </Flex>
);

export default LeaderboardEntry;

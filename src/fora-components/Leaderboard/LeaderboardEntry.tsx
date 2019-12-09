/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text, Flex } from "@theme-ui/components";
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
  address: string;
  ethInUSD: number;
  ethAmount: number;
}
const LeaderboardEntry: React.FC<IProps> = ({
  position,
  name,
  address,
  ethInUSD,
  ethAmount
}) => (
    <Flex sx={{
      width: 570,
      flexDirection: "column"
  }}>
    <Container>
      <Text variant='numeric' sx={{ fontSize: 'h2', width: '25px' }}>{position > 0 ? position : 1}</Text>
      <Avatar
        size={"medium"}
        name={name}
        address={address}
        onDark={false}
      ></Avatar>
        <Flex sx={{
          flexDirection: "column",
          alignItems: "flex-end"
        }}>
          <Text
            variant="numeric"
            color="brandPrimary.400" sx={{ fontSize: 'h3' }}>{`$${ethInUSD}`}</Text>
        <Text
          variant="body"
          color="brandGray.300"
        >{`${ethAmount} ETH`}</Text>
      </Flex>
    </Container>
    <Divider></Divider>
  </Flex>
);

export default LeaderboardEntry;

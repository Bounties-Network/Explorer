/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link } from "@theme-ui/components";
import moment from "moment";

const Container = props => (
  <Flex
    {...props}
    sx={{
      color: "brandGray.400",
      fontSize: "sm",
      mt: "3"
    }}
  />
);

export interface IProps {
  communityId: string;
  communityName: string;
  timestamp: number | string;
}

const MetaData: React.FC<IProps> = ({
  timestamp,
  communityName,
  communityId
}) => (
  <Container>
    <Text>{moment(timestamp).fromNow()}</Text>
    <Text as="span">{"・"}</Text>
    <Link
      href={`/community/${communityId}`}
      sx={{
        color: "brandGray.400",
        "&:hover": { color: "brandPrimary.300" }
      }}
    >
      {`f/${communityName}`}
    </Link>
  </Container>
);
export default MetaData;

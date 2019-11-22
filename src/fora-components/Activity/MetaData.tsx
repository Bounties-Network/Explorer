/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link } from "@theme-ui/components";
import moment from "moment";
import { colorAliases } from "theme/colors";

const Container = props => (
  <Flex
    {...props}
    sx={{
      color: "gray.400",
      fontSize: "sm",
      mt: "3"
    }}
  />
);

export default interface IProps {
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
        color: "gray.400",
        "&:hover": { color: colorAliases.brandPrimary }
      }}
    >
      {`f/${communityName}`}
    </Link>
  </Container>
);
export default MetaData;

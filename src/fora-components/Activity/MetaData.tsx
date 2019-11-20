/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link } from "@theme-ui/components";
import moment from "moment";
import { colorAliases } from "theme/colors";

interface IProps {
  communityId: string;
  communityName: string;
  timestamp: number | string;
}
const MetaData: React.FC<IProps> = ({
  timestamp,
  communityName,
  communityId
}) => (
  <Flex sx={{ color: "gray.400", fontSize: "sm" }}>
    <Text>{moment(timestamp).fromNow()}</Text>
    <Text>{"・"}</Text>
    <Link
      href={`/community/${communityId}`}
      sx={{
        color: "gray.400",
        "&:hover": { color: colorAliases.brandPrimary }
      }}
    >
      {`f/${communityName}`}
    </Link>
  </Flex>
);
export default MetaData;

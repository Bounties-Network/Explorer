/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text, Link } from "@theme-ui/components";
import Description from "./Description";

export interface IContributionProps {
  activityType: "contribution";
  authorName: string | undefined;
  bountyTitle: string;
  ethContributionAmount: number;
  href?: string;
}

const Contribution: React.FC<IContributionProps> = ({
  authorName,
  ethContributionAmount,
  bountyTitle,
  href
}) => (
  <Description authorName={authorName}>
    <Text>{` just contributed `}</Text>
    <Text
      variant="bodyStrong"
      sx={{ color: "black" }}
    >{`${ethContributionAmount} ETH`}</Text>
    <Text>{` to  `}</Text>
    <Link href={href} sx={{ fontWeight: "medium" }}>
      {bountyTitle}
    </Link>
  </Description>
);

export default Contribution;

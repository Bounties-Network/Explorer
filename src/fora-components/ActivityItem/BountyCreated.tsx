/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text } from "@theme-ui/components";
import PreviewCard from "fora-components/Card/PreviewCard";
import Description from "./Description";

export interface IBountyCreatedProps {
  activityType: "bountyCreated";
  authorName: string | undefined;
  bountyTitle: string;
  bountyStatus: string;
  bountyExpirationTimestamp: string;
  submissionCount: number;
}
const BountyCreated: React.FC<IBountyCreatedProps> = ({
  authorName,
  bountyTitle,
  bountyStatus,
  bountyExpirationTimestamp,
  submissionCount
}) => (
  <React.Fragment>
    <Description authorName={authorName} mb="4">
      <Text>{` created a bounty`}</Text>
    </Description>
    <PreviewCard
      status={bountyStatus}
      title={bountyTitle}
      expirationTimestamp={bountyExpirationTimestamp}
      submissionCount={submissionCount}
      ethInUSD={435}
      ethAmount={0.56}
      href={"https://www.google.co.uk"}
    />
  </React.Fragment>
);

export default BountyCreated;

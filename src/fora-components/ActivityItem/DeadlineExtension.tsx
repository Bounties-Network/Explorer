/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text } from "@theme-ui/components";
import moment from "moment";
import PreviewCard from "fora-components/Card/PreviewCard";
import Description from "./Description";

export interface IDeadlineExtensionProps {
  activityType: "deadlineExtension";
  authorName: string | undefined;
  bountyTitle: string;
  bountyStatus: string;
  bountyExtensionDate: number;
  bountyExpirationTimestamp: string;
  submissionCount: number;
}
const DeadlineExtension: React.FC<IDeadlineExtensionProps> = ({
  authorName,
  bountyTitle,
  bountyStatus,
  bountyExtensionDate,
  bountyExpirationTimestamp,
  submissionCount
}) => (
  <React.Fragment>
    <Description sx={{ mb: 4 }} authorName={authorName}>
      <Text>{` extended their bounty's deadline to `}</Text>
      <Text variant="bodyStrong" sx={{ color: "black" }}>
        {moment(bountyExtensionDate).format("DD/MM/YY")}
      </Text>
    </Description>
    <PreviewCard
      href={"https://www.google.co.uk"}
      status={bountyStatus}
      title={bountyTitle}
      expirationTimestamp={bountyExpirationTimestamp}
      submissionCount={submissionCount}
      ethInUSD={435}
      ethAmount={0.56}
    />
  </React.Fragment>
);

export default DeadlineExtension;

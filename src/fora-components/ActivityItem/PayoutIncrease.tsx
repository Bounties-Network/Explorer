/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text } from "rebass";
import PreviewCard from "fora-components/Card/PreviewCard";
import Description from "./Description";

export interface IPayoutIncreaseProps {
  activityType: "payoutIncrease";
  authorName: string | undefined;
  bountyTitle: string;
  bountyStatus: string;
  bountyPayoutIncreaseAmount: number;
  bountyExpirationTimestamp: string;
  submissionCount: number;
}
const PayoutIncrease: React.FC<IPayoutIncreaseProps> = ({
  authorName,
  bountyTitle,
  bountyStatus,
  bountyPayoutIncreaseAmount,
  bountyExpirationTimestamp,
  submissionCount
}) => (
  <React.Fragment>
    <Description sx={{ mb: 4 }} authorName={authorName}>
      <Text>{` increased their bounty's payout to `}</Text>
      <Text
        variant="bodyStrong"
        sx={{ color: "black" }}
      >{`${bountyPayoutIncreaseAmount} ETH`}</Text>
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

export default PayoutIncrease;

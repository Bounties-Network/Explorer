/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text, Link } from "@theme-ui/components";
import Description from "./Description";

export interface ISubmissionAcceptedProps {
  activityType: "submissionAccepted";
  authorName: string | undefined;
  bountyTitle: string;
  href?: string;
}
const SubmissionAccepted: React.FC<ISubmissionAcceptedProps> = ({
  authorName,
  bountyTitle,
  href
}) => (
  <Description authorName={authorName}>
    <Text>{` submission to `}</Text>
    <Link href={href} sx={{ fontWeight: "medium" }}>
      {bountyTitle}
    </Link>
    <Text>{"was accepted!"}</Text>
  </Description>
);

export default SubmissionAccepted;

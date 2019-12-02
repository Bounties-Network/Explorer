/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text, Link } from "@theme-ui/components";
import Description from "./Description";

export interface ISubmissionProps {
  activityType: "submission";
  authorName: string | undefined;
  bountyTitle: string;
  href?: string;
}

const Submission: React.FC<ISubmissionProps> = ({
  authorName,
  bountyTitle,
  href
}) => (
  <Description authorName={authorName}>
    <Text mx="1">{`submitted to`}</Text>
    <Link variant='text.link' href={href} sx={{ fontWeight: "medium" }}>
      {bountyTitle}
    </Link>
  </Description>
);

export default Submission;

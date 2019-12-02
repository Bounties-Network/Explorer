import React from "react";
import { Text, Link } from "@theme-ui/components";
import Description from "./Description";

export interface ICommentPreviewProps {
  activityType: "commentPreview";
  authorName: string | undefined;
  bountyTitle: string;
  href?: string;
}

const CommentPreview: React.FC<ICommentPreviewProps> = ({
  authorName,
  bountyTitle,
  href
}) => (
  <Description authorName={authorName}>
    <Text>{` commented on `}</Text>
    <Link href={href} sx={{ fontWeight: "medium" }}>
      {bountyTitle}
    </Link>
  </Description>
);

export default CommentPreview;

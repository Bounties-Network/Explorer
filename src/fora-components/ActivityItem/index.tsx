import React from "react";
import Submission, { ISubmissionProps } from "./Submission";
import CommentPreview, { ICommentPreviewProps } from "./CommentPreview";
import BountyCreated, { IBountyCreatedProps } from "./BountyCreated";
import LeaderboardRank, { ILeaderboardRankProps } from "./LeaderboardRank";
import SubmissionAccepted, {
  ISubmissionAcceptedProps
} from "./SubmissionAccepted";
import Contribution, { IContributionProps } from "./Contribution";
import DeadlineExtension, {
  IDeadlineExtensionProps
} from "./DeadlineExtension";
import PayoutIncrease, { IPayoutIncreaseProps } from "./PayoutIncrease";
import { Flex, Box } from "@theme-ui/components";
import AvatarImage from "fora-components/AvatarImage";
import MetaData from "./MetaData";

export type IActivityTypeProps =
  | ISubmissionProps
  | ICommentPreviewProps
  | IBountyCreatedProps
  | ILeaderboardRankProps
  | ISubmissionAcceptedProps
  | IContributionProps
  | IDeadlineExtensionProps
  | IPayoutIncreaseProps;

function isSubmission(props: ISubmissionProps): props is ISubmissionProps {
  return props.activityType === "submission";
}

function isCommentPreview(
  props: ICommentPreviewProps
): props is ICommentPreviewProps {
  return props.activityType === "commentPreview";
}

function isBountyCreated(
  props: IBountyCreatedProps
): props is IBountyCreatedProps {
  return props.activityType === "bountyCreated";
}

function isLeaderboardRank(
  props: ILeaderboardRankProps
): props is ILeaderboardRankProps {
  return props.activityType === "leaderboardRank";
}

function isSubmissionAccepted(
  props: ISubmissionAcceptedProps
): props is ISubmissionAcceptedProps {
  return props.activityType === "submissionAccepted";
}

function isContribution(
  props: IContributionProps
): props is IContributionProps {
  return props.activityType === "contribution";
}

function isDeadlineExtension(
  props: IDeadlineExtensionProps
): props is IDeadlineExtensionProps {
  return props.activityType === "deadlineExtension";
}

function isPayoutIncrease(
  props: IPayoutIncreaseProps
): props is IPayoutIncreaseProps {
  return props.activityType === "payoutIncrease";
}

const ActivityItemContent = props => {
  switch (props.activityType) {
    case "submission": {
      if (isSubmission(props)) {
        return <Submission {...props} />;
      }
    }
    case "commentPreview": {
      if (isCommentPreview(props)) {
        return <CommentPreview {...props} />;
      }
    }
    case "bountyCreated": {
      if (isBountyCreated(props)) {
        return <BountyCreated {...props} />;
      }
    }
    case "leaderboardRank": {
      if (isLeaderboardRank(props)) {
        return <LeaderboardRank {...props} />;
      }
    }
    case "submissionAccepted": {
      if (isSubmissionAccepted(props)) {
        return <SubmissionAccepted {...props} />;
      }
    }
    case "contribution": {
      if (isContribution(props)) {
        return <Contribution {...props} />;
      }
    }
    case "deadlineExtension": {
      if (isDeadlineExtension(props)) {
        return <DeadlineExtension {...props} />;
      }
    }
    case "payoutIncrease": {
      if (isPayoutIncrease(props)) {
        return <PayoutIncrease {...props} />;
      }
    }
    default: {
      throw new Error("Invalid activity props");
    }
  }
};

export type ActivityItemProps = {
  avatarSrc: string | undefined;
  timestamp: string;
  communityName: string;
  communityId: string;
  authorName: string | undefined;
  authorAddress: string;
  activityType: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({
  avatarSrc,
  timestamp,
  communityName,
  communityId,
  authorName,
  authorAddress,
  ...props
}) => (
  <Box sx={{ px: ["2", "0"] }}>
    <Flex sx={{ my: "3" }}>
      <AvatarImage address={authorAddress} src={avatarSrc} variant="user" />
      <Flex sx={{ width: "100%", flexDirection: "column", ml: "3" }}>
        <ActivityItemContent {...props} authorName={authorName} />
        <MetaData
          timestamp={timestamp}
          communityName={communityName}
          communityId={communityId}
        />
      </Flex>
    </Flex>
  </Box>
);

export default ActivityItem;

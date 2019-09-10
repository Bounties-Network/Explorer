import React from 'react';
import Submission, { ISubmissionProps } from './Submission';
import CommentPreview, { ICommentPreviewProps } from './CommentPreview';
import BountyCreated, { IBountyCreatedProps } from './BountyCreated';
import LeaderboardRank, { ILeaderboardRankProps } from './LeaderboardRank';
import SubmissionAccepted, {
  ISubmissionAcceptedProps
} from './SubmissionAccepted';
import Contribution, { IContributionProps } from './Contribution';
import DeadlineExtension, {
  IDeadlineExtensionProps
} from './DeadlineExtension';
import PayoutIncrease, { IPayoutIncreaseProps } from './PayoutIncrease';

export type IActivityProps =
  | ISubmissionProps
  | ICommentPreviewProps
  | IBountyCreatedProps
  | ILeaderboardRankProps
  | ISubmissionAcceptedProps
  | IContributionProps
  | IDeadlineExtensionProps
  | IPayoutIncreaseProps;

function isSubmission(props: IActivityProps): props is ISubmissionProps {
  return props.activityType === 'submission';
}

function isCommentPreview(
  props: IActivityProps
): props is ICommentPreviewProps {
  return props.activityType === 'commentPreview';
}

function isBountyCreated(
  props: IBountyCreatedProps
): props is IBountyCreatedProps {
  return props.activityType === 'bountyCreated';
}

function isLeaderboardRank(
  props: ILeaderboardRankProps
): props is ILeaderboardRankProps {
  return props.activityType === 'leaderboardRank';
}

function isSubmissionAccepted(
  props: ISubmissionAcceptedProps
): props is ISubmissionAcceptedProps {
  return props.activityType === 'submissionAccepted';
}

function isContribution(
  props: IContributionProps
): props is IContributionProps {
  return props.activityType === 'contribution';
}

function isDeadlineExtension(
  props: IDeadlineExtensionProps
): props is IDeadlineExtensionProps {
  return props.activityType === 'deadlineExtension';
}

function isPayoutIncrease(
  props: IPayoutIncreaseProps
): props is IPayoutIncreaseProps {
  return props.activityType === 'payoutIncrease';
}

const Activity: React.FC<IActivityProps> = props => {
  switch (props.activityType) {
    case 'submission': {
      if (isSubmission(props)) {
        return <Submission {...props} />;
      }
    }
    case 'commentPreview': {
      if (isCommentPreview(props)) {
        return <CommentPreview {...props} />;
      }
    }
    case 'bountyCreated': {
      if (isBountyCreated(props)) {
        return <BountyCreated {...props} />;
      }
    }
    case 'leaderboardRank': {
      if (isLeaderboardRank(props)) {
        return <LeaderboardRank {...props} />;
      }
    }
    case 'submissionAccepted': {
      if (isSubmissionAccepted(props)) {
        return <SubmissionAccepted {...props} />;
      }
    }
    case 'contribution': {
      if (isContribution(props)) {
        return <Contribution {...props} />;
      }
    }
    case 'deadlineExtension': {
      if (isDeadlineExtension(props)) {
        return <DeadlineExtension {...props} />;
      }
    }
    case 'payoutIncrease': {
      if (isPayoutIncrease(props)) {
        return <PayoutIncrease {...props} />;
      }
    }
    default: {
      throw new Error('Invalid activity props');
    }
  }
};

export default Activity;

const plus = ['far', 'plus-circle'];
const level_up = ['far', 'level-up'];
const star = ['far', 'star'];
const comment = ['far', 'comment'];
const general = ['far', 'star'];

export const notification_template = {
  FulfillmentSubmitted: {
    message: 'You made a submission',
    icon: level_up
  },
  FulfillmentSubmittedIssuer: {
    message: 'You received a submission',
    icon: level_up
  },
  BountyActivated: {
    message: 'You posted a new bounty',
    icon: plus
  },
  FulfillmentAccepted: {
    message: 'You accepted a submission',
    icon: level_up
  },
  FulfillmentAcceptedFulfiller: {
    message: 'Your submission was accepted',
    icon: level_up
  },
  BountyExpired: {
    message: 'Your bounty expired',
    icon: general
  },
  BountyIssued: {
    message: 'You issued a new bounty',
    icon: plus
  },
  BountyKilled: {
    message: 'You killed a bounty',
    icon: general
  },
  ContributionAdded: {
    message: 'You made a contribution',
    icon: level_up
  },
  DeadlineExtended: {
    message: 'You extended the deadline',
    icon: general
  },
  BountyChanged: {
    message: 'You updated a draft',
    icon: general
  },
  IssuerTransferred: {
    message: 'You transferred ownernship',
    icon: general
  },
  TransferRecipient: {
    message: 'A bounty was transferred to you',
    icon: plus
  },
  PayoutIncreased: {
    message: 'You increased the payout',
    icon: general
  },
  BountyComment: {
    message: 'You commented on',
    icon: comment
  },
  BountyIssuedActivated: {
    message: 'You posted a new bounty',
    icon: plus
  },
  FulfillmentUpdated: {
    message: 'You updated your submission to',
    icon: level_up
  },
  FulfillmentUpdatedIssuer: {
    message: 'A submission for your bounty was updated:',
    icon: general
  },
  RatingIssued: {
    message: 'You wrote a review:',
    icon: star
  },
  RatingReceived: {
    message: 'You received a rating:',
    icon: star
  },
  ProfileUpdated: {
    message: 'You updated your profile',
    icon: level_up
  }
};

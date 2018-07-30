export const DIFFICULTY_OPTIONS = [
  { value: 0, label: 'Beginner' },
  { value: 1, label: 'Intermediate' },
  { value: 2, label: 'Expert' }
];

// true and false to correspond with paysTokens field on the bounty model
export const PAYOUT_OPTIONS = [
  { value: false, label: 'ETH' },
  { value: true, label: 'ERC20 Token' }
];

// true and false to corresponds with activateNow
export const ACTIVATE_OPTIONS = [
  { value: true, label: 'Now' },
  { value: false, label: 'Later' }
];

export const UPLOAD_KEY = 'profilePhoto';

export const EMAIL_NOTIFICATION_OPTIONS = {
  RatingIssued: 'RatingIssued',
  TransferRecipient: 'TransferRecipient',
  BountyComment: 'BountyComment',
  BountyExpired: 'BountyExpired',
  FulfillmentUpdatedIssuer: 'FulfillmentUpdatedIssuer',
  FulfillmentSubmittedIssuer: 'FulfillmentSubmittedIssuer',
  FulfillmentAcceptedFulfiller: 'FulfillmentAcceptedFulfiller',
  activity: 'activity'
};
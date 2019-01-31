export const DIFFICULTY_OPTIONS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Expert', label: 'Expert' }
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

export const VISIBILITY_OPTIONS = [
  { value: false, label: 'Public' },
  { value: true, label: 'Private' }
];

export const APPROVAL_OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

export const UPLOAD_KEY = 'createBounty';

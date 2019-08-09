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
  { value: true, label: 'Hidden' }
];

export const APPROVAL_OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

export const UPLOAD_KEY = 'createBounty';

export const templates = [
  {
    value: 'default',
    about:
      'This is a short description of the template that has been selected above. It provides some insight into how this template might be used, in addition to some potential example use cases.',
    description: ''
  },
  { value: 'proof-of-action', label: 'Proof of Action' },
  { value: 'code', label: 'Code' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'translation', label: 'Translation' },
  { value: 'idea-generation', label: 'Idea Generation' },
  { value: 'feedback-and-critique', label: 'Feedback & Critique' },
  { value: 'survey', label: 'Survey' },
  { value: 'recruitment', label: 'Recruitment' }
];

export const templateOptions = [
  { value: 'default', label: 'Default' },
  { value: 'proof-of-action', label: 'Proof of Action' },
  { value: 'code', label: 'Code' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'translation', label: 'Translation' },
  { value: 'idea-generation', label: 'Idea Generation' },
  {
    value: 'feedback-and-critique',
    label: 'Feedback & Critique'
  },
  { value: 'survey', label: 'Survey' },
  { value: 'recruitment', label: 'Recruitment' }
];

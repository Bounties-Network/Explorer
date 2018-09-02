import config from 'public-modules/config';

export const HTTP_200_OK = 200;
export const HTTP_300_MULTIPLE_CHOICES = 300;
export const HTTP_400_BAD_REQUEST = 400;
export const HTTP_401_UNAUTHORIZED = 401;
export const HTTP_401_MOD_UNAUTHORIZED = 40101;
export const HTTP_403_FORBIDDEN = 403;
export const HTTP_404_NOT_FOUND = 404;
export const HTTP_404_MOD_NOT_FOUND = 40401;
export const HTTP_422_UNKNOWN = 422;
export const HTTP_500_INTERNAL_SERVER_ERROR = 500;
export const HTTP_503_SERVICE_UNAVAILABLE = 503;

let API_ENDPOINT = config.url.mainNet;
//let API_ENDPOINT = 'http://localhost:8000';
// update this to be an env passthrough
export const apiEndpoint = {
  set: endpoint => (API_ENDPOINT = endpoint),
  get: () => API_ENDPOINT
};

export const DEFAULT_MARKDOWN = `# Description
- Description of the bounty
# Definition of Done
- Definition 1
- Definition 2
# Requirements
A correct submission will:
- requirement 1
- requirement 2
- requirement 3
# Revisions
We will require at most 3 revisions for submitted work
`;

export const NOTIFICATION_ID = {
  FULFILLMENT_SUBMITTED: 0,
  FULFILLMENT_SUBMITTED_ISSUER: 1,
  BOUNTY_ACTIVATED: 2,
  FULFILLMENT_ACCEPTED: 3,
  FULFILLMENT_ACCEPTED_FULFILLER: 4,
  // BOUNTY_EXPIRED: 5
  BOUNTY_ISSUED: 6,
  BOUNTY_KILLED: 7,
  CONTRIBUTION_ADDED: 8,
  DEADLINE_EXTENDED: 9,
  BOUNTY_CHANGED: 10,
  ISSUER_TRANSFERRED: 11,
  TRANSFER_RECIPIENT: 12,
  PAYOUT_INCREASED: 13,
  BOUNTY_EXPIRED: 14,
  // ^^^ using this one for now since that is how the api is coding them
  // definitely need to fix this at some point :-)
  BOUNTY_COMMENT_RECEIVED: 15,
  BOUNTY_ISSUED_ACTIVATED: 16,
  FULFILLMENT_UPDATED: 17,
  FULFILLMENT_UPDATED_ISSUER: 18,
  RATING_ISSUED: 19,
  RATING_RECEIVED: 20,
  PROFILE_UPDATED: 21,
  COMMENT_ISSUED: 22,
  DRAFT_CREATED: 23,
  DRAFT_UPDATED: 24
};

const plus = ['far', 'plus-circle'];
const level_up = ['far', 'level-up'];
const star = ['far', 'star'];
const comment = ['far', 'comment'];
const general = ['far', 'star'];

export const notification_template = {
  [NOTIFICATION_ID.FULFILLMENT_SUBMITTED]: {
    message: 'You made a submission to',
    icon: level_up
  },
  [NOTIFICATION_ID.FULFILLMENT_SUBMITTED_ISSUER]: {
    message: 'You received a submission',
    icon: level_up
  },
  [NOTIFICATION_ID.BOUNTY_ACTIVATED]: {
    message: 'You activated a bounty',
    icon: plus
  },
  [NOTIFICATION_ID.FULFILLMENT_ACCEPTED]: {
    message: 'You accepted a submission',
    icon: level_up
  },
  [NOTIFICATION_ID.FULFILLMENT_ACCEPTED_FULFILLER]: {
    message: 'Your submission was accepted',
    icon: level_up
  },
  [NOTIFICATION_ID.BOUNTY_EXPIRED]: {
    message: 'Your bounty expired',
    icon: general
  },
  [NOTIFICATION_ID.BOUNTY_ISSUED]: {
    message: 'You issued a new bounty',
    icon: plus
  },
  [NOTIFICATION_ID.BOUNTY_KILLED]: {
    message: 'You killed a bounty',
    icon: general
  },
  [NOTIFICATION_ID.CONTRIBUTION_ADDED]: {
    message: 'You made a contribution to',
    icon: level_up
  },
  [NOTIFICATION_ID.DEADLINE_EXTENDED]: {
    message: 'You extended the deadline on',
    icon: general
  },
  [NOTIFICATION_ID.BOUNTY_CHANGED]: {
    message: 'You updated your draft bounty',
    icon: general
  },
  [NOTIFICATION_ID.ISSUER_TRANSFERRED]: {
    message: 'You transferred ownernship of the bounty',
    icon: general
  },
  [NOTIFICATION_ID.TRANSFER_RECIPIENT]: {
    message: 'A bounty was transferred to you',
    icon: plus
  },
  [NOTIFICATION_ID.PAYOUT_INCREASED]: {
    message: 'You increased the payout on',
    icon: general
  },
  [NOTIFICATION_ID.BOUNTY_COMMENT_RECEIVED]: {
    message: 'You received a comment',
    icon: comment
  },
  [NOTIFICATION_ID.BOUNTY_ISSUED_ACTIVATED]: {
    message: 'You posted a new bounty',
    icon: plus
  },
  [NOTIFICATION_ID.FULFILLMENT_UPDATED]: {
    message: 'You updated your submission to',
    icon: level_up
  },
  [NOTIFICATION_ID.FULFILLMENT_UPDATED_ISSUER]: {
    message: 'A submission was updated for your bounty',
    icon: general
  },
  [NOTIFICATION_ID.RATING_ISSUED]: {
    message: 'You wrote a review on',
    icon: star
  },
  [NOTIFICATION_ID.RATING_RECEIVED]: {
    message: 'You received a rating',
    icon: star
  },
  [NOTIFICATION_ID.PROFILE_UPDATED]: {
    message: 'You updated your profile',
    icon: level_up
  },
  [NOTIFICATION_ID.COMMENT_ISSUED]: {
    message: 'You wrote a comment on',
    icon: comment
  },
  [NOTIFICATION_ID.DRAFT_CREATED]: {
    message: 'You created a draft',
    icon: plus
  },
  [NOTIFICATION_ID.DRAFT_UPDATED]: {
    message: 'You updated a draft',
    icon: plus
  }
};

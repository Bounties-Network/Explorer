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

export const DEFAULT_MARKDOWN = `# Description
Description of the bounty
## Definition of Done
- Definition 1
- Definition 2
## Requirements
A correct submission will:
- requirement 1
- requirement 2
- requirement 3
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
  DRAFT_UPDATED: 24,
  CONTRIBUTION_RECEIVED: 25,
  BOUNTY_COMPLETED: 26,
  APPLICATION_CREATED: 27,
  APPLICATION_RECEIVED: 28,
  APPLICATION_ACCEPTED_APPLICANT: 29,
  APPLICATION_ACCEPTED_ISSUER: 30,
  APPLICATION_REJECTED_APPLICANT: 31,
  APPLICATION_REJECTED_ISSUER: 32
};

const plus = ['far', 'plus-circle'];
const minus = ['far', 'minus-circle'];
const level_up = ['far', 'level-up'];
const level_down = ['far', 'level-down'];
const star = ['far', 'star'];
const comment = ['far', 'comment'];
const check = ['far', 'check'];
const calendar_exclamation = ['far', 'calendar-exclamation'];
const calendar_plus = ['far', 'calendar-plus'];
const times_circle = ['far', 'times-circle'];
const dollar_sign = ['far', 'dollar-sign'];
const sync = ['far', 'sync'];
const user = ['far', 'user-alt'];
const user_friends = ['far', 'user-friends'];
const edit = ['far', 'edit'];
const arrow_up = ['far', 'arrow-up'];

export const notification_template = {
  [NOTIFICATION_ID.FULFILLMENT_SUBMITTED]: {
    message: 'You made a submission to',
    icon: level_up
  },
  [NOTIFICATION_ID.FULFILLMENT_SUBMITTED_ISSUER]: {
    message: 'You received a submission to',
    icon: level_down
  },
  [NOTIFICATION_ID.BOUNTY_ACTIVATED]: {
    message: 'You activated a bounty:',
    icon: plus
  },
  [NOTIFICATION_ID.FULFILLMENT_ACCEPTED]: {
    message: 'You accepted a submission to',
    icon: check
  },
  [NOTIFICATION_ID.FULFILLMENT_ACCEPTED_FULFILLER]: {
    message: 'Your submission was accepted',
    icon: check
  },
  [NOTIFICATION_ID.BOUNTY_EXPIRED]: {
    message: 'Your bounty expired:',
    icon: calendar_exclamation
  },
  [NOTIFICATION_ID.BOUNTY_ISSUED]: {
    message: 'You issued a new bounty:',
    icon: plus
  },
  [NOTIFICATION_ID.BOUNTY_KILLED]: {
    message: 'You killed a bounty:',
    icon: times_circle
  },
  [NOTIFICATION_ID.CONTRIBUTION_ADDED]: {
    message: 'You made a contribution to',
    icon: dollar_sign
  },
  [NOTIFICATION_ID.DEADLINE_EXTENDED]: {
    message: 'You extended the deadline on',
    icon: calendar_plus
  },
  [NOTIFICATION_ID.BOUNTY_CHANGED]: {
    message: 'You updated your bounty:',
    icon: sync
  },
  [NOTIFICATION_ID.ISSUER_TRANSFERRED]: {
    message: 'You transferred ownernship of your bounty:',
    icon: user_friends
  },
  [NOTIFICATION_ID.TRANSFER_RECIPIENT]: {
    message: 'Ownership of a bounty was transferred to you:',
    icon: user_friends
  },
  [NOTIFICATION_ID.PAYOUT_INCREASED]: {
    message: 'You increased the payout on',
    icon: arrow_up
  },
  [NOTIFICATION_ID.BOUNTY_COMMENT_RECEIVED]: {
    message: 'Someone commented on',
    icon: comment
  },
  [NOTIFICATION_ID.BOUNTY_ISSUED_ACTIVATED]: {
    message: 'You posted a new bounty:',
    icon: plus
  },
  [NOTIFICATION_ID.FULFILLMENT_UPDATED]: {
    message: 'You updated your submission to',
    icon: sync
  },
  [NOTIFICATION_ID.FULFILLMENT_UPDATED_ISSUER]: {
    message: 'A submission to your bounty was updated:',
    icon: sync
  },
  [NOTIFICATION_ID.RATING_ISSUED]: {
    message: 'You wrote a review for',
    icon: star
  },
  [NOTIFICATION_ID.RATING_RECEIVED]: {
    message: 'You received a rating',
    icon: star
  },
  [NOTIFICATION_ID.PROFILE_UPDATED]: {
    message: 'You updated your profile',
    icon: user
  },
  [NOTIFICATION_ID.COMMENT_ISSUED]: {
    message: 'You wrote a comment on',
    icon: comment
  },
  [NOTIFICATION_ID.DRAFT_CREATED]: {
    message: 'You created a draft:',
    icon: edit
  },
  [NOTIFICATION_ID.DRAFT_UPDATED]: {
    message: 'You updated a draft:',
    icon: sync
  },
  [NOTIFICATION_ID.CONTRIBUTION_RECEIVED]: {
    message: 'You received a contribution to',
    icon: dollar_sign
  },
  [NOTIFICATION_ID.BOUNTY_COMPLETED]: {
    message: 'Your bounty ran out of funds:',
    icon: minus
  },
  [NOTIFICATION_ID.APPLICATION_CREATED]: {
    message: 'You submitted an application to',
    icon: level_up
  },
  [NOTIFICATION_ID.APPLICATION_RECEIVED]: {
    message: 'You received a new application for',
    icon: star
  },
  [NOTIFICATION_ID.APPLICATION_ACCEPTED_APPLICANT]: {
    message: 'Your application was accepted for',
    icon: check
  },
  [NOTIFICATION_ID.APPLICATION_ACCEPTED_ISSUER]: {
    message: 'You accepted an application for',
    icon: check
  },
  [NOTIFICATION_ID.APPLICATION_REJECTED_APPLICANT]: {
    message: 'Your application was rejected for',
    icon: times_circle
  },
  [NOTIFICATION_ID.APPLICATION_REJECTED_ISSUER]: {
    message: 'You rejected an application for',
    icon: times_circle
  }
};

import { NOTIFICATION_ID as nid } from 'utils/constants';

const plus = ['far', 'plus-circle'];
const level_up = ['far', 'level-up'];
const star = ['far', 'star'];
const comment = ['far', 'comment'];
const general = ['far', 'star'];

export const notification_template = {
  [nid.FULFILLMENT_SUBMITTED]: {
    message: 'You made a submission to',
    icon: level_up
  },
  [nid.FULFILLMENT_SUBMITTED_ISSUER]: {
    message: 'You received a submission',
    icon: level_up
  },
  [nid.BOUNTY_ACTIVATED]: {
    message: 'You posted a new bounty',
    icon: plus
  },
  [nid.FULFILLMENT_ACCEPTED]: {
    message: 'You accepted a submission',
    icon: level_up
  },
  [nid.FULFILLMENT_ACCEPTED_FULFILLER]: {
    message: 'Your submission was accepted',
    icon: level_up
  },
  [nid.BOUNTY_EXPIRED]: {
    message: 'Your bounty expired',
    icon: general
  },
  [nid.BOUNTY_ISSUED]: {
    message: 'You issued a new bounty',
    icon: plus
  },
  [nid.BOUNTY_KILLED]: {
    message: 'You killed a bounty',
    icon: general
  },
  [nid.CONTRIBUTION_ADDED]: {
    message: 'You made a contribution',
    icon: level_up
  },
  [nid.DEADLINE_EXTENDED]: {
    message: 'You extended the deadline',
    icon: general
  },
  [nid.BOUNTY_CHANGED]: {
    message: 'You updated a draft',
    icon: general
  },
  [nid.ISSUER_TRANSFERRED]: {
    message: 'You transferred ownernship',
    icon: general
  },
  [nid.TRANSFER_RECIPIENT]: {
    message: 'A bounty was transferred to you',
    icon: plus
  },
  [nid.PAYOUT_INCREASED]: {
    message: 'You increased the payout',
    icon: general
  },
  [nid.BOUNTY_COMMENT]: {
    message: 'You commented on',
    icon: comment
  },
  [nid.BOUNTY_ISSUED_ACTIVATED]: {
    message: 'You posted a new bounty',
    icon: plus
  },
  [nid.FULFILLMENT_UPDATED]: {
    message: 'You updated your submission to',
    icon: level_up
  },
  [nid.FULFILLMENT_UPDATED_ISSUER]: {
    message: 'A submission for your bounty was updated:',
    icon: general
  },
  [nid.RATING_ISSUED]: {
    message: 'You wrote a review:',
    icon: star
  },
  [nid.RATING_RECEIVED]: {
    message: 'You received a rating:',
    icon: star
  },
  [nid.PROFILE_UPDATED]: {
    message: 'You updated your profile',
    icon: level_up
  }
};

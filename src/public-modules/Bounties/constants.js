export const PAGE_SIZE = 25;

export const SORT_VALUE = 'usd_price';
export const SORT_CREATED = 'bounty_created';
export const SORT_EXPIRY = 'deadline';

export const SORT_OPTIONS = [SORT_VALUE, SORT_CREATED, SORT_EXPIRY];

export const DIFFICULTY_MAPPING = {
  beginner: 0,
  intermediate: 1,
  advanced: 2
};

export const STAGE_MAPPING = {
  draft: 0,
  active: 1,
  dead: 2,
  completed: 3,
  expired: 4
};

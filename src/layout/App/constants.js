import {
  faUserAlt,
  faTrophyAlt,
  faTachometer,
  faListAlt
} from '@fortawesome/pro-regular-svg-icons';

export const NAV_ITEMS = [
  {
    icon: faListAlt,
    to: '/explorer',
    tabKey: 'explorer',
    title: 'nav.explorer'
  },
  {
    icon: faTachometer,
    to: '/dashboard',
    tabKey: 'dashboard',
    title: 'nav.dashboard'
  },
  {
    icon: faTrophyAlt,
    to: '/leaderboard',
    tabKey: 'leaderboard',
    title: 'nav.leaderboard'
  },
  {
    icon: faUserAlt,
    to: '/profile',
    tabKey: 'profile',
    title: 'nav.profile'
  }
];

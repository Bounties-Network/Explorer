import loginReducer from 'containers/Login/reducer';
import leaderboardUIReducer from 'containers/Leaderboard/reducer';
import profileUIReducer from 'containers/Profile/reducer';
import dashboardReducer from 'containers/Dashboard/reducer';
import bountyPageUIReducer from 'containers/Bounty/reducer';
import issueRatingFormModalReducer from 'explorer-components/IssueRatingFormModal/reducer';

const reducers = {
  loginContainer: loginReducer,
  leaderboardUI: leaderboardUIReducer,
  profileUI: profileUIReducer,
  ...dashboardReducer,
  bountyPageUI: bountyPageUIReducer,
  profileUI: profileUIReducer,
  ratingFormModal: issueRatingFormModalReducer
};

// Reducers not from public-modules
export default reducers;

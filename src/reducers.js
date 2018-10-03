import loginReducer from 'containers/Login/reducer';
import leaderboardUIReducer from 'containers/Leaderboard/reducer';
import profileUIReducer from 'containers/Profile/reducer';
import dashboardReducer from 'containers/Dashboard/reducer';
import bountyPageUIReducer from 'containers/Bounty/reducer';
import settingsUIReducer from 'containers/Settings/reducer';
import appReducer from 'layout/App/reducer';

const reducers = {
  loginContainer: loginReducer,
  leaderboardUI: leaderboardUIReducer,
  ...dashboardReducer,
  bountyPageUI: bountyPageUIReducer,
  profileUI: profileUIReducer,
  settingsUI: settingsUIReducer,
  app: appReducer
};

// Reducers not from public-modules
export default reducers;

import loginReducer from 'containers/Login/reducer';
import leaderboardUIReducer from 'containers/Leaderboard/reducer';
import profileUIReducer from 'containers/Profile/reducer';

const reducers = {
  loginContainer: loginReducer,
  leaderboardUI: leaderboardUIReducer,
  profileUI: profileUIReducer
};

// Reducers not from public-modules
export default reducers;

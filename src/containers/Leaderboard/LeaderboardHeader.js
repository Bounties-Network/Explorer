import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { LoadComponent } from 'hocs';

import styles from './LeaderboardHeader.module.scss';
import { Switch, Text } from 'components';
import { rootLeaderboardSelector } from 'public-modules/Leaderboard/selectors';
import { actions } from 'public-modules/Leaderboard';

const LeaderboardHeaderComponent = props => {
  const { toggleValue, leaderboardToggle, loading } = props;

  return (
    <div className={`${styles.headerWrapper}`}>
      <div className={`${styles.titleText}`}>
        <Text
          className={'sb-component-group-heading'}
          typeScale="h1"
          color="white"
        >
          Leaderboard
        </Text>
      </div>
      <Switch
        onChange={leaderboardToggle}
        onValue={'Top Issuer'}
        offValue={'Top Earners'}
        selectedColor="white"
        unselectedColor="lightGrey"
        backgroundColor="purple"
        switchColor="purpleWhite"
        size="large"
        curved
      />
    </div>
  );
};

const mapStateToProps = state => {
  const leaderboardState = rootLeaderboardSelector(state);

  return {
    toggleValue: leaderboardState.toggleValue
  };
};

const LeaderboardHeader = compose(
  connect(
    mapStateToProps,
    { leaderboardToggle: actions.leaderboardToggle }
  )
)(LeaderboardHeaderComponent);

export default LeaderboardHeader;

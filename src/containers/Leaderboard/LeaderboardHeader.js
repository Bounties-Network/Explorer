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
  const { switchValue, onSwitchChange, loading } = props;

  console.log('hello', props, onSwitchChange, loading);

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
        onValue={'Earners'}
        offValue={'Issuers'}
        selectedColor="white"
        unselectedColor="lightGrey"
        backgroundColor="purple"
        switchColor="purpleWhite"
        curved="true"
        onChange={onSwitchChange}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const leaderboardState = rootLeaderboardSelector(state);

  return {
    switchValue: leaderboardState.switchValue
  };
};

const LeaderboardHeader = compose(
  connect(
    mapStateToProps,
    {
      onSwitchChange: actions.useLeaderboard,
      load: actions.useLeaderboard
    }
  ),
  LoadComponent('')
)(LeaderboardHeaderComponent);

export default LeaderboardHeader;

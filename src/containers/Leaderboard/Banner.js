import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';

import styles from './Banner.module.scss';
import { Switch, Text } from 'components';
import { rootLeaderboardUISelector } from './selectors';
import { actions } from './reducer';

const BannerComponent = props => {
  const { toggleValue, leaderboardToggle, loading } = props;

  return (
    <div className={styles.headerWrapper}>
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
        value={toggleValue == 'issuer' ? 'Top Issuer' : 'Top Earners'}
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
  const leaderboardUIState = rootLeaderboardUISelector(state);

  return {
    toggleValue: leaderboardUIState.toggleValue
  };
};

const Banner = compose(
  connect(
    mapStateToProps,
    { leaderboardToggle: actions.leaderboardToggle }
  )
)(BannerComponent);

export default Banner;

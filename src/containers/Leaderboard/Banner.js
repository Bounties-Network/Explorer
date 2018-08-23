import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';

import styles from './Banner.module.scss';
import { Switch } from 'components';
import { PageCard } from 'explorer-components';
import { rootLeaderboardUISelector } from './selectors';
import { actions } from './reducer';

const BannerComponent = props => {
  const { toggleValue, leaderboardToggle } = props;

  return (
    <div className={styles.headerWrapper}>
      <PageCard.Title className={styles.titleText}>Leaderboard</PageCard.Title>
      <Switch
        onChange={leaderboardToggle}
        onValue={'Top Issuers'}
        offValue={'Top Earners'}
        value={toggleValue === 'issuer' ? 'Top Issuers' : 'Top Earners'}
        selectedColor="white"
        unselectedColor="transparentWhite"
        backgroundColor="dark"
        switchColor="transparentWhite"
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

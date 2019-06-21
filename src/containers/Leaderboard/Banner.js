import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';

import styles from './Banner.module.scss';
import { Switch } from 'components';
import { PageCard } from 'explorer-components';
import { rootLeaderboardUISelector } from './selectors';
import { actions } from './reducer';
import intl from 'react-intl-universal';

const BannerComponent = props => {
  const { toggleValue, leaderboardToggle } = props;

  return (
    <div className={styles.headerWrapper}>
      <PageCard.Title className={styles.titleText}>
        {intl.get('sections.leaderboard.title')}
      </PageCard.Title>
      <Switch
        onChange={leaderboardToggle}
        onValue={intl.get('sections.leaderboard.banner.top_issuers')}
        offValue={intl.get('sections.leaderboard.banner.top_earners')}
        value={
          toggleValue === 'issuer'
            ? intl.get('sections.leaderboard.banner.top_issuers')
            : intl.get('sections.leaderboard.banner.top_earners')
        }
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

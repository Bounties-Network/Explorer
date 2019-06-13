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
        onValue={intl.get('sections.leaderboard.banner.top_issuer')}
        offValue={intl.get('sections.leaderboard.banner.top_earner')}
        value={
          toggleValue === 'issuer'
            ? intl.get('sections.leaderboard.banner.top_issuer')
            : intl.get('sections.leaderboard.banner.top_earner')
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

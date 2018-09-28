import React from 'react';
import styles from './LeaderboardCard.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ListGroup, Loader, ZeroState, Button, SearchSelect } from 'components';
import { LoadComponent } from 'hocs';
import { LeaderItem } from './components';
import { map as fpMap } from 'lodash';
import {
  leaderboardPlatformFiltersSelector,
  rootLeaderboardSelector
} from 'public-modules/Leaderboard/selectors';
import { rootLeaderboardUISelector } from './selectors';
import { actions } from 'public-modules/Leaderboard';
import config from 'public-modules/config';

const map = fpMap.convert({ cap: false });

const LeaderboardCardComponent = props => {
  const {
    leaderboard,
    loading,
    error,
    toggleValue,
    count,
    loadMore,
    loadingMore,
    loadingMoreError,
    selectedPlatforms,
    setPlatformFilter,
    removePlatformFilter
  } = props;

  const leaders = leaderboard[toggleValue] || [];

  const renderLeaders = () => {
    return map((leader, index) => {
      const { name, address, profile_image, total_usd, total } = leader;

      const value = config.defaultToken
        ? Number(total / 10 ** config.defaultToken.decimals).toFixed(2)
        : total_usd;

      return (
        <ListGroup.ListItem key={index + 1}>
          <LeaderItem
            place={index + 1}
            img={profile_image}
            name={name}
            address={address}
            value={value}
            valueLabel={config.defaultToken && config.defaultToken.symbol}
          />
        </ListGroup.ListItem>
      );
    }, leaders);
  };

  let cardBodyClass;
  if ((loading && !leaders.length) || leaders.length === 0) {
    cardBodyClass = styles.cardBodyLoading;
  }

  let cardBody = (
    <div className={cardBodyClass}>
      <div className={styles.platformSelect}>
        <SearchSelect
          single
          options={map(
            platform => ({
              label: platform,
              value: platform
            }),
            config.platform.split(',')
          )}
          value={selectedPlatforms[0]}
          labelKey="label"
          valueKey="value"
          onChange={setPlatformFilter}
          onClose={removePlatformFilter}
          loading={loading}
        />
      </div>

      <ListGroup>{renderLeaders()}</ListGroup>

      {leaderboard[toggleValue].length < count[toggleValue] ? (
        <div className={styles.loadMoreButton}>
          <Button loading={loadingMore} onClick={loadMore}>
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  );

  if (leaders.length === 0) {
    cardBody = (
      <ZeroState
        className={styles.zeroState}
        iconColor="blue"
        title="No Results Yet"
        text="As bounties are issues and submissions are completed, this leaderboard will begin to populate"
        icon={['fal', 'trophy-alt']}
      />
    );
  }

  if (loading && !leaders.length) {
    cardBody = <Loader color="blue" size="medium" />;
  }

  if (error || loadingMoreError) {
    cardBody = (
      <ZeroState
        className={styles.zeroState}
        type="error"
        iconColor="white"
        title="Uh oh, something happened"
        text="Try to refresh the page and try again"
        icon={['fal', 'exclamation-triangle']}
      />
    );
  }

  return <div className={cardBodyClass}>{cardBody}</div>;
};

const mapStateToProps = state => {
  const leaderboardState = rootLeaderboardSelector(state);
  const leaderboardUIState = rootLeaderboardUISelector(state);

  return {
    offset: leaderboardState.offset,
    count: leaderboardState.count,
    leaderboard: leaderboardState.leaderboard,
    loading: leaderboardState.loading,
    error: leaderboardState.error,
    loadingMore: leaderboardState.loadingMore,
    toggleValue: leaderboardUIState.toggleValue,
    key: leaderboardUIState.toggleValue,
    selectedPlatforms: leaderboardPlatformFiltersSelector(state)
  };
};

const LeaderboardCard = compose(
  connect(
    mapStateToProps,
    {
      load: () => actions.loadLeaderboard(config.platform),
      loadMore: actions.loadMoreLeaderboard,
      setPlatformFilter: actions.setPlatformFilter,
      removePlatformFilter: actions.removePlatformFilter
    }
  ),
  LoadComponent('')
)(LeaderboardCardComponent);

export default LeaderboardCard;

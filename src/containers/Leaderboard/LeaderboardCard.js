import React from 'react';
import styles from './LeaderboardCard.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ListGroup, Loader, ZeroState, Button } from 'components';
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
import intl from 'react-intl-universal';

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
    loadingMoreError
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
  if ((loading && !leaders.length) || leaders.length === 0 || error) {
    cardBodyClass = styles.cardBodyLoading;
  }

  // const platformOptions = [
  //   {
  //     label: 'All Platforms',
  //     value: config.platform
  //   },
  //   ...map(
  //     platform => ({
  //       label: platform,
  //       value: platform
  //     }),
  //     config.platform.split(',')
  //   )
  // ];

  // const platformDropdown = config.platform.split(',').length > 1 && (
  //   <div className={styles.platformSelect}>
  //     <SearchSelect
  //       single
  //       label="Platform"
  //       options={platformOptions}
  //       value={selectedPlatforms[0]}
  //       labelKey="label"
  //       valueKey="value"
  //       onChange={setPlatformFilter}
  //       onClose={removePlatformFilter}
  //       clearable={false}
  //       loading={loading}
  //     />
  //   </div>
  // );

  let cardBody = (
    <div className={cardBodyClass}>
      <ListGroup>{renderLeaders()}</ListGroup>
      {leaderboard[toggleValue].length < count[toggleValue] && (
        <div className={styles.loadMoreButton}>
          <Button loading={loadingMore} onClick={loadMore}>
            {intl.get('actions.load_more')}
          </Button>
        </div>
      )}
    </div>
  );

  if (leaders.length === 0) {
    cardBody = (
      <React.Fragment>
        <div className={styles.zeroStateWrapper}>
          <ZeroState
            className={styles.zeroState}
            iconColor="blue"
            title={intl.get('section.leaderboard_card.zero_state.title')}
            text={intl.get('section.leaderboard_card.zero_state.description')}
            icon={['fal', 'trophy-alt']}
          />
        </div>
      </React.Fragment>
    );
  }

  if (loading && !leaders.length) {
    cardBody = (
      <React.Fragment>
        <div className={styles.zeroStateWrapper}>
          <Loader color="blue" size="medium" />
        </div>
      </React.Fragment>
    );
  }

  if (error || loadingMoreError) {
    cardBody = (
      <React.Fragment>
        <div className={styles.zeroStateWrapper}>
          <ZeroState
            className={styles.zeroState}
            type="error"
            iconColor="white"
            title={intl.get('section.leaderboard_card.zero_state_error.title')}
            text={intl.get(
              'section.leaderboard_card.zero_state_error.description'
            )}
            icon={['fal', 'exclamation-triangle']}
          />
        </div>
      </React.Fragment>
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
      load: actions.loadLeaderboard,
      loadMore: actions.loadMoreLeaderboard,
      setPlatformFilter: actions.setPlatformFilter,
      removePlatformFilter: actions.removePlatformFilter
    }
  ),
  LoadComponent('')
)(LeaderboardCardComponent);

export default LeaderboardCard;

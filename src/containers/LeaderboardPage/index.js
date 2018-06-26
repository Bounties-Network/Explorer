import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './LeaderboardPage.module.scss';

import { Text, ToggleSwitch, Leaderboard, Button, Loading } from 'components';

const { leaderboardSelector, rootLeaderboardSelector } = selectors;

const LeaderboardPage = props => {
  const {
    loading,
    error,
    leaderboard,
    leaderboardCategory,
    loadLeaderboard,
    loadMoreLeaderboard,
    loadingMore
  } = props;

  if (error) {
    return <div>error...</div>;
  }

  const onToggleClick = () => {
    if (leaderboardCategory === 'fulfiller') {
      props.history.push('/leaderboard/issuer');
      loadLeaderboard('issuer');
    } else if (leaderboardCategory === 'issuer') {
      props.history.push('/leaderboard/fulfiller');
      loadLeaderboard('fulfiller');
    }
  };

  const loadMore = () => {
    loadMoreLeaderboard(leaderboardCategory, leaderboard.length);
  };

  return (
    <div className={`${styles.leaderboardPage}`}>
      <div className={`${styles.leaderboardHeader}`}>
        <div className={`${styles.leaderboardHeaderBody}`}>
          <Text style="H1" color="white">
            Leaderboard
          </Text>
        </div>
        <ToggleSwitch
          offOption="Top Earners"
          onOption="Top Issuers"
          active={leaderboardCategory === 'issuer'}
          onClick={onToggleClick}
        />
      </div>
      <div className={`${styles.leaderboardBody}`}>
        <Leaderboard leaderboardData={leaderboard} loading={loading} />
        {loading ? (
          ''
        ) : (
          <Button
            style="primary"
            className={`${styles.loadMore}`}
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? <Loading /> : 'Load More'}
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let leaderboardState = rootLeaderboardSelector(state);
  let leaderboardCategory = router.location.pathname.slice(13);

  return {
    leaderboardCategory,
    leaderboard: leaderboardState.leaderboard,
    ...leaderboardSelector(state)
  };
};

LeaderboardPage.propTypes = {
  leaderboard: PropTypes.array,
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadLeaderboard, ...actions }),
  LoadComponent('leaderboardCategory')
)(LeaderboardPage);

export default check;

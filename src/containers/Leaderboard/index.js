import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './Leaderboard.module.scss';

import { Text, ToggleSwitch } from 'components';

const { leaderboardSelector, rootLeaderboardSelector } = selectors;

const Leaderboard = props => {
  const { loading, count, error } = props;

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  return (
    <div className={`${styles.leaderboardPage}`}>
      <div className={`${styles.leaderboardHeader}`}>
        <div className={`${styles.leaderboardHeaderBody}`}>
          <Text style="H1" color="white">
            Leaderboard
          </Text>
        </div>
        <ToggleSwitch offOption="Top Earners" onOption="Top Issuers" />
      </div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let leaderboardState = rootLeaderboardSelector(state);

  return {
    leaderboard: leaderboardState.leaderboard,
    ...leaderboardSelector(state)
  };
};

Leaderboard.propTypes = {
  leaderboard: PropTypes.array,
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadLeaderboard }),
  LoadComponent('')
)(Leaderboard);

export default check;

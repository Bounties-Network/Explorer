import React from 'react';
import styles from './LeaderboardBody.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Text, Sort, Loader, ZeroState, Button } from 'components';
import { LoadComponent } from 'hocs';
import { LeaderCard } from 'explorer-components';
import { map, get } from 'lodash';
import {
  SORT_VALUE,
  SORT_CREATED,
  SORT_EXPIRY,
  PAGE_SIZE
} from 'public-modules/Bounties/constants';
import { rootLeaderboardSelector } from 'public-modules/Leaderboard/selectors';
import { actions } from 'public-modules/Leaderboard';

const LeaderboardBodyComponent = props => {
  const { leaderboard, count, loading, error, switchValue } = props;

  const renderLeaders = () => {
    return (leaderboard[switchValue] || [])
      .slice(0, 10)
      .map((leader, index) => {
        const { name, address, value, total, total_usd } = leader;

        return (
          <LeaderCard
            key={index + 1}
            place={index + 1}
            img={'user.profile_image'}
            name={name}
            address={address}
            value={Number(total / 10 ** 18).toFixed(2)}
            usd={Number(total_usd).toFixed(0)}
            currency={'ETH'}
          />
        );
      });
  };

  let className = styles.explorerBody;
  if (loading || leaderboard.length === 0) {
    className += ` ${styles.centeredBody}`;
  }

  return (
    <div className={className}>
      <div className={styles.bodyHeading} />
      {loading ? (
        <div className={styles.bountyListCentered}>
          <Loader size="medium" className={styles.centeredItem} />
        </div>
      ) : null}
      {!loading && leaderboard.length !== 0 ? (
        <div className={styles.leaderList}>{renderLeaders()}</div>
      ) : null}
      {!loading && !error && leaderboard.length === 0 ? (
        <div className={styles.bountyListCentered}>
          <ZeroState
            className={styles.centeredItem}
            iconColor="white"
            title="No Bounties Found"
            text="Update your search filters to see more bounties"
          />
        </div>
      ) : null}
      {error ? (
        <div className={styles.bountyListCentered}>
          <ZeroState
            className={styles.centeredItem}
            type="error"
            iconColor="white"
            title="Uh oh, something happened"
            text="Try a new filter or refresh the page and try again"
            icon={['fal', 'exclamation-triangle']}
          />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  const leaderboardState = rootLeaderboardSelector(state);

  return {
    leaderboard: leaderboardState.leaderboard,
    count: leaderboardState.count,
    loading: leaderboardState.loading,
    error: leaderboardState.error,
    switchValue: leaderboardState.switchValue
  };
};

const LeaderboardBody = compose(
  connect(
    mapStateToProps,
    {
      load: actions.loadLeaderboard
    }
  ),
  LoadComponent('')
)(LeaderboardBodyComponent);

export default LeaderboardBody;

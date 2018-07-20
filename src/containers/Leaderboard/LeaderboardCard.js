import React from 'react';
import styles from './LeaderboardCard.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  ListGroup,
  Card,
  Text,
  Sort,
  Loader,
  ZeroState,
  Button
} from 'components';
import { LoadComponent } from 'hocs';
import { LeaderItem } from './components';
import { map, get } from 'lodash';
import {
  SORT_VALUE,
  SORT_CREATED,
  SORT_EXPIRY,
  PAGE_SIZE
} from 'public-modules/Bounties/constants';
import { rootLeaderboardSelector } from 'public-modules/Leaderboard/selectors';
import { rootLeaderboardUISelector } from './selectors';
import { actions } from 'public-modules/Leaderboard';

const LeaderboardCardComponent = props => {
  const { leaderboard, count, loading, error, toggleValue } = props;

  const renderLeaders = () => {
    return (leaderboard[toggleValue] || []).map((leader, index) => {
      const { name, address, profile_image, total, total_usd } = leader;

      return (
        <ListGroup.ListItem hover>
          <LeaderItem
            key={index + 1}
            place={index + 1}
            img={profile_image}
            name={name}
            address={address}
            usd={Number(total_usd).toFixed(2)}
            currency={''}
          />
        </ListGroup.ListItem>
      );
    });
  };

  let className = styles.explorerBody;
  let cardBodyClass;
  if (loading || leaderboard[toggleValue].length === 0) {
    className += ` ${styles.centeredBody}`;
    cardBodyClass = styles.cardBodyLoading;
  }

  return (
    <Card className={`${styles.leaderboardCard}`}>
      <Card.Body className={cardBodyClass}>
        {loading ? (
          <div className={`${styles.leaderListCentered}`}>
            <Loader
              color="blue"
              size="medium"
              className={styles.centeredItem}
            />
          </div>
        ) : null}

        {!loading && leaderboard.length !== 0 ? (
          <ListGroup>{renderLeaders()}</ListGroup>
        ) : null}
        {!loading && !error && leaderboard[toggleValue].length === 0 ? (
          <div className={styles.leaderListCentered}>
            <ZeroState
              className={styles.centeredItem}
              iconColor="blue"
              title="The Leaderboard is Empty"
              text="Start issuing or fulfilling bounties to appear here"
            />
          </div>
        ) : null}

        {error ? (
          <div className={styles.leaderListCentered}>
            <ZeroState
              className={styles.centeredItem}
              type="error"
              iconColor="white"
              title="Uh oh, something happened"
              text="Try to refresh the page and try again"
              icon={['fal', 'exclamation-triangle']}
            />
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = state => {
  const leaderboardState = rootLeaderboardSelector(state);
  const leaderboardUIState = rootLeaderboardUISelector(state);

  return {
    leaderboard: leaderboardState.leaderboard,
    count: leaderboardState.count,
    loading: leaderboardState.loading,
    error: leaderboardState.error,
    toggleValue: leaderboardUIState.toggleValue
  };
};

const LeaderboardCard = compose(
  connect(
    mapStateToProps,
    {
      load: actions.loadLeaderboard
    }
  ),
  LoadComponent('')
)(LeaderboardCardComponent);

export default LeaderboardCard;

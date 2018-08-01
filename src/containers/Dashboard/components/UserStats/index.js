import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import base from '../BaseStyles.module.scss';
import styles from './UserStats.module.scss';
import { Avatar, Text } from 'components';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import {
  userInfoSelector,
  loadedUserSelector,
  loadedUserStatsSelector
} from 'public-modules/UserInfo/selectors';
import { actions as userInfoActions } from 'public-modules/UserInfo';

const { loadUserInfo } = userInfoActions;

class UserStatsComponent extends React.Component {
  componentWillMount() {
    const { public_address: loadedUser } = this.props.loadedUser;
    const { public_address: currentUser } = this.props.user;

    if (currentUser !== loadedUser) {
      this.props.loadUserInfo(currentUser);
    }
  }

  render() {
    const { loading, user, stats, className } = this.props;
    const { public_address, profile_image, name } = user;
    const { awarded, earned } = stats;

    const renderStat = (value, label) => {
      return (
        <div className={styles.stat}>
          <Text typeScale="h1" color="purple">
            {value}
          </Text>
          <Text typeScale="Small" color="grey">
            {label}
          </Text>
        </div>
      );
    };

    return (
      <div className={`${styles.container} ${className}`}>
        <Avatar
          size="large"
          border
          name={name}
          address={public_address}
          img={profile_image}
          className={base.alignLeft}
        />

        {loading ? null : (
          <div className={styles.stats}>
            {renderStat(stats.issuer.total, 'Bounties issued')}
            {renderStat(stats.fulfiller.total, 'Bounties completed')}
            {renderStat(`$${awarded.toFixed(0)}`, 'Awarded')}
            {renderStat(`$${earned.toFixed(0)}`, 'Earned')}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const user = getCurrentUserSelector(state);
  const { loading, loaded, error } = userInfoSelector(state);
  const loadedUser = loadedUserSelector(state);
  const stats = loadedUserStatsSelector(state);

  return {
    user,
    stats,
    loadedUser,
    loading,
    loaded,
    error
  };
};

const UserStats = compose(
  connect(
    mapStateToProps,
    { loadUserInfo }
  )(UserStatsComponent)
);

export default UserStats;

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './UserStats.module.scss';
import { Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import {
  userInfoSelector,
  loadedUserSelector,
  loadedUserStatsSelector
} from 'public-modules/UserInfo/selectors';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { ipfsToHttp } from 'utils/helpers';

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
    const {
      name,
      public_address,
      is_profile_image_dirty,
      profile_image,
      profileDirectoryHash,
      profileFileName
    } = user;
    const { awarded, earned } = stats;

    const renderStat = (value, label) => {
      return (
        <div className={styles.stat}>
          <Text typeScale="h1" color="purple">
            {value}
          </Text>
          <Text
            className={styles.statLabel}
            typeScale="Small"
            color="defaultGrey"
          >
            {label}
          </Text>
        </div>
      );
    };

    return (
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardAvatar}>
          <LinkedAvatar
            size="large"
            border
            name={name}
            nameTextScale="h2"
            nameTextWeight="fontWeight-bold"
            address={public_address}
            hash={public_address}
            img={
              is_profile_image_dirty
                ? ipfsToHttp(profileDirectoryHash, profileFileName)
                : profile_image
            }
            to={`/profile/${public_address}`}
            className={styles.alignLeft}
          />
        </div>

        <div className={styles.statsContainer}>
          {loading ? null : (
            <div className={styles.stats}>
              {renderStat(stats.issuer.total, 'Bounties issued')}
              {renderStat(stats.fulfiller.total, 'Bounties completed')}
              {renderStat(`$${awarded.toFixed(0)}`, 'Awarded')}
              {renderStat(`$${earned.toFixed(0)}`, 'Earned')}
            </div>
          )}
        </div>
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

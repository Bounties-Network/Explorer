import React from 'react';
import styles from './NotificationDropdown.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  notificationsListSelector,
  rootNotificationSelector,
  hasUnreadNotifications
} from 'public-modules/Notification/selectors';
import { actions } from 'public-modules/Notification';
import { NotificationItem } from 'explorer-components';
import {
  Dropdown,
  ListGroup,
  Text,
  Button,
  Loader,
  ZeroState
} from 'components';

const { DropdownTrigger, DropdownContent } = Dropdown;

const NotificationDropdown = props => {
  const {
    notifications,
    setNotificationViewed,
    viewAllNotifications,
    count,
    loadMoreNotifications,
    loadingMore,
    loaded,
    error,
    hasUnread
  } = props;

  const renderNotifications = () => {
    return map(notification => {
      const {
        id,
        notification_name,
        bounty_title,
        created,
        from_user,
        link,
        viewed
      } = notification;

      return (
        <Link
          key={id}
          to={link}
          className={styles.link}
          onClick={() => {
            setNotificationViewed(id);
          }}
        >
          <ListGroup.ListItem
            className={`${styles.notificationListItem} ${
              viewed ? styles.viewed : ''
            }`}
            hover
          >
            <NotificationItem
              type={notification_name}
              title={bounty_title}
              transparent
              createdAt={created}
              notifierWidth="large"
              userAddress={from_user && from_user.public_address}
              profileImage={from_user && from_user.profile_image}
            />
          </ListGroup.ListItem>
        </Link>
      );
    }, notifications);
  };

  return (
    <Dropdown position="left" className={styles.customDropdown} hideOnClick>
      <DropdownTrigger>
        <Text
          typeScale="h3"
          color="defaultGrey"
          className={`${hasUnread ? styles.notification : ''} ${
            styles.notificationTrigger
          }`}
        >
          <FontAwesomeIcon
            icon={['far', 'bell']}
            className={styles.notificationTriggerIcon}
          />
        </Text>
      </DropdownTrigger>
      <DropdownContent>
        <div className={styles.notificationBox}>
          <div
            className={styles.heading}
            onMouseDown={e => {
              e.preventDefault();
              return false;
            }}
            onClick={e => {
              e.preventDefault();
            }}
          >
            <Text
              typeScale="h4"
              weight="fontWeight-medium"
              className={styles.headingTitle}
            >
              Notifications
            </Text>
            {!!notifications.length &&
              hasUnread && (
                <Text
                  link
                  className={styles.headingLink}
                  src="#"
                  onMouseDown={e => {
                    e.preventDefault();
                    return false;
                  }}
                  onClick={e => {
                    e.preventDefault();
                    viewAllNotifications();
                  }}
                >
                  Mark all as read
                </Text>
              )}
          </div>
          {error && (
            <ZeroState
              type="error"
              text={'Something went wrong. Try again later.'}
              iconColor="red"
              icon={['far', 'exclamation-triangle']}
            />
          )}
          {!loaded && (
            <div className={styles.zeroState}>
              <Loader color="blue" size="medium" />
            </div>
          )}
          {loaded &&
            !count && (
              <div className={styles.zeroState}>
                <ZeroState
                  title="You have no notifications"
                  text={
                    'Once you start using the platform, notifications will show here.'
                  }
                  iconColor="blue"
                  icon={['fal', 'bolt']}
                />
              </div>
            )}
          {loaded && (
            <ListGroup className={styles.notificationListGroup}>
              {renderNotifications()}
              {count > notifications.length && (
                <div className={styles.loadMore}>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      loadMoreNotifications();
                    }}
                    onMouseDown={e => {
                      e.preventDefault();
                      return false;
                    }}
                    loading={loadingMore}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </ListGroup>
          )}
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

NotificationDropdown.propTypes = {};

NotificationDropdown.defaultProps = {};

const mapStateToProps = state => {
  const rootState = rootNotificationSelector(state);

  return {
    notifications: notificationsListSelector(state),
    count: rootState.count,
    loadingMore: rootState.loadingMore,
    loaded: rootState.loaded,
    hasUnread: hasUnreadNotifications(state)
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      setNotificationViewed: actions.setNotificationViewed,
      viewAllNotifications: actions.viewAllNotifications,
      loadMoreNotifications: actions.loadMoreNotifications
    }
  )
)(NotificationDropdown);

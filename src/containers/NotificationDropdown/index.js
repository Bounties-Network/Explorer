import React from "react";
import styles from "./NotificationDropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  notificationsListSelector,
  rootNotificationSelector,
  hasUnreadNotifications
} from "public-modules/Notification/selectors";
import { actions } from "public-modules/Notification";
import { NotificationItem } from "explorer-components";
import { Dropdown, ListGroup, Text, Button, Loader, ZeroState } from "components";
import intl from "react-intl-universal";
import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { faExclamationTriangle, faBell as lightFaBell } from "@fortawesome/pro-light-svg-icons";
import Tippy from "@tippy.js/react";
import styled from "lib/emotion-styled";
import { Global } from "@emotion/core";
import { css } from "@styled-system/css";

const NotificationTippy = styled(Tippy)(props => css({}));

const NotificationTippyTrigger = styled.span(props =>
  css({
    cursor: "pointer"
  })
);

const { DropdownTrigger, DropdownContent } = Dropdown;

function useClickedOutside(ref, setVisible) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setVisible(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

const NotificationDropdown = props => {
  const [visible, setVisible] = React.useState(false);
  const wrapperRef = React.useRef(null);
  useClickedOutside(wrapperRef, setVisible);

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
      const { id, notification_name, bounty_title, created, from_user, link, viewed } = notification;
      return (
        <Link
          key={id}
          to={link}
          className={styles.link}
          onClick={e => {
            setNotificationViewed(id);
            setVisible(false);
          }}
        >
          <ListGroup.ListItem className={`${styles.notificationListItem} ${viewed ? styles.viewed : ""}`} hover>
            <NotificationItem
              type={notification_name}
              title={bounty_title}
              transparent
              createdAt={created}
              notifierWidth="large"
              userAddress={from_user && from_user.public_address}
              profileImage={from_user && from_user.small_profile_image_url}
            />
          </ListGroup.ListItem>
        </Link>
      );
    }, notifications);
  };

  const NotificationDropdownContent = ({ wrapperRef }) => {
    return (
      <div ref={wrapperRef} className={styles.notificationBox}>
        <div
          className={styles.heading}
          onClick={e => {
            e.preventDefault();
            return false;
          }}
        >
          <Text typeScale="h4" weight="fontWeight-medium" className={styles.headingTitle}>
            {intl.get("sections.notifications.title")}
          </Text>
          {!!notifications.length &&
            hasUnread && (
              <Text
                link
                className={styles.headingLink}
                src="#"
                onClick={e => {
                  e.preventDefault();
                  viewAllNotifications();
                  return false;
                }}
              >
                {intl.get("sections.notifications.actions.mark_read")}
              </Text>
            )}
        </div>
        {error && (
          <ZeroState type="error" text={intl.get("errors.500")} iconColor="red" faIcon={faExclamationTriangle} />
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
                title={intl.get("sections.notifications.zero_state.title")}
                text={intl.get("sections.notifications.zero_state.description")}
                iconColor="blue"
                faIcon={lightFaBell}
              />
            </div>
          )}
        {loaded && (
          <ListGroup className={styles.notificationListGroup}>
            {[
              ...renderNotifications(),
              count > notifications.length && (
                <ListGroup.ListItem key="load" className={styles.loadMore}>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      loadMoreNotifications();
                      return false;
                    }}
                    loading={loadingMore}
                  >
                    {intl.get("actions.load_more")}
                  </Button>
                </ListGroup.ListItem>
              )
            ]}
          </ListGroup>
        )}
      </div>
    );
  };

  return (
    <NotificationTippy
      className={`NotificationDropdown-tippy`}
      visible={visible}
      distance={0}
      interactive={true}
      animation="fade"
      content={<NotificationDropdownContent wrapperRef={wrapperRef} />}
    >
      <NotificationTippyTrigger
        ref={wrapperRef}
        onClick={() => {
          if (visible) {
            setVisible(false);
            return;
          }
          setVisible(true);
        }}
      >
        <Global
          styles={css({
            ".tippy-tooltip": {
              background: "none !important",
              color: 'rgb(0, 0, 0)'
            },
            ".tippy-arrow": { display: "none" },
            ".tippy-popper": {
              background: "none"
            },
            ".tippy-content": {
              px: 0,
              py: 2,
              background: "none"
            },
            ".tippy-popper": { background: "none", top: "-1.8rem !important" },
          })}
        />
        <Text
          typeScale="h3"
          color="defaultGrey"
          className={`${hasUnread ? styles.notification : ""} ${styles.notificationTrigger}`}
        >
          <FontAwesomeIcon icon={faBell} className={styles.notificationTriggerIcon} />
        </Text>
      </NotificationTippyTrigger>
    </NotificationTippy>
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

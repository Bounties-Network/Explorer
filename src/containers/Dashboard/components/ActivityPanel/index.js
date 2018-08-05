import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import base from '../BaseStyles.module.scss';
import styles from './ActivityPanel.module.scss';
import { LoadComponent } from 'hocs';
import { map } from 'lodash';
import { ID_TO_NOTIFICATION } from 'utils/constants';
import { Button, Card, ListGroup, Loader, Text, ZeroState } from 'components';
import { ActivityItem } from '../';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { rootNotificationSelector } from 'public-modules/Notification/selectors';
import { actions } from 'public-modules/Notification';

class ActivityPanelComponent extends React.Component {
  renderActivity = list => {
    return map(activity => {
      const { created, data, notification } = activity;
      const { bounty_title } = data;
      const { notification_name: notification_id } = notification;
      const notification_name = ID_TO_NOTIFICATION[notification_id];

      return (
        <ListGroup.ListItem>
          <ActivityItem
            type={notification_name}
            title={bounty_title}
            createdAt={created}
          />
        </ListGroup.ListItem>
      );
    }, list);
  };

  render() {
    const { list, count, loading, loadingMore, error } = this.props;
    const loadMore = () => this.props.loadMore(this.props.public_address);

    let bodyClass;
    let body = (
      <React.Fragment>
        <ListGroup>{this.renderActivity(list)}</ListGroup>
        {list.length < count ? (
          <div className={base.loadMoreButton}>
            <Button loading={loadingMore} onClick={loadMore}>
              Load More
            </Button>
          </div>
        ) : null}
      </React.Fragment>
    );

    if (count <= 0) {
      bodyClass = base.bodyLoading;
      body = (
        <div className={base.zeroState}>
          <ZeroState
            title={'You have no activity'}
            text={
              'Once you start using the platform, your activity will show up here.'
            }
            iconColor="blue"
          />
        </div>
      );
    }

    if (loading) {
      bodyClass = base.bodyLoading;
      body = <Loader color="blue" size="medium" />;
    }

    if (error) {
      bodyClass = base.bodyLoading;
      body = (
        <div className={base.zeroState}>
          <ZeroState
            type="error"
            text={'Something went wrong. Try again later.'}
            iconColor="red"
            icon={['far', 'exclamation-triangle']}
          />
        </div>
      );
    }

    return (
      <div className={base.cardContainer}>
        <Card className={base.card}>
          <Card.Header>
            <Card.HeaderTitle>My Activity</Card.HeaderTitle>
          </Card.Header>
          <Card.Body className={`${base.listGroup} ${bodyClass}`}>
            {body}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const notificationState = rootNotificationSelector(state);
  const currentUser = getCurrentUserSelector(state);
  const { public_address } = currentUser;

  return {
    list: notificationState.notifications,
    count: notificationState.count,
    offset: notificationState.offset,
    loading: notificationState.loading,
    loadingMore: notificationState.loadingMore,
    error: notificationState.error,
    public_address: '0x577ec61db11b49286839f502481776f0be01104d'
  };
};

const ActivityPanel = compose(
  connect(
    mapStateToProps,
    {
      load: actions.loadNotifications,
      loadMore: actions.loadMoreNotifications
    }
  ),
  LoadComponent('public_address')
)(ActivityPanelComponent);

export default ActivityPanel;

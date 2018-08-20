import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import base from '../BaseStyles.module.scss';
import styles from './ActivityPanel.module.scss';
import { Link } from 'react-router-dom';
import { LoadComponent } from 'hocs';
import { map } from 'lodash';
import { Button, Card, ListGroup, Loader, Text, ZeroState } from 'components';
import { NotificationItem } from 'explorer-components';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { rootActivitySelector } from 'public-modules/Activity/selectors';
import { actions } from 'public-modules/Activity';

class ActivityPanelComponent extends React.Component {
  renderActivity = list => {
    return map(activity => {
      const { created, data, notification } = activity;
      const { bounty_title, link } = data;
      const { notification_name: notification_id } = notification;

      // strips away the host from url
      const relative_link = link.replace(/^.*\/\/[^\/]+/, '');

      return (
        <ListGroup.ListItem hover>
          <Link to={relative_link} className={styles.link}>
            <NotificationItem
              type={notification_id}
              title={bounty_title}
              createdAt={created}
            />
          </Link>
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
        {list.length < count && (
          <div className={base.loadMoreButton}>
            <Button loading={loadingMore} onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </React.Fragment>
    );

    if (count <= 0) {
      bodyClass = base.bodyLoading;
      body = (
        <div className={base.zeroState}>
          <ZeroState
            title={'You have no activity yet'}
            text={
              'Once you start using the platform, your activity will show up here.'
            }
            iconColor="blue"
            icon={['fal', 'chart-line']}
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
  const activityState = rootActivitySelector(state);
  const currentUser = getCurrentUserSelector(state);
  const { public_address } = currentUser;

  return {
    list: activityState.activity,
    count: activityState.count,
    offset: activityState.offset,
    loading: activityState.loading,
    loadingMore: activityState.loadingMore,
    error: activityState.error,
    public_address
  };
};

const ActivityPanel = compose(
  connect(
    mapStateToProps,
    {
      load: actions.loadActivity,
      loadMore: actions.loadMoreActivity
    }
  ),
  LoadComponent('public_address')
)(ActivityPanelComponent);

export default ActivityPanel;

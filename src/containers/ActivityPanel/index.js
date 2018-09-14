import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './ActivityPanel.module.scss';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { NotificationItem } from 'explorer-components';
import { Button, Card, ListGroup, Loader, ZeroState } from 'components';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { rootActivitySelector } from 'public-modules/Activity/selectors';
import { actions } from 'public-modules/Activity';

class ActivityPanelComponent extends React.Component {
  renderActivity = list => {
    return map(activity => {
      const { data, notification } = activity;
      const { bounty_title, link } = data;
      const {
        notification_name: notification_id,
        notification_created: created
      } = notification;

      // strips away the host from url
      const relative_link = link.replace(new RegExp('^.*//[^/]+'), '');

      return (
        <ListGroup.ListItem
          key={activity.id}
          className={styles.activityListItem}
          hover
        >
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
    const {
      className,
      bodyClass,
      list,
      count,
      loading,
      loadingMore,
      error
    } = this.props;
    const loadMore = () => this.props.loadMore(this.props.public_address);

    let zeroStateClass;
    let body = (
      <React.Fragment>
        <ListGroup className={styles.listGroup}>
          {this.renderActivity(list)}
        </ListGroup>
        {list.length < count && (
          <div className={styles.loadMoreButton}>
            <Button loading={loadingMore} onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </React.Fragment>
    );

    if (count <= 0) {
      zeroStateClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
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
      zeroStateClass = styles.bodyLoading;
      body = <Loader color="blue" size="medium" />;
    }

    if (error) {
      zeroStateClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
          <ZeroState
            type="error"
            text={'Something went wrong. Try again later.'}
            iconColor="red"
            icon={['fal', 'exclamation-triangle']}
          />
        </div>
      );
    }

    return (
      <Card className={className}>
        <Card.Header>
          <Card.HeaderTitle>My Activity</Card.HeaderTitle>
        </Card.Header>
        <Card.Body className={`${bodyClass} ${zeroStateClass}`}>
          {body}
        </Card.Body>
      </Card>
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
  )
)(ActivityPanelComponent);

export default ActivityPanel;

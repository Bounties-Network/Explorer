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
import intl from 'react-intl-universal';
import {
  faChartLine,
  faExclamationTriangle
} from '@fortawesome/pro-light-svg-icons';

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
              {intl.get('actions.load_more')}
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
            title={intl.get('sections.activity.zero_state.title')}
            text={intl.get('sections.activity.zero_state.description')}
            iconColor="blue"
            faIcon={faChartLine}
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
            text={intl.get('errors.500')}
            iconColor="red"
            faIcon={faExclamationTriangle}
          />
        </div>
      );
    }

    return (
      <Card className={className}>
        <Card.Header>
          <Card.HeaderTitle>
            {intl.get('sections.activity.title')}
          </Card.HeaderTitle>
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

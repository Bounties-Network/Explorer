import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styles from './BountiesPanel.module.scss';
import { LoadComponent } from 'hocs';
import { map } from 'lodash';
import {
  Button,
  Card,
  ListGroup,
  Loader,
  Tabs,
  Text,
  ZeroState
} from 'components';
import { BountyItem } from 'explorer-components';
import { tabDataSelector, currentTabSelector } from './selectors';
import { bountiesCountSelector } from 'public-modules/Bounties/selectors';
import { draftsCountSelector } from 'public-modules/Drafts/selectors';
import { actions as bountiesActions } from 'public-modules/Bounties';
import { actions as draftsActions } from 'public-modules/Drafts';
import { actions } from './reducer';

class BountiesPanelComponent extends React.Component {
  renderBounties = list => {
    return map(bounty => {
      const {
        id,
        calculated_fulfillmentAmount,
        bounty_created,
        created,
        fulfillment_count,
        title,
        tokenSymbol,
        usd_price,
        uid
      } = bounty;

      const isDraft = this.props.currentTab === 'drafts';

      return (
        <ListGroup.ListItem hover>
          <Link
            to={
              this.props.currentTab === 'drafts'
                ? `/bounty/draft/${uid}`
                : `/bounty/${id}`
            }
            className={styles.link}
          >
            <BountyItem
              bountyId={id}
              title={title}
              submissions={fulfillment_count}
              value={Number(calculated_fulfillmentAmount)}
              currency={tokenSymbol}
              usd_value={parseFloat(usd_price).toFixed(0)}
              createdAt={isDraft ? created : bounty_created}
              isDraft={isDraft}
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
      tabData,
      activeCount,
      currentTab,
      draftsCount,
      history,
      setActiveTab
    } = this.props;

    const { list, count, loading, loadingMore, error } = tabData;

    let zeroStateClass;
    let body = (
      <React.Fragment>
        <ListGroup className={styles.listGroup}>
          {this.renderBounties(list)}
        </ListGroup>
        {list.length < count && (
          <div className={styles.loadMoreButton}>
            <Button
              loading={loadingMore}
              onClick={this.props[`${currentTab}LoadMore`]}
            >
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
            title={`You have no ${currentTab} bounties`}
            text={`It looks like you don\'t have any ${currentTab} bounties at the
              moment. Enter a title for a new bounty here to get started
              creating one!`}
            action
            actionText="Create new bounty"
            onActionClick={() => history.push('/createBounty')}
            icon={['fal', 'expand']}
            iconColor="blue"
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
            text="Something went wrong. Try again later."
            iconColor="red"
            icon={['fal', 'exclamation-triangle']}
          />
        </div>
      );
    }

    return (
      <Card className={className}>
        <Card.Header>
          <div className={styles.bountiesPanelCardHeader}>
            <Text inline typeScale="h3" weight="fontWeight-medium">
              My Bounties
            </Text>
            <Link to="/profile">
              <Text link typeScale="Small" className={styles.decoratedLink}>
                View All
              </Text>
            </Link>
          </div>
          <Card.HeaderTabs
            onSelect={setActiveTab}
            activeKey={currentTab}
            defaultActiveKey={currentTab}
          >
            <Tabs.Tab tabColor="green" tabCount={activeCount} eventKey="active">
              Active
            </Tabs.Tab>
            <Tabs.Tab tabColor="blue" tabCount={draftsCount} eventKey="drafts">
              Drafts
            </Tabs.Tab>
          </Card.HeaderTabs>
        </Card.Header>
        <Card.Body className={`${bodyClass} ${zeroStateClass}`}>
          {body}
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const currentTab = currentTabSelector(state);
  const tabData = tabDataSelector(state);
  const activeCount = bountiesCountSelector(state);
  const draftsCount = draftsCountSelector(state);

  return {
    currentTab,
    tabData,
    activeCount,
    draftsCount
  };
};

const BountiesPanel = compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      load: actions.loadBountiesPanel,
      setActiveTab: actions.setActiveTab,
      activeLoadMore: bountiesActions.loadMoreBounties,
      draftsLoadMore: draftsActions.loadMoreDrafts
    }
  )
)(BountiesPanelComponent);

export default BountiesPanel;

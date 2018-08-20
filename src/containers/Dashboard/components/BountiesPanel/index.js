import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import base from '../BaseStyles.module.scss';
import styles from './BountiesPanel.module.scss';
import { LoadComponent } from 'hocs';
import { map } from 'lodash';
import {
  Button,
  Card,
  ListGroup,
  Loader,
  Tabs,
  ZeroState
} from 'components';
import { BountyItem } from '../';
import {
  tabDataSelector,
  currentTabSelector
} from './selectors';
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
        usd_price
      } = bounty;

      const isDraft = this.props.currentTab === 'drafts';

      return (
        <ListGroup.ListItem hover>
          <Link
            to={
              this.props.currentTab === 'drafts'
                ? `/bounty/draft/${id}`
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
      tabData,
      activeCount,
      currentTab,
      draftsCount,
      history,
      setActiveTab
    } = this.props;

    const { list, count, loading, loadingMore, error } = tabData;

    let bodyClass;
    let body = (
      <React.Fragment>
        <ListGroup>{this.renderBounties(list)}</ListGroup>
        {list.length < count && (
          <div className={base.loadMoreButton}>
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
      bodyClass = base.bodyLoading;
      body = (
        <div className={base.zeroState}>
          <ZeroState
            title={`You have no ${currentTab} bounties`}
            text={
              `It looks like you don't have any active bounties at the
              moment. Enter a title for a new bounty here to get started
              creating one!`
            }
            action
            actionText='Create new bounty'
            onActionClick={() => history.push('/createBounty')}
            iconColor='blue'
          />
        </div>
      );
    }

    if (loading) {
      bodyClass = base.bodyLoading;
      body = <Loader color='blue' size='medium' />;
    }

    if (error) {
      bodyClass = base.bodyLoading;
      body = (
        <div className={base.zeroState}>
          <ZeroState
            type='error'
            text='Something went wrong. Try again later.'
            iconColor='red'
            icon={['far', 'exclamation-triangle']}
          />
        </div>
      );
    }

    return (
      <div className={base.cardContainer}>
        <Card className={base.card}>
          <Card.Header>
            <Card.HeaderTitle>My Bounties</Card.HeaderTitle>
            <Card.HeaderTabs
              onSelect={setActiveTab}
              activeKey={currentTab}
              defaultActiveKey={currentTab}
            >
              <Tabs.Tab
                tabColor='green'
                tabCount={activeCount}
                eventKey='active'
              >
                Active
              </Tabs.Tab>
              <Tabs.Tab
                tabColor='blue'
                tabCount={draftsCount}
                eventKey='drafts'
              >
                Drafts
              </Tabs.Tab>
            </Card.HeaderTabs>
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
  ),
  LoadComponent('')
)(BountiesPanelComponent);

export default BountiesPanel;

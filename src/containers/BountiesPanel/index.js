import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styles from './BountiesPanel.module.scss';
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
import intl from 'react-intl-universal';
import {
  faExpand,
  faExclamationTriangle
} from '@fortawesome/pro-light-svg-icons';

class BountiesPanelComponent extends React.Component {
  renderBounties = list => {
    return map(bounty => {
      const {
        id,
        calculated_fulfillment_amount,
        bounty_created,
        created,
        fulfillment_count,
        title,
        token_symbol,
        usd_price,
        uid
      } = bounty;

      const isDraft = this.props.currentTab === 'drafts';

      return (
        <ListGroup.ListItem key={id} hover>
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
              value={Number(calculated_fulfillment_amount)}
              currency={token_symbol}
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
            title={intl.get('sections.bounties.zero_state.title', {
              tab: currentTab
            })}
            text={intl.get('sections.bounties.zero_state.description', {
              tab: currentTab
            })}
            action
            actionText={intl.get(
              'sections.bounties.zero_state.actions.new_bounty'
            )}
            onActionClick={() => history.push('/createBounty')}
            faIcon={faExpand}
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
          <div className={styles.bountiesPanelCardHeader}>
            <Text inline typeScale="h3" weight="fontWeight-medium">
              {intl.get('sections.bounties.title')}
            </Text>
            <Link to="/profile">
              <Text typeScale="Body" className={styles.decoratedLink}>
                {intl.get('actions.view_all')}
              </Text>
            </Link>
          </div>
          <Card.HeaderTabs
            onSelect={setActiveTab}
            activeKey={currentTab}
            defaultActiveKey={currentTab}
          >
            <Tabs.Tab tabColor="green" tabCount={activeCount} eventKey="active">
              {intl.get('sections.bounties.tabs.active')}
            </Tabs.Tab>
            <Tabs.Tab tabColor="blue" tabCount={draftsCount} eventKey="drafts">
              {intl.get('sections.bounties.tabs.drafts')}
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

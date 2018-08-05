import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import base from '../BaseStyles.module.scss';
import styles from './BountiesPanel.module.scss';
import { LoadComponent } from 'hocs';
import { map } from 'lodash';
import { FULFILLER_KEY, ISSUER_KEY } from './constants';
import { Button, Card, Table, Loader, Tabs, Text, ZeroState } from 'components';
import { SubmissionItem } from '../';
import { loadedUserStatsSelector } from 'public-modules/UserInfo/selectors';
import { fulfillmentsSelector } from 'public-modules/Fulfillments/selectors';
import { submissionsPanelSelector } from './selectors';
import { actions as fulfillmentActions } from 'public-modules/Fulfillments';
import { actions } from './reducer';

class SubmissionsPanelComponent extends React.Component {
  renderSubmissions = list => {
    return map(submission => {
      const {
        bounty_data,
        fulfiller,
        created,
        accepted,
        usd_price
      } = submission;
      const {
        title,
        tokenSymbol,
        tokenDecimals,
        fulfillmentAmount
      } = bounty_data;

      return (
        <SubmissionItem
          title={title}
          fulfiller={fulfiller}
          submissionDate={created}
          status={accepted}
          usd={(usd_price || 0).toFixed(0)}
          amount={(fulfillmentAmount / 10 ** tokenDecimals).toFixed(2)}
          currency={tokenSymbol}
        />
      );
    }, list);
  };

  render() {
    const {
      className,
      setActiveTab,
      currentTab,
      list,
      count,
      loading,
      loadingMore,
      loadMore,
      error,
      total_received,
      total_submitted
    } = this.props;

    let bodyClass;
    let body = (
      <React.Fragment>
        <Table>
          <Table.Header>
            <Table.HeaderCell flexGrow={4}>Bounty title</Table.HeaderCell>
            <Table.HeaderCell flexGrow={3}>Fulfiller</Table.HeaderCell>
            <Table.HeaderCell flexGrow={2}>Submission date</Table.HeaderCell>
            <Table.HeaderCell flexGrow={2}>Status</Table.HeaderCell>
            <Table.HeaderCell flexGrow={2}>Payment amount</Table.HeaderCell>
          </Table.Header>
          {this.renderSubmissions(list)}
        </Table>
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
            title={`You have ${currentTab} 0 submissions`}
            text={`It looks like you don\'t have any submissions. Come back after you have ${currentTab} a fulfillment!`}
            action
            actionText={'Create new bounty'}
            onActionClick={() => {}}
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
      <div className={`${className} ${base.cardContainer}`}>
        <Card className={base.card}>
          <Card.Header>
            <Card.HeaderTitle>Submissions</Card.HeaderTitle>
            <Card.HeaderTabs
              onSelect={setActiveTab}
              activeKey={currentTab}
              defaultActiveKey={currentTab}
            >
              <Tabs.Tab
                tabColor="blue"
                tabCount={total_received}
                eventKey={'received'}
              >
                Received
              </Tabs.Tab>
              <Tabs.Tab
                tabColor="green"
                tabCount={total_submitted}
                eventKey={'submitted'}
              >
                Submitted
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
  const fulfillmentsState = fulfillmentsSelector(state);
  const stats = loadedUserStatsSelector(state);

  return {
    currentTab: submissionsPanelSelector(state).currentTab,
    list: fulfillmentsState.fulfillments,
    count: fulfillmentsState.count,
    loading: fulfillmentsState.loading,
    loadingMore: fulfillmentsState.loadingMore,
    error: fulfillmentsState.error,
    total_received: stats.issuer.fulfillments,
    total_submitted: stats.fulfiller.total
  };
};

const SubmissionsPanel = compose(
  connect(
    mapStateToProps,
    {
      load: actions.loadSubmissionsPanel,
      loadMore: fulfillmentActions.loadMoreFulfillments,
      setActiveTab: actions.setActiveTab
    }
  ),
  LoadComponent('')
)(SubmissionsPanelComponent);

export default SubmissionsPanel;

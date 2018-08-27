import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './SubmissionsPanel.module.scss';
import { LoadComponent } from 'hocs';
import { map } from 'lodash';
import { Button, Card, Table, Loader, Tabs, ZeroState } from 'components';
import { SubmissionItem } from 'explorer-components';
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
        user,
        fulfillment_created,
        accepted,
        usd_price
      } = submission;
      const {
        id,
        title,
        tokenSymbol,
        calculated_fulfillmentAmount,
        bountyStage
      } = bounty_data;
      const { public_address, profile_image } = user;

      return (
        <SubmissionItem
          bountyId={id}
          bountyStage={bountyStage}
          title={title}
          fulfiller={public_address}
          fulfiller_img={profile_image}
          submissionDate={fulfillment_created}
          status={accepted}
          usd={(usd_price || 0).toFixed(0)}
          amount={Number(calculated_fulfillmentAmount)}
          currency={tokenSymbol}
        />
      );
    }, list);
  };

  render() {
    const {
      className,
      bodyClass,
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

    let zeroStateClass;
    let body = (
      <React.Fragment>
        <Table>
          <Table.Header>
            <Table.HeaderCell flexGrow={5}>Bounty title</Table.HeaderCell>
            <Table.HeaderCell flexGrow={2}>Fulfiller</Table.HeaderCell>
            <Table.HeaderCell contentType="numerical" flexGrow={2}>
              Submission date
            </Table.HeaderCell>
            <Table.HeaderCell flexGrow={2}>Status</Table.HeaderCell>
            <Table.HeaderCell contentType="numerical" flexGrow={2}>
              Payment amount
            </Table.HeaderCell>
          </Table.Header>
          {this.renderSubmissions(list)}
        </Table>
        {list.length < count ? (
          <div className={styles.loadMoreButton}>
            <Button loading={loadingMore} onClick={loadMore}>
              Load More
            </Button>
          </div>
        ) : null}
      </React.Fragment>
    );

    if (count <= 0) {
      zeroStateClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
          <ZeroState
            title={`You have ${currentTab} 0 submissions`}
            text={`It looks like you don't have any submissions. Come back after you have ${currentTab} a fulfillment!`}
            iconColor="blue"
            icon={['fal', 'file-alt']}
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
            icon={['far', 'exclamation-triangle']}
          />
        </div>
      );
    }

    return (
      <Card className={className}>
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
        <Card.Body className={`${bodyClass} ${zeroStateClass}`}>
          {body}
        </Card.Body>
      </Card>
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
  )
)(SubmissionsPanelComponent);

export default SubmissionsPanel;

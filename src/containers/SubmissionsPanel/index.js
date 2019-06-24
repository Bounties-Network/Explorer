import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './SubmissionsPanel.module.scss';
import { map } from 'lodash';
import { Button, Card, Table, Loader, Tabs, ZeroState } from 'components';
import { SubmissionItem } from 'explorer-components';
import { loadedUserStatsSelector } from 'public-modules/UserInfo/selectors';
import { fulfillmentsSelector } from 'public-modules/Fulfillments/selectors';
import { submissionsPanelSelector } from './selectors';
import { actions as fulfillmentActions } from 'public-modules/Fulfillments';
import { actions } from './reducer';
import intl from 'react-intl-universal';

class SubmissionsPanelComponent extends React.Component {
  renderSubmissions = list => {
    return map(submission => {
      const {
        id: submission_id,
        bounty_data,
        user,
        fulfillment_created,
        accepted,
        usd_price
      } = submission;
      const {
        id,
        title,
        token_symbol,
        calculated_fulfillment_amount,
        bounty_stage
      } = bounty_data;
      const { public_address, small_profile_image_url } = user;
      return (
        <SubmissionItem
          key={submission_id}
          bountyId={id}
          bounty_stage={bounty_stage}
          title={title}
          fulfiller={public_address}
          fulfiller_img={small_profile_image_url}
          submissionDate={fulfillment_created}
          status={accepted}
          usd={(usd_price || 0).toFixed(0)}
          amount={Number(calculated_fulfillment_amount)}
          currency={token_symbol}
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
            <Table.HeaderCell flexBasis="40%">
              {intl.get('sections.submissions.headers.title')}
            </Table.HeaderCell>
            <Table.HeaderCell flexBasis="16%">
              {intl.get('sections.submissions.headers.fulfiller')}
            </Table.HeaderCell>
            <Table.HeaderCell flexBasis="15%" contentType="numerical">
              {intl.get('sections.submissions.headers.date')}
            </Table.HeaderCell>
            <Table.HeaderCell flexBasis="16%">
              {intl.get('sections.submissions.headers.status')}
            </Table.HeaderCell>
            <Table.HeaderCell flexBasis="13%" contentType="numerical">
              {intl.get('sections.submissions.headers.payment')}
            </Table.HeaderCell>
          </Table.Header>
          {this.renderSubmissions(list)}
        </Table>
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
            title={intl.get('sections.submissions.zero_state.title', {
              currentTab
            })}
            text={intl.get('sections.submissions.zero_state.description', {
              currentTab
            })}
            iconColor="blue"
            faIcon={['fal', 'level-up']}
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
            faIcon={['fal', 'exclamation-triangle']}
          />
        </div>
      );
    }

    return (
      <Card className={className}>
        <Card.Header>
          <Card.HeaderTitle>
            {intl.get('sections.submissions.title')}
          </Card.HeaderTitle>
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
              {intl.get('sections.submissions.tabs.received')}
            </Tabs.Tab>
            <Tabs.Tab
              tabColor="green"
              tabCount={total_submitted}
              eventKey={'submitted'}
            >
              {intl.get('sections.submissions.tabs.submitted')}
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

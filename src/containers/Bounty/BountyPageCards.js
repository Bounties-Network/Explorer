import React from 'react';
import styles from './BountyPageCards.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ApplicantsCard, CommentsCard, SubmissionsCard } from './components';
import { Tabs } from 'components';
import { rootBountyPageSelector } from './selectors';
import { fulfillmentsSelector } from 'public-modules/Fulfillments/selectors';
import { applicantsSelector } from 'public-modules/Applicants/selectors';
import { commentsSelector } from 'public-modules/Comments/selectors';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as applicantsActions } from 'public-modules/Applicants';
import { actions as fulfillmentActions } from 'public-modules/Fulfillment';
import { actions as commentsActions } from 'public-modules/Comments';
import { actions as loginActions } from 'containers/Login/reducer';
import { actions as bountyUIActions } from './reducer';
import intl from 'react-intl-universal';

export const defaultTab = 'comments';

export const mostInterestingTab = (bounty, comments) => {
  if (bounty.fulfillment_count > 0) {
    return 'submissions';
  } else if (comments.list.length > 0) {
    return 'comments';
  } else if (bounty.application_count > 0) {
    return 'applicants';
  } else {
    return 'comments';
  }
};

class BountyPageCardsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabLoaded: false
    };
  }

  setMostInterestingTab() {
    if (!this.state.tabLoaded) {
      const {
        setActiveTabAction: setActiveTab,
        fulfillments,
        applicants,
        comments,
        bounty
      } = this.props;

      if (!fulfillments.loading && !comments.loading && !applicants.loading) {
        this.setState({
          tabLoaded: true
        });
        setActiveTab(mostInterestingTab(bounty, comments));
      }
    }
  }

  componentDidUpdate() {
    this.setMostInterestingTab();
  }

  componentDidMount() {
    this.setMostInterestingTab();
  }

  render() {
    const {
      initiateWalkthrough,
      initiateLoginProtection,
      showLogin,
      showModal,
      setRatingModal,
      setActiveTabAction: setActiveTab,
      setOpenCommentsAction: setOpenComments,
      currentTab,
      fulfillments,
      applicants,
      comments,
      fulComments,
      bounty,
      currentUser,
      acceptFulfillment,
      changeApplicationState,
      postComment,
      postFulComment,
      loadMoreComments,
      loadMoreFulComments,
      loadMoreFulfillments,
      loadMoreApplicants,
      openComments
    } = this.props;

    const bountyBelongsToLoggedInUser =
      currentUser && bounty.user.public_address === currentUser.public_address;

    let tabBody = null;

    if (currentTab === 'applicants') {
      tabBody = (
        <ApplicantsCard
          applicants={applicants}
          currentUser={currentUser}
          bountyBelongsToLoggedInUser={bountyBelongsToLoggedInUser}
          changeApplicationState={changeApplicationState}
          loadMoreApplicants={loadMoreApplicants}
        />
      );
    }

    if (currentTab === 'submissions') {
      tabBody = (
        <SubmissionsCard
          fulfillments={fulfillments}
          bounty={bounty}
          loadMoreFulfillments={loadMoreFulfillments}
          bountyBelongsToLoggedInUser={bountyBelongsToLoggedInUser}
          currentUser={currentUser}
          initiateLoginProtection={initiateLoginProtection}
          initiateWalkthrough={initiateWalkthrough}
          acceptFulfillment={acceptFulfillment}
          showModal={showModal}
          setRatingModal={setRatingModal}
          setOpenComments={setOpenComments}
          openComments={openComments}
          showLogin={showLogin}
          postFulComment={postFulComment}
          loadMoreFulComments={loadMoreFulComments}
          comments={fulComments}
        />
      );
    }

    if (currentTab === 'comments') {
      tabBody = (
        <CommentsCard
          comments={comments}
          loadMoreComments={loadMoreComments}
          postComment={postComment}
          bounty={bounty}
          showLogin={showLogin}
          currentUser={currentUser}
        />
      );
    }

    let tabs = [];
    if (bounty.fulfillers_need_approval) {
      tabs.push(
        <Tabs.Tab
          key={'applicants'}
          eventKey={'applicants'}
          tabClassName={styles.tab}
          tabColor="lightGrey"
          tabCount={bounty.application_count}
          typeScale="h4"
          tabTextClass={styles.tabText}
        >
          {intl.get('sections.bounty.tabs.applicants.title')}
        </Tabs.Tab>
      );
    }
    tabs.push(
      <Tabs.Tab
        key={'submission'}
        eventKey={'submissions'}
        tabClassName={styles.tab}
        tabColor="lightGrey"
        tabCount={bounty.fulfillment_count}
        typeScale="h4"
        tabTextClass={styles.tabText}
      >
        {intl.get('sections.bounty.tabs.submissions.title')}
      </Tabs.Tab>,
      <Tabs.Tab
        key={'comments'}
        eventKey={'comments'}
        tabClassName={styles.tab}
        tabColor="lightGrey"
        tabCount={
          comments.list.length ? comments.list.length : bounty.comment_count
        }
        typeScale="h4"
        tabTextClass={styles.tabText}
      >
        {intl.get('sections.bounty.tabs.comments.title')}
      </Tabs.Tab>
    );

    return (
      <div>
        <div className={styles.tabsContainer}>
          <Tabs
            className={styles.tabs}
            currentKey={currentTab}
            defaultActiveKey={currentTab}
            onSelect={setActiveTab}
          >
            {tabs}
          </Tabs>
        </div>
        {tabBody}
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  const bountyPage = rootBountyPageSelector(state);
  const fulfillmentsState = fulfillmentsSelector(state);
  const applicantsState = applicantsSelector(state);
  const commentsState = commentsSelector(state);

  return {
    // ui state
    modalType: bountyPage.modalType,
    modalVisible: bountyPage.modalVisible,
    currentTab: bountyPage.currentTab,
    openComments: bountyPage.openComments,
    // data
    fulfillments: {
      ...fulfillmentsState,
      list: fulfillmentsState.fulfillments
    },
    applicants: {
      ...applicantsState,
      list: applicantsState.applicants
    },
    comments: {
      ...commentsState,
      list: commentsState.comments
    },
    fulComments: {
      ...commentsState,
      list: commentsState.fulComments
    }
  };
};

const BountyPageCards = compose(
  connect(
    mapStateToProps,
    {
      showModal: bountyUIActions.showModal,
      setRatingModal: bountyUIActions.setRatingModal,
      acceptFulfillment: fulfillmentActions.acceptFulfillment,
      changeApplicationState: applicantsActions.changeApplicationState,
      postComment: commentsActions.postComment,
      postFulComment: commentsActions.postFulComment,
      loadMoreComments: commentsActions.loadMoreComments,
      loadMoreFulComments: commentsActions.loadMoreFulComments,
      loadMoreFulfillments: fulfillmentsActions.loadMoreFulfillments,
      loadMoreApplicants: applicantsActions.loadMoreApplicants,
      showLogin: loginActions.showLogin
    }
  )
)(BountyPageCardsComponent);

export default BountyPageCards;

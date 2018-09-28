import React from 'react';
import styles from './SubmissionsAndCommentsCard.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map as fpMap } from 'lodash';
import { SubmissionItem, NewCommentForm, CommentItem } from './components';
import { Button, ListGroup, Loader, Tabs, Text, ZeroState } from 'components';
import { rootBountyPageSelector } from './selectors';
import { fulfillmentsSelector } from 'public-modules/Fulfillments/selectors';
import { commentsSelector } from 'public-modules/Comments/selectors';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as fulfillmentActions } from 'public-modules/Fulfillment';
import { actions as commentsActions } from 'public-modules/Comments';
import { actions as loginActions } from 'containers/Login/reducer';
import { actions as bountyUIActions } from './reducer';

const map = fpMap.convert({ cap: false });

export const defaultTab = 'comments';

export const mostInterestingTab = fulfillments => {
  if (!fulfillments) {
    return defaultTab;
  }

  if (fulfillments.list.length > 0) {
    return 'submissions';
  }

  return defaultTab;
};

class SubmissionsAndCommentsCardComponent extends React.Component {
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
        comments
      } = this.props;

      if (!fulfillments.loading && !comments.loading) {
        this.setState({
          tabLoaded: true
        });
        setActiveTab(mostInterestingTab(fulfillments));
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
      currentTab,
      fulfillments,
      comments,
      bounty,
      currentUser,
      acceptFulfillment,
      postComment,
      loadMoreComments,
      loadMoreFulfillments
    } = this.props;

    const bountyBelongsToLoggedInUser =
      currentUser && bounty.issuer === currentUser.public_address;

    const renderFulfillments = list => {
      return map(fulfillment => {
        const {
          fulfillment_id,
          fulfiller_email,
          fulfiller,
          sourceDirectoryHash,
          sourceFileName,
          accepted,
          created,
          description,
          url,
          user,
          fulfiller_review,
          issuer_review
        } = fulfillment;

        const { name, profile_image } = user;
        const submissionBelongsToLoggedInUser =
          currentUser && fulfiller === currentUser.public_address;

        return (
          <ListGroup.ListItem
            key={fulfillment_id}
            className={styles.listItem}
            fullBorder
          >
            <SubmissionItem
              fulfillmentId={fulfillment_id}
              fulfiller_name={name}
              fulfiller_email={fulfiller_email}
              fulfiller_address={fulfiller}
              fulfiller_img={profile_image}
              bounty={bounty}
              url={url}
              description={description}
              dataHash={sourceDirectoryHash}
              dataFileName={sourceFileName}
              created={created}
              accepted={accepted}
              fulfiller_review={fulfiller_review || null}
              issuer_review={issuer_review || null}
              bountyBelongsToLoggedInUser={bountyBelongsToLoggedInUser}
              submissionBelongsToLoggedInUser={submissionBelongsToLoggedInUser}
              acceptFulfillment={() =>
                initiateLoginProtection(() =>
                  initiateWalkthrough(() =>
                    acceptFulfillment(bounty.id, fulfillment_id)
                  )
                )
              }
              initiateLoginProtection={initiateLoginProtection}
              showModal={showModal}
              setRatingModal={setRatingModal}
            />
          </ListGroup.ListItem>
        );
      }, list);
    };

    const renderComments = () => {
      return map(comment => {
        const { id, text, user, created } = comment;
        const { name, profile_image, public_address } = user;

        return (
          <ListGroup.ListItem key={id} className={styles.listItem} fullBorder>
            <CommentItem
              name={name}
              address={public_address}
              img={profile_image}
              text={text}
              created={created}
            />
          </ListGroup.ListItem>
        );
      }, comments.list);
    };

    let body = null;
    let bodyClass = '';

    if (currentTab === 'submissions') {
      body = (
        <ListGroup className={styles.borderStyle}>
          {[
            ...renderFulfillments(fulfillments.list),
            fulfillments.list.length < fulfillments.count && (
              <ListGroup.ListItem key="load" className={styles.loadMoreButton}>
                <Button
                  loading={fulfillments.loadingMore}
                  onClick={loadMoreFulfillments}
                >
                  Load More
                </Button>
              </ListGroup.ListItem>
            )
          ]}
        </ListGroup>
      );

      if (!fulfillments.list.length) {
        bodyClass = styles.bodyLoading;
        body = (
          <div className={styles.zeroState}>
            <ZeroState
              title={'There are 0 submissions'}
              text={'Submissions to this bounty will appear here.'}
              iconColor="blue"
              icon={['fal', 'level-up']}
            />
          </div>
        );
      }

      if (bounty.private_fulfillments) {
        if (fulfillments.list.length) {
          body = (
            <React.Fragment>
              {body}
              <Text
                alignment="align-center"
                color="defaultGrey"
                typeScale="Small"
              >
                Submissions to this bounty are hidden.
                {bountyBelongsToLoggedInUser
                  ? ' The submissions are only visible to you and the fulfiller.'
                  : ' Your submissions are only visible to you and the bounty issuer.'}
              </Text>
            </React.Fragment>
          );
        }

        if (!fulfillments.list.length && bountyBelongsToLoggedInUser) {
          bodyClass = styles.bodyLoading;
          body = (
            <div className={styles.zeroState}>
              <ZeroState
                title={'There are 0 submissions'}
                text={
                  'Submissions to this bounty will appear here and will \
                only be visible to you. Additionally, fulfillers will be able \
                to see the submissions that they created.'
                }
                iconColor="blue"
                icon={['fal', 'lock']}
              />
            </div>
          );
        }

        if (!fulfillments.list.length && !bountyBelongsToLoggedInUser) {
          bodyClass = styles.bodyLoading;
          body = (
            <div className={styles.zeroState}>
              <ZeroState
                title={'Submissions are private'}
                text={
                  'The submissions for this bounty have been set to private.'
                }
                iconColor="blue"
                icon={['fal', 'lock']}
              />
            </div>
          );
        }
      }

      if (fulfillments.loading) {
        bodyClass = styles.bodyLoading;
        body = <Loader color="blue" size="medium" />;
      }
    }

    if (currentTab === 'comments') {
      const newCommentForm = (
        <ListGroup.ListItem
          key="form"
          className={styles.newCommentForm}
          borderColor="lightGrey"
          fullBorder
        >
          <NewCommentForm
            className={styles.newCommentForm}
            signedIn={!!currentUser}
            onSubmit={
              !!currentUser
                ? values => postComment(bounty.id, values.text)
                : showLogin
            }
            loading={comments.posting}
          />
        </ListGroup.ListItem>
      );

      body = (
        <ListGroup className={styles.borderStyle}>
          {[
            newCommentForm,
            ...renderComments(),
            comments.list.length < comments.count && (
              <ListGroup.ListItem
                key="load"
                className={styles.loadMoreButton}
                fullBorder
              >
                <Button
                  loading={comments.loadingMore}
                  onClick={loadMoreComments}
                >
                  Load More
                </Button>
              </ListGroup.ListItem>
            )
          ]}
        </ListGroup>
      );

      if (!comments.list.length) {
        body = (
          <ListGroup className={styles.borderStyle}>
            {[
              newCommentForm,
              <ListGroup.ListItem
                key="zero"
                className={styles.zeroState}
                fullBorder
              >
                <ZeroState
                  title={'There are 0 comments'}
                  text={'Submit a comment using the form above.'}
                  iconColor="blue"
                  icon={['fal', 'comments']}
                />
              </ListGroup.ListItem>
            ]}
          </ListGroup>
        );
      }

      if (comments.loading) {
        bodyClass = styles.bodyLoading;
        body = <Loader color="blue" size="medium" />;
      }
    }

    return (
      <div>
        <div className={styles.tabsContainer}>
          <Tabs
            className={styles.tabs}
            currentKey={currentTab}
            defaultActiveKey={currentTab}
            onSelect={setActiveTab}
          >
            <Tabs.Tab
              tabClassName={styles.tab}
              tabColor="lightGrey"
              tabCount={bounty.fulfillment_count}
              eventKey={'submissions'}
              typeScale="h4"
              tabTextClass={styles.tabText}
            >
              Submissions
            </Tabs.Tab>
            <Tabs.Tab
              tabClassName={styles.tab}
              tabColor="lightGrey"
              tabCount={
                comments.list.length
                  ? comments.list.length
                  : bounty.comment_count
              }
              eventKey={'comments'}
              typeScale="h4"
              tabTextClass={styles.tabText}
            >
              Comments
            </Tabs.Tab>
          </Tabs>
        </div>
        <div className={bodyClass}>{body}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  const bountyPage = rootBountyPageSelector(state);
  const fulfillmentsState = fulfillmentsSelector(state);
  const commentsState = commentsSelector(state);

  return {
    // ui state
    modalType: bountyPage.modalType,
    modalVisible: bountyPage.modalVisible,
    currentTab: bountyPage.currentTab,

    // data
    fulfillments: {
      ...fulfillmentsState,
      list: fulfillmentsState.fulfillments
    },
    comments: {
      ...commentsState,
      list: commentsState.comments
    }
  };
};

const SubmissionsAndCommentsCard = compose(
  connect(
    mapStateToProps,
    {
      showModal: bountyUIActions.showModal,
      setRatingModal: bountyUIActions.setRatingModal,
      acceptFulfillment: fulfillmentActions.acceptFulfillment,
      postComment: commentsActions.postComment,
      loadMoreComments: commentsActions.loadMoreComments,
      loadMoreFulfillments: fulfillmentsActions.loadMoreFulfillments,
      showLogin: loginActions.showLogin
    }
  )
)(SubmissionsAndCommentsCardComponent);

export default SubmissionsAndCommentsCard;

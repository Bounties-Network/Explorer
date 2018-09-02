import React from 'react';
import styles from './SubmissionsAndCommentsCard.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map as fpMap, filter } from 'lodash';
import { SubmissionItem, NewCommentForm, CommentItem } from './components';
import { Button, ListGroup, Loader, Tabs, Text, ZeroState } from 'components';
import { rootBountyPageSelector } from './selectors';
import { fulfillmentsSelector } from 'public-modules/Fulfillments/selectors';
import { commentsSelector } from 'public-modules/Comments/selectors';
import { actions as fulfillmentActions } from 'public-modules/Fulfillment';
import { actions as commentsActions } from 'public-modules/Comments';
import { actions as loginActions } from 'containers/Login/reducer';
import { actions as bountyUIActions } from './reducer';

const map = fpMap.convert({ cap: false });

let SubmissionsAndCommentsCardComponent = props => {
  const {
    initiateWalkthrough,
    initiateLoginProtection,
    showLogin,
    showModal,
    setRatingModal,
    setActiveTab,
    currentTab,
    fulfillments,
    comments,
    bounty,
    currentUser,
    acceptFulfillment,
    postComment,
    loadMoreComments
  } = props;

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
        <ListGroup.ListItem className={styles.submissionItem}>
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
      const { text, user, created } = comment;
      const { name, profile_image, public_address } = user;

      return (
        <ListGroup.ListItem className={styles.commentItem}>
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
    body = <ListGroup>{renderFulfillments(fulfillments.list)}</ListGroup>;

    if (!fulfillments.list.length) {
      bodyClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
          <ZeroState
            title={'There are 0 submissions'}
            text={'Submissions to this bounty will appear here.'}
            iconColor="blue"
            icon={['fal', 'file-alt']}
          />
        </div>
      );
    }

    if (!bountyBelongsToLoggedInUser) {
      let userFulfillments = [];

      if (currentUser) {
        userFulfillments = filter(
          ['fulfiller', currentUser.public_address],
          fulfillments.list
        );
      }

      body = (
        <React.Fragment>
          <ListGroup>{renderFulfillments(userFulfillments)}</ListGroup>
          <Text alignment="align-center" color="defaultGrey" typeScale="Small">
            Submissions to this bounty are hidden. Your submissions are only
            visible to you and the bounty issuer.
          </Text>
        </React.Fragment>
      );

      if (!currentUser || !userFulfillments.length) {
        bodyClass = styles.bodyLoading;
        body = (
          <div className={styles.zeroState}>
            <ZeroState
              title={'Submissions are private'}
              text={'The submissions for this bounty have been set to private.'}
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
      <ListGroup.ListItem className={styles.newCommentForm}>
        <NewCommentForm
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
      <ListGroup>
        {newCommentForm}
        {renderComments()}
        {comments.list.length < comments.count && (
          <div className={styles.loadMoreButton}>
            <Button loading={comments.loadingMore} onClick={loadMoreComments}>
              Load More
            </Button>
          </div>
        )}
      </ListGroup>
    );

    if (!comments.list.length) {
      body = (
        <ListGroup>
          {newCommentForm}
          <ListGroup.ListItem className={styles.commentItem}>
            <ZeroState
              title={'There are 0 comments'}
              text={'Submit a comment using the form above.'}
              iconColor="blue"
              icon={['fal', 'comments']}
            />
          </ListGroup.ListItem>
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
            tabCount={fulfillments.list.length}
            eventKey={'submissions'}
          >
            <Text typeScale="h4" className={styles.tabText}>
              Submissions
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            tabClassName={styles.tab}
            tabColor="lightGrey"
            tabCount={
              comments.list.length ? comments.list.length : bounty.comment_count
            }
            eventKey={'comments'}
          >
            <Text typeScale="h4" className={styles.tabText}>
              Comments
            </Text>
          </Tabs.Tab>
        </Tabs>
      </div>
      <div className={bodyClass}>{body}</div>
    </div>
  );
};

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
      setActiveTab: bountyUIActions.setActiveTab,
      setRatingModal: bountyUIActions.setRatingModal,
      acceptFulfillment: fulfillmentActions.acceptFulfillment,
      postComment: commentsActions.postComment,
      loadMoreComments: commentsActions.loadMoreComments,
      showLogin: loginActions.showLogin
    }
  )
)(SubmissionsAndCommentsCardComponent);

export default SubmissionsAndCommentsCard;

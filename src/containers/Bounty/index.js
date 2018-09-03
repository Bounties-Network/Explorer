import React from 'react';
import styles from './Bounty.module.scss';
import { BigNumber } from 'bignumber.js';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as fulfillmentActions } from 'public-modules/Fulfillment';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as commentsActions } from 'public-modules/Comments';
import { actions as bountyUIActions } from './reducer';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import showdown from 'showdown';
import moment from 'moment';
import { map } from 'lodash';
import { DRAFT, EXPIRED } from 'public-modules/Bounty/constants';
import ActionBar from './ActionBar';
import SubmissionsAndCommentsCard from './SubmissionsAndCommentsCard';
import { TransactionWalkthrough, FunctionalLoginLock } from 'hocs';
import {
  getDraftStateSelector,
  getDraftBountySelector,
  getBountySelector,
  getBountyStateSelector
} from 'public-modules/Bounty/selectors';
import { addressSelector } from 'public-modules/Client/selectors';
import { DIFFICULTY_MAPPINGS } from 'public-modules/Bounty/constants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Pill, Text, Social, Loader, ZeroState } from 'components';
import { PageCard, StagePill, LinkedAvatar } from 'explorer-components';
import { queryStringToObject } from 'utils/locationHelpers';
import { locationNonceSelector } from 'layout/App/selectors';

showdown.setOption('simpleLineBreaks', true);
const converter = new showdown.Converter();
converter.setFlavor('github');

class BountyComponent extends React.Component {
  constructor(props) {
    super(props);

    const {
      match,
      location,
      loadBounty,
      loadDraftBounty,
      loadFulfillment,
      loadFulfillments,
      resetFilters,
      resetCommentsState,
      addBountyFilter,
      setBountyId,
      setActiveTab
    } = props;

    resetCommentsState();
    setBountyId(match.params.id);

    if (match.path === '/bounty/draft/:id/') {
      loadDraftBounty(match.params.id);
    }

    if (match.path === '/bounty/:id/') {
      loadBounty(match.params.id);

      // load submissions
      resetFilters();
      addBountyFilter(match.params.id);
      setActiveTab('comments');

      const values = queryStringToObject(location.search);

      if (values.rating) {
        loadFulfillment(match.params.id, values.fulfillment_id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      locationNonce,
      loadBounty,
      loadDraftBounty,
      loadFulfillments,
      resetFilters,
      addBountyFilter,
      setBountyId
    } = this.props;

    if (prevProps.locationNonce !== locationNonce) {
      setBountyId(match.params.id);

      if (match.path === '/bounty/draft/:id/') {
        loadDraftBounty(match.params.id);
      }

      if (match.path === '/bounty/:id/') {
        loadBounty(match.params.id);

        resetFilters();
        addBountyFilter(match.params.id);
        loadFulfillments(match.params.id);
      }
    }
  }

  render() {
    const {
      user,
      loading,
      error,
      isDraft,
      bounty,
      walletAddress,
      initiateWalkthrough,
      initiateLoginProtection,
      showModal
    } = this.props;

    if (error) {
      return (
        <div className={styles.centeredBody}>
          <ZeroState
            type="error"
            iconColor="red"
            title="Could not find that bounty"
            text="Try refreshing, or make sure your url is correct"
            icon={['far', 'exclamation-triangle']}
          />
        </div>
      );
    }

    if (loading || !bounty) {
      return (
        <div className={styles.centeredBody}>
          <Loader size="medium" />
        </div>
      );
    }

    return (
      <div>
        <PageCard>
          <PageCard.Header className={styles.bountyPageCardHeader}>
            <div className={styles.header}>
              <div className={styles.ethBox}>
                <Text color="white" typeScale="h2" className={styles.usd}>
                  {`$${Number(bounty.usd_price).toFixed(2)}`}
                </Text>
                <Text
                  color="white"
                  typeScale="Body"
                  className={styles.currency}
                >{`${BigNumber(
                  bounty.calculated_fulfillmentAmount
                ).toString()} ${bounty.tokenSymbol}`}</Text>
              </div>
              <div className={styles.bountyHeader}>
                <PageCard.Title>{bounty.title}</PageCard.Title>
                <div className={styles.categories}>
                  {map(
                    category => (
                      <Pill
                        className={styles.pill}
                        textColor="white"
                        key={
                          typeof category === 'object'
                            ? category.normalized_name
                            : category
                        }
                      >
                        {typeof category === 'object'
                          ? category.name
                          : category}
                      </Pill>
                    ),
                    bounty.categories
                  )}
                </div>
                <div className={styles.avatar}>
                  <LinkedAvatar
                    img={bounty.user.profile_image}
                    address={bounty.user.public_address}
                    hash={bounty.user.public_address}
                    to={`/profile/${bounty.user.public_address}`}
                    addressTextColor="white"
                    size="small"
                    border="true"
                  />
                </div>
              </div>
              <div className={styles.stage}>
                <StagePill stage={isDraft ? DRAFT : bounty.bountyStage} />
              </div>
            </div>
          </PageCard.Header>
          <PageCard.Content className={styles.pageBody}>
            <div className={`${styles.filter}`}>
              <ActionBar
                bounty={bounty}
                user={user}
                isDraft={isDraft}
                walletAddress={walletAddress}
                initiateLoginProtection={initiateLoginProtection}
                initiateWalkthrough={initiateWalkthrough}
                showModal={showModal}
              />

              <div className={styles.bountyMetadata}>
                <section className={styles.metadataSection}>
                  {isDraft ? null : (
                    <div className={styles.labelGroup}>
                      <Text inputLabel className={styles.label}>
                        Remaining balance
                      </Text>
                      <Text
                        color="purple"
                        weight="fontWeight-medium"
                        typeScale="h4"
                      >{`${Number(bounty.calculated_balance)} ${
                        bounty.tokenSymbol
                      }`}</Text>
                    </div>
                  )}
                </section>

                <section className={styles.metadataSection}>
                  <div className={styles.metadataItem}>
                    <i className={styles.metadataIcon}>
                      <FontAwesomeIcon icon={['far', 'clock']} />
                    </i>
                    <Text
                      inline
                      className={styles.metadataInput}
                      weight="fontWeight-medium"
                    >
                      {moment
                        .utc(bounty.deadline, 'YYYY-MM-DDThh:mm:ssZ')
                        .fromNow(true)}
                    </Text>
                    <Text
                      inline
                      color="defaultGrey"
                      className={styles.metadataLabel}
                    >
                      {bounty.bountyStage === EXPIRED ? 'expired' : 'remaining'}
                    </Text>
                  </div>

                  <div className={styles.metadataItem}>
                    <i className={styles.metadataIcon}>
                      <FontAwesomeIcon icon={['far', 'puzzle-piece']} />
                    </i>
                    <Text
                      inline
                      className={styles.metadataInput}
                      weight="fontWeight-medium"
                    >
                      {DIFFICULTY_MAPPINGS[bounty.experienceLevel]}
                    </Text>
                    <Text
                      inline
                      color="defaultGrey"
                      className={styles.metadataLabel}
                    >
                      difficulty
                    </Text>
                  </div>

                  {typeof bounty.revisions == 'number' && (
                    <div className={styles.metadataItem}>
                      <i className={styles.metadataIcon}>
                        <FontAwesomeIcon icon={['far', 'repeat']} />
                      </i>
                      <Text
                        inline
                        weight="fontWeight-medium"
                        className={styles.metadataInput}
                      >
                        {bounty.revisions + ' revisions'}
                      </Text>
                      <Text
                        inline
                        color="defaultGrey"
                        className={styles.metadataLabel}
                      >
                        expected
                      </Text>
                    </div>
                  )}
                </section>

                <section className={styles.metadataSection}>
                  {bounty.sourceDirectoryHash && (
                    <div className={styles.metadataItem}>
                      <i className={styles.metadataIcon}>
                        <FontAwesomeIcon icon={['far', 'paperclip']} />
                      </i>
                      <Text
                        link
                        src={`https://ipfs.infura.io/ipfs/${
                          bounty.sourceDirectoryHash
                        }/${bounty.sourceFileName}`}
                      >
                        {bounty.sourceFileName}
                      </Text>
                    </div>
                  )}

                  {bounty.webReferenceURL && (
                    <div className={styles.metadataItem}>
                      <i className={styles.metadataIcon}>
                        <FontAwesomeIcon icon={['far', 'link']} />
                      </i>
                      <Text link src={`${bounty.webReferenceURL}`}>
                        {bounty.webReferenceURL}
                      </Text>
                    </div>
                  )}

                  <div className={styles.metadataItem}>
                    <i className={styles.metadataIcon}>
                      <FontAwesomeIcon icon={['far', 'envelope']} />
                    </i>
                    <Text link src={`mailto:${bounty.issuer_email}`}>
                      {bounty.issuer_email}
                    </Text>
                  </div>
                </section>
              </div>

              <div className={styles.social}>
                <Social />
              </div>
            </div>
            <div className={`${styles.descriptionSection}`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(bounty.description)
                }}
                className="markdownContent"
              />
            </div>
          </PageCard.Content>
        </PageCard>
        {!isDraft && (
          <PageCard noBanner>
            <PageCard.Content className={styles.submissionsAndCommentsCard}>
              <SubmissionsAndCommentsCard
                bounty={bounty}
                isDraft={isDraft}
                currentUser={user}
                initiateLoginProtection={initiateLoginProtection}
                initiateWalkthrough={initiateWalkthrough}
              />
            </PageCard.Content>
          </PageCard>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  const getDraftState = getDraftStateSelector(state);
  const getBountyState = getBountyStateSelector(state);
  const draftBounty = getDraftBountySelector(state);
  const currentBounty = getBountySelector(state);

  const { match } = router;
  let bounty = currentBounty;
  let bountyState = getBountyState;
  let isDraft = false;

  if (match.path === '/bounty/draft/:id/') {
    bounty = draftBounty;
    bountyState = getDraftState;
    isDraft = true;
  }

  return {
    isDraft,
    bounty: bounty,
    user: getCurrentUserSelector(state),
    walletAddress: addressSelector(state),
    loading: bountyState.loading,
    error: bountyState.error,
    locationNonce: locationNonceSelector(state)
  };
};

const Bounty = compose(
  FunctionalLoginLock({
    wrapperClassName: styles.body
  }),
  TransactionWalkthrough({
    dismissable: false,
    wrapperClassName: styles.body
  }),
  connect(
    mapStateToProps,
    {
      showModal: bountyUIActions.showModal,
      setBountyId: bountyUIActions.setBountyId,
      setActiveTab: bountyUIActions.setActiveTab,
      loadBounty: bountyActions.getBounty,
      loadDraftBounty: bountyActions.getDraft,
      loadFulfillments: fulfillmentsActions.loadFulfillments,
      loadFulfillment: fulfillmentActions.loadFulfillment,
      addBountyFilter: fulfillmentsActions.addBountyFilter,
      resetFilters: fulfillmentsActions.resetFilters,
      resetCommentsState: commentsActions.resetState
    }
  )
)(BountyComponent);

export default Bounty;

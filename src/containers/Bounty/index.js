import React from 'react';
import styles from './Bounty.module.scss';
import { withRouter } from 'react-router-dom';
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
import SubmissionsAndCommentsCard, {
  mostInterestingTab
} from './SubmissionsAndCommentsCard';
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
import {
  Currency,
  PageCard,
  StagePill,
  LinkedAvatar
} from 'explorer-components';
import { queryStringToObject } from 'utils/locationHelpers';
import { shortenFileName, shortenUrl } from 'utils/helpers';
import { locationNonceSelector } from 'layout/App/selectors';
import { SEOHeader } from './components';

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
      resetFulfillmentsState,
      resetCommentsState,
      addBountyFilter,
      setBountyId
    } = props;

    setBountyId(match.params.id);

    if (match.path === '/bounty/draft/:id/') {
      loadDraftBounty(match.params.id);
    }

    if (match.path === '/bounty/:id/') {
      resetFulfillmentsState();
      resetCommentsState();

      loadBounty(match.params.id);
      addBountyFilter(match.params.id);
      loadFulfillments(match.params.id);

      const values = queryStringToObject(location.search);

      if (values.rating) {
        loadFulfillment(match.params.id, values.fulfillment_id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      location,
      locationNonce,
      loadBounty,
      loadDraftBounty,
      loadFulfillment,
      loadFulfillments,
      resetFulfillmentsState,
      addBountyFilter,
      setBountyId,
      resetCommentsState,
      user,
      history
    } = this.props;

    // do this because for some reason match was stale
    const bountyId = history.location.pathname.split('/')[2];

    if (prevProps.locationNonce !== locationNonce) {
      setBountyId(bountyId);

      if (match.path === '/bounty/draft/:id/') {
        loadDraftBounty(bountyId);
      }

      if (match.path === '/bounty/:id/') {
        resetFulfillmentsState();
        resetCommentsState();

        loadBounty(bountyId);
        addBountyFilter(bountyId);
        loadFulfillments(bountyId);

        const values = queryStringToObject(location.search);

        if (values.rating) {
          loadFulfillment(bountyId, values.fulfillment_id);
        }
      }
    }

    // reload fulfillments after user logs in
    if (prevProps.user !== user) {
      resetFulfillmentsState();
      addBountyFilter(bountyId);
      loadFulfillments(bountyId);
    }
  }

  rootLocationParams = () => {
    const tab = mostInterestingTab(this.props.fulfillments);
    return this.props.location.search || `?tab=${tab}`;
  };

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
      showModal,
      setActiveTab
    } = this.props;

    if (error) {
      return (
        <div className={styles.centeredBody}>
          <ZeroState
            type="error"
            iconColor="red"
            title="Could not find that bounty"
            text="Try refreshing, or make sure your url is correct"
            icon={['fal', 'exclamation-triangle']}
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
        <SEOHeader bounty={bounty} />
        <PageCard>
          <PageCard.Header className={styles.bountyPageCardHeader}>
            <div className={styles.header}>
              <Currency
                className={styles.ethBox}
                primaryValue={bounty.usd_price}
                primaryDecimals={2}
                primaryColor="white"
                primaryClassName={styles.primary}
                primaryContainerClass={styles.primaryContainerClass}
                currencyColor="white"
                secondaryValue={bounty.calculated_fulfillmentAmount}
                secondaryCurrency={bounty.tokenSymbol}
                secondaryTypeScale="h4"
                secondaryClassName={styles.currency}
                secondaryColor="white"
              />

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
                    img={bounty.user.small_profile_image_url}
                    address={bounty.user.public_address}
                    hash={bounty.user.public_address}
                    to={`/profile/${bounty.user.public_address}`}
                    addressTextColor="white"
                    size="small"
                    border
                  />
                </div>
              </div>
              <div className={styles.stage}>
                <StagePill stage={isDraft ? DRAFT : bounty.bountyStage} />
              </div>
            </div>
          </PageCard.Header>
          <PageCard.Content key="body" className={styles.pageBody}>
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
                {isDraft ? null : (
                  <section className={styles.metadataSection}>
                    <div className={styles.labelGroup}>
                      <Text inputLabel className={styles.label}>
                        Remaining balance
                      </Text>
                      <Currency
                        primaryValue={bounty.calculated_balance}
                        primaryCurrency={bounty.tokenSymbol}
                        primaryDecimals="all"
                        primaryTypeScale="h4"
                        primaryWeight="fontWeight-medium"
                        alignment="align-left"
                        currencyTypeScale="h5"
                        currencyWeight="fontWeight-medium"
                      />
                    </div>
                  </section>
                )}

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

                  {typeof bounty.revisions === 'number' && (
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
                        {shortenFileName(bounty.sourceFileName, 18)}
                      </Text>
                    </div>
                  )}

                  {bounty.webReferenceURL && (
                    <div className={styles.metadataItem}>
                      <i className={styles.metadataIcon}>
                        <FontAwesomeIcon icon={['far', 'link']} />
                      </i>
                      <Text link src={`${bounty.webReferenceURL}`}>
                        {shortenUrl(bounty.webReferenceURL)}
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
              {!isDraft && (
                <div className={styles.social}>
                  <Social />
                </div>
              )}
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
            <PageCard.Content
              key="submissions-comments"
              className={styles.submissionsAndCommentsCard}
            >
              <SubmissionsAndCommentsCard
                bounty={bounty}
                isDraft={isDraft}
                currentUser={user}
                setActiveTabAction={setActiveTab}
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
    bounty,
    user: getCurrentUserSelector(state),
    walletAddress: addressSelector(state),
    loading: bountyState.loading,
    error: bountyState.error,
    locationNonce: locationNonceSelector(state)
  };
};

const Bounty = compose(
  withRouter,
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
      resetFulfillmentsState: fulfillmentsActions.resetState,
      resetCommentsState: commentsActions.resetState
    }
  )
)(BountyComponent);

export default Bounty;

import React from 'react';
import styles from './Bounty.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as bountyUIActions } from './reducer';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import showdown from 'showdown';
import moment from 'moment';
import { map } from 'lodash';
import { DRAFT } from 'public-modules/Bounty/constants';
import ActionBar from './ActionBar';
import SubmissionsAndCommentsCard from './SubmissionsAndCommentsCard';
import { TransactionWalkthrough } from 'hocs';
import {
  getDraftStateSelector,
  getDraftBountySelector,
  getBountySelector,
  getBountyStateSelector
} from 'public-modules/Bounty/selectors';
import { addressSelector } from 'public-modules/Client/selectors';
import { rootBountyPageSelector } from './selectors';
import { DIFFICULTY_MAPPINGS } from 'public-modules/Bounty/constants';
import { Pill, Text, Social, Loader, ZeroState } from 'components';
import { PageCard, StagePill, LinkedAvatar } from 'explorer-components';

showdown.setOption('simpleLineBreaks', true);
const converter = new showdown.Converter();
converter.setFlavor('github');

class BountyComponent extends React.Component {
  constructor(props) {
    super(props);

    const {
      match,
      loadBounty,
      loadDraftBounty,
      loadFulfillments,
      resetFilters,
      addBountyFilter
    } = props;

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

  render() {
    const {
      user,
      loading,
      error,
      isDraft,
      bounty,
      walletAddress,
      initiateWalkthrough,
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
          <PageCard.Header>
            <div className={styles.header}>
              <div className={styles.ethBox}>
                <Text color="white" typeScale="h3" className={styles.usd}>
                  {`$${Number(bounty.usd_price).toFixed(2)}`}
                </Text>
                <Text
                  color="white"
                  typeScale="h5"
                  className={styles.currency}
                >{`${Number(bounty.calculated_fulfillmentAmount)} ${
                  bounty.tokenSymbol
                }`}</Text>
              </div>
              <div className={styles.bountyHeader}>
                <PageCard.Title>{bounty.title}</PageCard.Title>
                <div className={styles.categories}>
                  {map(
                    category => (
                      <Pill
                        className={styles.pill}
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
                    to={`profile/${bounty.user.public_address}`}
                    addressTextColor="white"
                    size="small"
                  />
                </div>
              </div>
              <div className={styles.stage}>
                <StagePill stage={isDraft ? DRAFT : bounty.bountyStage} />
              </div>
            </div>
          </PageCard.Header>
          <PageCard.Content className={styles.pageBody}>
            <div className="row">
              <div className={`col-xs-3 ${styles.filter}`}>
                <div className={styles.buttonSection}>
                  <ActionBar
                    bounty={bounty}
                    user={user}
                    isDraft={isDraft}
                    walletAddress={walletAddress}
                    initiateWalkthrough={initiateWalkthrough}
                    showModal={showModal}
                  />
                </div>
                {isDraft ? null : (
                  <div className={styles.labelGroup}>
                    <Text color="defaultGrey" className={styles.label}>
                      Total Balance
                    </Text>
                    <Text color="purple" weight="fontWeight-medium">{`${Number(
                      bounty.calculated_balance
                    )} ${bounty.tokenSymbol}`}</Text>
                  </div>
                )}
                <div className={styles.labelGroup}>
                  <Text color="defaultGrey" className={styles.label}>
                    Issuer Contact
                  </Text>
                  <Text link src={`mailto:${bounty.issuer_email}`}>
                    {bounty.issuer_email}
                  </Text>
                </div>
                <div className={styles.labelGroup}>
                  <Text color="defaultGrey" className={styles.label}>
                    Deadline
                  </Text>
                  <Text>
                    {moment
                      .utc(bounty.deadline, 'YYYY-MM-DDThh:mm:ssZ')
                      .fromNow(true)}
                  </Text>
                </div>
                <div className={styles.labelGroup}>
                  <Text color="defaultGrey" className={styles.label}>
                    Difficulty
                  </Text>
                  <Text>{DIFFICULTY_MAPPINGS[bounty.experienceLevel]}</Text>
                </div>
                {bounty.sourceDirectoryHash ? (
                  <div className={styles.labelGroup}>
                    <Text color="defaultGrey" className={styles.label}>
                      Associated Files
                    </Text>
                    <Text
                      link
                      src={`https://ipfs.infura.io/ipfs/${
                        bounty.sourceDirectoryHash
                      }/${bounty.sourceFileName}`}
                    >
                      {bounty.sourceFileName}
                    </Text>
                  </div>
                ) : null}
                <div className={styles.social}>
                  <Social />
                </div>
              </div>
              <div className={`col-xs-9 ${styles.descriptionSection}`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(bounty.description)
                  }}
                  className="markdownContent"
                />
              </div>
            </div>
          </PageCard.Content>
        </PageCard>
        <PageCard noBanner>
          <PageCard.Content className={styles.cardContent}>
            <SubmissionsAndCommentsCard
              bounty={bounty}
              currentUser={user}
              initiateWalkthrough={initiateWalkthrough}
            />
          </PageCard.Content>
        </PageCard>
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
    error: bountyState.error
  };
};

const Bounty = compose(
  TransactionWalkthrough({
    dismissable: false,
    wrapperClassName: styles.body
  }),
  connect(
    mapStateToProps,
    {
      showModal: bountyUIActions.showModal,
      loadBounty: bountyActions.getBounty,
      loadDraftBounty: bountyActions.getDraft,
      setActiveTab: bountyUIActions.setActiveTab,
      loadFulfillments: fulfillmentsActions.loadFulfillments,
      addBountyFilter: fulfillmentsActions.addBountyFilter,
      resetFilters: fulfillmentsActions.resetFilters
    }
  )
)(BountyComponent);

export default Bounty;

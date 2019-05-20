import React from 'react';
import styles from './CreateBounty.module.scss';
import { connect } from 'react-redux';
import { PageCard } from 'explorer-components';
import { BigNumber } from 'bignumber.js';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as tokensActions } from 'public-modules/Tokens';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import CreateBountyForm from './CreateBountyForm';
import {
  getDraftStateSelector,
  getDraftBountySelector
} from 'public-modules/Bounty/selectors';
import moment from 'moment';
import { Loader, ZeroState } from 'components';
import { DEFAULT_MARKDOWN } from 'utils/constants';
import { DIFFICULTY_MAPPINGS } from 'public-modules/Bounty/constants';
import config from 'public-modules/config';

class CreateBountyComponent extends React.Component {
  constructor(props) {
    super(props);
    const { match, getDraft, loadTokens, public_address } = props;

    loadTokens();

    if (match.path === '/createBounty/draft/:id/') {
      getDraft(match.params.id, public_address);
    }
  }

  render() {
    const {
      draftLoading,
      formInitialValues,
      draftError,
      isDraftPage
    } = this.props;

    if (draftLoading) {
      return (
        <div className={styles.centeredBody}>
          <Loader size="medium" />
        </div>
      );
    }

    if (draftError) {
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

    return (
      <PageCard>
        <PageCard.Header>
          <PageCard.Title>
            {isDraftPage ? 'Edit Bounty' : 'Create Bounty'}
          </PageCard.Title>
        </PageCard.Header>
        <PageCard.Content key="createBountyForm" className={styles.cardContent}>
          <CreateBountyForm initialValues={formInitialValues} />
        </PageCard.Content>
      </PageCard>
    );
  }
}

const mapStateToProps = (state, router) => {
  const user = getCurrentUserSelector(state) || {};
  const getDraftState = getDraftStateSelector(state);
  let draftBounty = getDraftBountySelector(state) || {};
  let fulfillment_amount = draftBounty.calculated_fulfillment_amount;
  let isDraftPage = true;

  if (typeof fulfillment_amount === 'string') {
    fulfillment_amount = BigNumber(
      draftBounty.calculated_fulfillment_amount,
      10
    ).toString();
  }
  if (router.match.path === '/createBounty') {
    draftBounty = {};
    fulfillment_amount = undefined;
    isDraftPage = false;
  }
  return {
    public_address: user && user.public_address,
    isDraftPage: isDraftPage,
    draftError: getDraftState.error,
    draftLoading: getDraftState.loading,
    formInitialValues: {
      title: draftBounty.title,
      categories: draftBounty.categories,
      description: draftBounty.description || DEFAULT_MARKDOWN,
      experience_level:
        DIFFICULTY_MAPPINGS[draftBounty.experience_level] || 'Beginner',
      revisions: draftBounty.revisions || 3,
      private_fulfillments: draftBounty.private_fulfillments || false,
      fulfillers_need_approval: draftBounty.fulfillers_need_approval || false,
      paysTokens:
        draftBounty.token_version === 20 || !!config.defaultToken || false,
      token_contract:
        draftBounty.token_contract ||
        (config.defaultToken && config.defaultToken.address),
      fulfillment_amount: fulfillment_amount,
      issuer_email: draftBounty.issuer_email || user.email || '',
      issuer_name: draftBounty.issuer_name || user.name || '',
      activateNow: !isDraftPage,
      webReferenceURL: draftBounty.attached_url,
      deadline:
        draftBounty.deadline && moment(draftBounty.deadline) > moment()
          ? moment.utc(draftBounty.deadline).local()
          : moment().add(3, 'days')
    }
  };
};

const CreateBounty = connect(
  mapStateToProps,
  {
    getDraft: bountyActions.getDraft,
    loadTokens: tokensActions.loadTokens
  }
)(CreateBountyComponent);

export default CreateBounty;
